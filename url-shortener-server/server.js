const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

const app = express();

app.use(cors());

app.use(express.json());

// Database para acortar links
let db = [];

app.post('/shorten', (req, res) => {
    const id = shortid.generate();

    db.push({
        id: id,
        url: req.body,url
    });

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

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});