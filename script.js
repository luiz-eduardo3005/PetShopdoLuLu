document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('formLogin');
    const formCadastro = document.getElementById('formCadastro');
    const erroEmail = document.getElementById('erroEmail');
    const erroSenha = document.getElementById('erroSenha');

    const nomeUsuario = document.getElementById('nomeUsuario');
    const botaoLogout = document.getElementById('botaoLogout');

    // Proteção
    if (window.location.pathname.includes('meus-agendamentos.html') || window.location.pathname.includes('agendamento.html')) {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (!usuario) {
            window.location.href = 'index.html';
        } else if (nomeUsuario) {
            nomeUsuario.textContent = usuario.nomeCompleto || usuario.nome || usuario.email;
        }
    }

    // Logout
    if (botaoLogout) {
        botaoLogout.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'index.html';
        });
    }

    // LOGIN
    if (formLogin) {
        formLogin.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();

            erroEmail.textContent = '';
            erroSenha.textContent = '';

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuario = usuarios.find(u => u.email === email);

            if (!usuario) {
                erroEmail.textContent = 'Usuário não encontrado';
                return;
            }

            if (usuario.senha !== senha) {
                erroSenha.textContent = 'Senha incorreta';
                return;
            }

            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            window.location.href = 'meus-agendamentos.html';
        });
    }

    // CADASTRO
    if (formCadastro) {
        formCadastro.addEventListener('submit', function (e) {
            e.preventDefault();

            const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

            const erroNome = document.getElementById('erroNomeCompleto');
            const erroConfirmar = document.getElementById('erroConfirmarSenha');

            erroEmail.textContent = '';
            erroNome.textContent = '';
            erroSenha.textContent = '';
            erroConfirmar.textContent = '';

            if (!nomeCompleto) erroNome.textContent = 'Preencha o nome';
            if (!email) erroEmail.textContent = 'Preencha o email';
            if (!senha) erroSenha.textContent = 'Digite uma senha';
            if (senha !== confirmarSenha) erroConfirmar.textContent = 'As senhas não coincidem';

            if (senha !== confirmarSenha || !nomeCompleto || !email || !senha) return;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            if (usuarios.some(u => u.email === email)) {
                erroEmail.textContent = 'Email já cadastrado';
                return;
            }

            const novoUsuario = { nomeCompleto, email, senha };
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'index.html';
        });
    }
});