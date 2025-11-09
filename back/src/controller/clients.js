import { openDb } from "../configDB.js";

export async function createClientTable() {
  openDb().then((db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS clients
      (id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL)
    `);
  });
}

export async function selectClients(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM clients").then(clients => res.json(clients));
  });
}

export async function selectClient(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("SELECT * FROM clients WHERE id=?", [id]) .then(client => res.json(client));
  });
}

export async function insertClient(req, res) {
  let client = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO clients (name, email) VALUES (?, ?)",
      [client.name, client.email]
    );
  });
  res.json({
    "statusCode": '200',
    "message": "Client successfully added"

  });
}

export async function updateClient(req, res) {
  let client = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE clients SET name = ?, email = ? WHERE id = ?",
      [client.name, client.email, client.id]
    );
  });
  res.json({
    "statusCode": '200',
    "message": "Client successfully updated"
  });
}

export async function deleteClient(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("DELETE FROM clients WHERE id=?", [id]) .then(res => res);
  });
  res.json({
    "statusCode": '200',
    "message": "Client successfully deleted."
  });
}