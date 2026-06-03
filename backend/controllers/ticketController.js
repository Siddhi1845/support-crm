const db = require("../database/db");

const createTicket = (req, res) => {
  const { customer_name, customer_email, subject, description } = req.body;

  const ticketId = "TKT-" + Date.now();

  db.run(
    `INSERT INTO tickets
    (ticket_id, customer_name, customer_email, subject, description)
    VALUES (?, ?, ?, ?, ?)`,
    [
      ticketId,
      customer_name,
      customer_email,
      subject,
      description
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        success: true,
        ticket_id: ticketId
      });
    }
  );
};

const getTickets = (req, res) => {
  db.all(
    "SELECT * FROM tickets ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);
    }
  );
};
const getTicketById = (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM tickets WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(row);
    }
  );
};
const updateTicket = (req, res) => {
  const { id } = req.params;

  const {
    status,
    priority,
    notes
  } = req.body;

  db.run(
    `
    UPDATE tickets
    SET status = ?,
        priority = ?,
        notes = ?
    WHERE id = ?
    `,
    [
      status,
      priority,
      notes,
      id
    ],
    function (err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        success: true,
        message: "Ticket Updated"
      });
    }
  );
};
const deleteTicket = (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM tickets WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        success: true,
        message: "Ticket Deleted",
      });
    }
  );
};
const getMyTickets = (req, res) => {
  const { email } = req.params;

  db.all(
    `
    SELECT *
    FROM tickets
    WHERE customer_email = ?
    ORDER BY created_at DESC
    `,
    [email],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);
    }
  );
};
module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getMyTickets
};
