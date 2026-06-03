const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getMyTickets,
} = require("../controllers/ticketController");

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.get(
  "/user/:email",
  getMyTickets
);

module.exports = router;