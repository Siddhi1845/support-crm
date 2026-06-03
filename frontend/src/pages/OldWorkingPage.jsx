import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tickets"
      );

      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const createTicket = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tickets",
        formData
      );

      alert(`Ticket Created: ${response.data.ticket_id}`);

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

      fetchTickets();
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket");
    }
  };

  return (
    <div className="container">
      <h1>Support CRM</h1>

      <div className="form-card">
        <h2>Create Ticket</h2>

        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="customer_email"
          placeholder="Customer Email"
          value={formData.customer_email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <button onClick={createTicket}>
          Create Ticket
        </button>
      </div>

      <div className="ticket-list">
        <h2>All Tickets</h2>

        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="ticket">
              <p>
                <strong>ID:</strong> {ticket.ticket_id}
              </p>

              <p>
                <strong>Customer:</strong> {ticket.customer_name}
              </p>

              <p>
                <strong>Email:</strong> {ticket.customer_email}
              </p>

              <p>
                <strong>Subject:</strong> {ticket.subject}
              </p>

              <p>
                <strong>Status:</strong> {ticket.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;