const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(rep => rep.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!" });
  }
  const likes = repositories[repositoryIndex].likes; 
  const repository = { id, title, url, techs, likes };
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(rep => rep.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!" });
  }
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(rep => rep.id === id);
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found!" });
  } 
  const repository = repositories[repositoryIndex];
  repository.likes++;
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

module.exports = app;
