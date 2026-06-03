import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TicketsDetails() {
  const { id } = useParams();
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(
        `https://support-crm-472e.onrender.com/api/tickets/${id}`
      );

      setTicket(res.data);

      setStatus(res.data.status || "Open");
      setPriority(
        res.data.priority || "Medium"
      );
      setNotes(res.data.notes || "");
    } catch (error) {
      console.log(error);
    }
  };

  const saveChanges = async () => {
    try {
      await axios.put(
        `https://support-crm-472e.onrender.com/api/tickets/${id}`,
        {
          status,
          priority,
          notes,
        }
      );

      alert(
        "Ticket Updated Successfully"
      );

      fetchTicket();
    } catch (error) {
      console.log(error);
      alert("Failed to update ticket");
    }
  };

  const deleteTicketHandler = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ticket?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://support-crm-472e.onrender.com/api/tickets/${id}`
    );

    alert("Ticket Deleted");

    navigate("/tickets");
  } catch (error) {
    console.log(error);
    alert("Failed to delete ticket");
  }
};

  if (!ticket)
    return <h2>Loading...</h2>;

  return (
    <div className="details-card">
      <h1>Ticket Details</h1>

      <p>
        <strong>ID:</strong>{" "}
        {ticket.ticket_id}
      </p>

      <p>
        <strong>Customer:</strong>{" "}
        {ticket.customer_name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {ticket.customer_email}
      </p>

      <p>
        <strong>Subject:</strong>{" "}
        {ticket.subject}
      </p>

      <p>
        <strong>Description:</strong>{" "}
        {ticket.description}
      </p>

      <div className="form-group">
        <label>Status</label>

        {user.role === "admin" ? (
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        ) : (
          <p>{ticket.status}</p>
        )}
      </div>

      <div className="form-group">
        <label>Priority</label>

        {user.role === "admin" ? (
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        ) : (
          <p>{ticket.priority}</p>
        )}
      </div>

      <div className="form-group">
        <label>Internal Notes</label>

        {user.role === "admin" ? (
          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />
        ) : (
          <p>{ticket.notes || "No Notes"}</p>
        )}
      </div>

      {user.role === "admin" && (
        <button
          onClick={saveChanges}
        >
          Save Changes
        </button>
      )}
      {user.role === "admin" && (
        <button
          className="delete-btn"
          onClick={deleteTicketHandler}
        >
          Delete Ticket
        </button>
      )}
    </div>
  );
}

export default TicketsDetails;