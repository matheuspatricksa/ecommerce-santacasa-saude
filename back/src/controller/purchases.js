import { openDb } from "../configDB.js";

export async function createPurchaseTable() {
  openDb().then((db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS purchases
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER NOT NULL,
      plan_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id),
      FOREIGN KEY (plan_id) REFERENCES plans(id))
    `);

    db.exec(`
      INSERT INTO purchases (client_id, plan_id, quantity) VALUES
      (1, 2, 1)
    `);
  });
}

export async function selectPurchases(req, res) {
  openDb().then((db) => {
    db.all(`
      SELECT 
      purchases.id,
      clients.name AS client_name,
      clients.email AS client_email,
      plans.name AS plan_name,
      plans.price AS plan_price,
      purchases.quantity,
      purchase_date
    FROM purchases
    JOIN clients ON purchases.client_id = clients.id
    JOIN plans ON purchases.plan_id = plans.id
    ORDER BY purchase_date DESC
    `).then(purchases => res.json(purchases));
  });
}

export async function insertPurchase(req, res) {
  try {
    const purchase = req.body;
    if (!purchase.client_id || !purchase.plan_id || !purchase.quantity) {
      return res.status(400).json({ statusCode: '400', message: 'client_id, plan_id and quantity are required' });
    }
    const db = await openDb();
    const client = await db.get("SELECT * FROM clients WHERE id = ?", [purchase.client_id]);
    if (!client) return res.status(404).json({ statusCode: '404', message: 'Client not found' });
    const plan = await db.get("SELECT * FROM plans WHERE id = ?", [purchase.plan_id]);
    if (!plan) return res.status(404).json({ statusCode: '404', message: 'Plan not found' });
    await db.run(
      "INSERT INTO purchases (client_id, plan_id, quantity) VALUES (?, ?, ?)",
      [purchase.client_id, purchase.plan_id, purchase.quantity]
    );
    return res.json({
      statusCode: '200',
      message: 'Purchase successfully registered'
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ statusCode: '500', message: 'Error registering purchase' });
  }
}