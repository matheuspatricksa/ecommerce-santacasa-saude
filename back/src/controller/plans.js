import { openDb } from "../configDB.js";

export async function createPlanTable() {
  openDb().then((db) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS plans
      (id INTEGER PRIMARY KEY,
      name TEXT,
      price DECIMAL(10, 2),
      description TEXT)
    `);
  });
}

export async function selectPlans(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM plans").then(plans => res.json(plans));
  });
}

export async function selectPlan(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("SELECT * FROM plans WHERE id=?", [id]) .then(plan => res.json(plan));
  });
}

export async function insertPlan(req, res) {
  let plan = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO plans (name, price, description) VALUES (?, ?, ?)",
      [plan.name, plan.price, plan.description]
    );
  });
  res.json({
    "statusCode": '200',
    "message": "Plan successfully added"

  });
}

export async function updatePlan(req, res) {
  let plan = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE plans SET name = ?, price = ?, description = ? WHERE id = ?",
      [plan.name, plan.price, plan.description, plan.id]
    );
  });
  res.json({
    "statusCode": '200',
    "message": "Plan successfully updated"
  });
}

export async function deletePlan(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("DELETE FROM plans WHERE id=?", [id]) .then(res => res);
  });
  res.json({
    "statusCode": '200',
    "message": "Plan successfully deleted."
  });
}