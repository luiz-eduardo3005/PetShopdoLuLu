# 🐾 Sistema de Agendamento de Banhos - PetShop

Este projeto é um sistema web completo para agendamento de serviços em um petshop, com cadastro/login de usuários e upload de imagem dos pets.

## 🚀 Tecnologias

- Node.js + Express
- MySQL
- JWT (autenticação)
- Bcrypt (criptografia)
- Multer (upload de imagem)
- HTML + CSS (frontend separado)

## 📁 Estrutura

```
backend/
├── app.js
├── .env.example
├── banco_petshop.sql
├── routes/
├── controllers/
├── models/
├── uploads/
```

## 🔐 Autenticação

- Registro com senha criptografada usando **Bcrypt**
- Login com **JWT** e token de sessão
- Middleware para rotas protegidas

## 📸 Upload de Imagem

- Upload usando **Multer**
- Imagem salva em `/uploads`
- Caminho salvo no banco

## 🔧 Como rodar o projeto

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure o `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

4. Crie o banco com o arquivo:

```bash
mysql -u root -p < banco_petshop.sql
```

5. Inicie a aplicação:

```bash
npm run dev
```

6. Acesse: `http://localhost:3000`

## 📷 Exemplo de imagem salva

A imagem do pet é exibida no front-end na lista de agendamentos, vinda da API via `/uploads/arquivo.jpg`.

---
