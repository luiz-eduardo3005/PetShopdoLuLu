const pool = require('../models/db');

exports.listarAgendamentos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM agendamentos WHERE usuario_id = ?', [req.user.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.criarAgendamento = async (req, res) => {
    const { nomePet, raca, data, hora, observacoes } = req.body;
    const foto = req.file ? '/uploads/' + req.file.filename : null;
    try {
        await pool.query(
            'INSERT INTO agendamentos (usuario_id, nomePet, raca, data, hora, observacoes, foto) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, nomePet, raca, data, hora, observacoes, foto]
        );
        res.status(201).json({ message: 'Agendamento criado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.atualizarAgendamento = async (req, res) => {
    const { nomePet, raca, data, hora, observacoes } = req.body;
    const foto = req.file ? '/uploads/' + req.file.filename : null;
    try {
        await pool.query(
            `UPDATE agendamentos SET nomePet=?, raca=?, data=?, hora=?, observacoes=?, foto=IFNULL(?, foto) 
             WHERE id=? AND usuario_id=?`,
            [nomePet, raca, data, hora, observacoes, foto, req.params.id, req.user.id]
        );
        res.json({ message: 'Agendamento atualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.excluirAgendamento = async (req, res) => {
    try {
        await pool.query('DELETE FROM agendamentos WHERE id=? AND usuario_id=?', [req.params.id, req.user.id]);
        res.json({ message: 'Agendamento excluído' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};