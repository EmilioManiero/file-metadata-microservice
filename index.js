
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Habilitar CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Archivos estáticos
app.use(express.static('public'));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API para recibir archivos
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded'
    });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
