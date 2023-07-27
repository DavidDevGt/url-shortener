const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

const app = express();

app.use(cors());

app.use(express.json());

// Database para acortar links
let db = [];
app.post('/shorten', (req, res) => {
  // Generate a short URL ID
  const id = shortid.generate();

  // Save the short URL in our "database"
  db.push({
    id: id,
    url: req.body.url
  });

  // Respond with the short URL
  res.json({ shortUrl: 'http://localhost:3000/' + id });
});


app.get('/:id', (req, res) => {
    const entry = db.find(entry => entry.id === req.params.id);

    if (entry) {
        res.redirect(entry.url);
    } else {
        res.status(404).send('URL no encontrada');
    }
});

app.get('/', (req, res) => {
    res.send('Servidor de acortamiento de URL en funcionamiento');
});


app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});