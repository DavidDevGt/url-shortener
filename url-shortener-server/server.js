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
  const id = shortid.generate();

  db.add(id, req.body.url);

  res.json({ shortUrl: `http://localhost:3000/${id}` });
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

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
