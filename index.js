const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ limits: { fileSize: 1000000 } });  // Max 1MB file size

// Fungsi untuk prediksi gambar
const predictImage = (image) => {
  // Dummy function untuk prediksi model
  // Implementasikan logika prediksi model TensorFlow.js di sini
  return Math.random() > 0.5 ? 'Cancer' : 'Non-cancer';
};

// Endpoint /predict
app.post('/predict', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'No file uploaded',
    });
  }

  // Prediksi hasil gambar
  const result = predictImage(req.file);

  // Response yang sesuai
  const response = {
    status: 'success',
    message: 'Model is predicted successfully',
    data: {
      id: '77bd90fc-c126-4ceb-828d-f048dddff746',
      result: result,
      suggestion: result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.',
      createdAt: new Date().toISOString(),
    },
  };

  res.json(response);
});

// Set up the server to listen on a port
const port = 8080;
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
