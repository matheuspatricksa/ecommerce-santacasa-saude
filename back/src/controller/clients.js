import { openDb } from "../configDB.js";

export async function createClientTable() {
  openDb().then((db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS clients
      (id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL)
    `);

    db.exec(`
      INSERT INTO clients (name, email) VALUES
      ('João Silva', 'joao@email.com'),
      ('Maria Souza', 'maria@email.com'),
      ('Carlos Pereira', 'carlos@email.com');
      `)
  });
}

export async function selectClients(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM clients").then(clients => res.json(clients));
  });
}

export async function selectClient(req, res) {
  // Permite id via body (atual) ou via query string para facilitar integração (GET com fetch)
  const id = req.body.id || req.query.id;
  if (!id) {
    return res.status(400).json({ statusCode: '400', message: 'Client id is required' });
  }
  openDb().then((db) => {
    db.get("SELECT * FROM clients WHERE id=?", [id]).then(client => {
      if (!client) return res.status(404).json({ statusCode: '404', message: 'Client not found' });
      res.json(client);
    });
  });
}

export async function insertClient(req, res) {
  try {
    const client = req.body;
    if (!client.name || !client.email) {
      return res.status(400).json({ statusCode: '400', message: 'Name and email are required' });
    }
    const db = await openDb();
    await db.run(
      "INSERT INTO clients (name, email) VALUES (?, ?)",
      [client.name, client.email]
    );
    res.json({
      statusCode: '200',
      message: 'Client successfully added'
    });
  } catch (error) {
    console.error('Error inserting client:', error);
    res.status(500).json({
      statusCode: '500',
      message: 'Error inserting client'
    });
  }
}

export async function updateClient(req, res) {
  try {
    const client = req.body;
    if (!client.id || !client.name || !client.email) {
      return res.status(400).json({ statusCode: '400', message: 'Id, name and email are required' });
    }
    const db = await openDb();
    await db.run(
      "UPDATE clients SET name = ?, email = ? WHERE id = ?",
      [client.name, client.email, client.id]
    );
    res.json({
      statusCode: '200',
      message: 'Client successfully updated'
    });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({
      statusCode: '500',
      message: 'Error updating client'
    });
  }
}

export async function deleteClient(req, res) {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ statusCode: '400', message: 'Client id is required' });
  }
  try {
    const db = await openDb();
    // Verifica se há compras associadas a este cliente
    const purchase = await db.get("SELECT 1 FROM purchases WHERE client_id = ? LIMIT 1", [id]);
    if (purchase) {
      return res.status(409).json({ statusCode: '409', message: 'Não é possível excluir: cliente possui compras registradas.' });
    }
    await db.run("DELETE FROM clients WHERE id=?", [id]);
    res.json({
      statusCode: '200',
      message: 'Client successfully deleted.'
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({
      statusCode: '500',
      message: 'Error deleting client'
    });
  }
}