const pool = require("../utils/pool")

// static method: Order.insert, Number.parseInt, Math.random
// instance method: .map, .toString(), .toUpperCase()
module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(value) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [value.quantity]
    )
    return new Order(rows[0]);
  }

  static async getOrders() {
    const { rows } = await pool.query(
      'SELECT * FROM orders'
    )
      return rows.map(row => new Order(row));
  }

  static async getById(id) {
    // TODO: Implement me!
    const { rows } = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    )
    return new Order(rows[0]);
  }

  static async putById(quantity, id) {
    const { rows } = await pool.query(
      'UPDATE orders SET quantity = $1 WHERE id = $2 RETURNING *',
      [id, quantity]
    )
    return new Order(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE * FROM orders WHERE id = $1',
      [id]
    )
  }
};