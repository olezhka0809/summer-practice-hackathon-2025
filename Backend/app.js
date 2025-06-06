const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Salut de la backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend rulează pe http://localhost:${PORT}`);
});
