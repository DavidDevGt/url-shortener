const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

const app = express();

app.use(cors());

app.use(express.json());

class Database {
    constructor() {
        this.entries = new Map();
    }

    add(id, url) {
        this.entries.set(id, { id, url });
    }

    find(id) {
        return this.entries.get(id);
    }
}

let db = new Database();

app.post('/shorten', (req, res) => {
  // Genera un ID para la URL
  const id = shortid.generate();

  // Guarda la URL acortada
  db.add(id, req.body.url);

  // Imprime la URL acortada
  res.json({ shortUrl: `${process.env.BASE_URL}/${id}` });
});

app.get('/:id', (req, res) => {
    const entry = db.find(req.params.id);

    if (entry) {
        res.redirect(entry.url);
    } else {
        res.status(404).send('URL no encontrada');
    }
});

app.get('/', (req, res) => {
    res.send('Servidor en funcionamiento');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor iniciado en ${process.env.BASE_URL}`);
});
