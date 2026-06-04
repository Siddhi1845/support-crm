import { useState } from "react";
import axios from "axios";

function CreateTicket() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [formData, setFormData] =
  useState({
    subject: "",
    description: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTicket = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://support-crm-472e.onrender.com/api/tickets",
        {
          customer_name: user.name,
          customer_email: user.email,
          subject: formData.subject,
          description: formData.description,
          priority: formData.priority,
        }
      );

      alert(
        `Ticket Created Successfully\n${res.data.ticket_id}`
      );

      setFormData({
        subject: "",
        description: "",
        priority: "Medium",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    }
  };

  return (
    <div className="create-ticket-page">
      <div className="ticket-form-card">
        <h1>Create New Ticket</h1>

        <p>
          Submit a customer support request
        </p>

        <form onSubmit={createTicket}>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label>Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <textarea
            name="description"
            rows="6"
            placeholder="Describe the issue..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;