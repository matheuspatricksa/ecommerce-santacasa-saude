import { openDb } from "../configDB.js";

export async function createPlanTable() {
  const db = await openDb();
  await db.exec(`
      CREATE TABLE IF NOT EXISTS plans
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price DECIMAL(10, 2),
      description TEXT)
    `);

  const row = await db.get("SELECT COUNT(1) as c FROM plans");
  if (!row || row.c === 0) {
    await db.run(`
      INSERT INTO plans (name, price, description) VALUES
      ('Plano Básico', 99.90, 'Ideal para quem quer economizar.'),
      ('Plano Premium', 199.90, 'Cobertura completa com benefícios.'),
      ('Plano Família', 299.90, 'Plano para toda a família.');
    `);
  }
}

export async function selectPlans(req, res) {
  try {
    const db = await openDb();
    const plans = await db.all("SELECT * FROM plans");
    res.json(plans);
  } catch (err) {
    console.error('Error selecting plans:', err);
    res.status(500).json({ statusCode: '500', message: 'Error selecting plans' });
  }
}

export async function selectPlan(req, res) {
  try {
    const id = req.body.id || req.query.id;
    if (!id) {
      return res.status(400).json({ statusCode: '400', message: 'Plan id is required' });
    }
    const db = await openDb();
    const plan = await db.get("SELECT * FROM plans WHERE id=?", [id]);
    if (!plan) return res.status(404).json({ statusCode: '404', message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    console.error('Error selecting plan:', err);
    res.status(500).json({ statusCode: '500', message: 'Error selecting plan' });
  }
}

export async function insertPlan(req, res) {
  try {
    const plan = req.body;
    if (!plan.name || !plan.price || !plan.description) {
      return res.status(400).json({ statusCode: '400', message: 'Name, price and description are required' });
    }
    const db = await openDb();
    await db.run(
      "INSERT INTO plans (name, price, description) VALUES (?, ?, ?)",
      [plan.name, plan.price, plan.description]
    );
    res.json({ statusCode: '200', message: 'Plan successfully added' });
  } catch (error) {
    console.error('Error inserting plan:', error);
    res.status(500).json({ statusCode: '500', message: 'Error inserting plan' });
  }
}

export async function updatePlan(req, res) {
  try {
    const plan = req.body;
    if (!plan.id || !plan.name || !plan.price || !plan.description) {
      return res.status(400).json({ statusCode: '400', message: 'Id, name, price and description are required' });
    }
    const db = await openDb();
    await db.run(
      "UPDATE plans SET name = ?, price = ?, description = ? WHERE id = ?",
      [plan.name, plan.price, plan.description, plan.id]
    );
    res.json({ statusCode: '200', message: 'Plan successfully updated' });
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ statusCode: '500', message: 'Error updating plan' });
  }
}

export async function deletePlan(req, res) {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ statusCode: '400', message: 'Plan id is required' });
  }
  try {
    const db = await openDb();
    // Verifica se há compras associadas a este plano
    const purchase = await db.get("SELECT 1 FROM purchases WHERE plan_id = ? LIMIT 1", [id]);
    if (purchase) {
      return res.status(409).json({ statusCode: '409', message: 'Não é possível excluir: plano possui compras registradas.' });
    }
    await db.run("DELETE FROM plans WHERE id=?", [id]);
    res.json({ statusCode: '200', message: 'Plan successfully deleted.' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ statusCode: '500', message: 'Error deleting plan' });
  }
}