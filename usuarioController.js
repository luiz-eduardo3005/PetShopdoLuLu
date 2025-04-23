const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');
require('dotenv').config();

exports.registrarUsuario = async (req, res) => {
    const { nomeCompleto, email, senha } = req.body;
    try {
        const [existing] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ message: 'Email já cadastrado' });

        const hash = await bcrypt.hash(senha, 10);
        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nomeCompleto, email, hash]);

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const usuario = rows[0];
        if (!usuario) return res.status(401).json({ message: 'Usuário não encontrado' });

        const match = await bcrypt.compare(senha, usuario.senha);
        if (!match) return res.status(401).json({ message: 'Senha incorreta' });

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};