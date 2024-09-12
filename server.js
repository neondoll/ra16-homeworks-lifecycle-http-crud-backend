import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: () => true }));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const notes = [];
let nextId = 1;

app.get('/notes', (req, res) => {
  res.send(JSON.stringify(notes));
});
app.post('/notes', (req, res) => {
  notes.push({ ...req.body, id: nextId++ });
  res.status(204);
  res.end();
});
app.delete('/notes/:id', (req, res) => {
  const noteId = Number(req.params.id);
  const index = notes.findIndex((o) => o.id === noteId);

  if (index !== -1) {
    notes.splice(index, 1);
  }

  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});