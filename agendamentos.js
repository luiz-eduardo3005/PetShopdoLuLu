const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');
const agendamentoController = require('../controllers/agendamentoController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    }
});
const upload = multer({ storage });


router.use(authMiddleware);

router.get('/', agendamentoController.listarAgendamentos);
router.post('/', upload.single('foto'), agendamentoController.criarAgendamento);
router.put('/:id', upload.single('foto'), agendamentoController.atualizarAgendamento);
router.delete('/:id', agendamentoController.excluirAgendamento);

module.exports = router;