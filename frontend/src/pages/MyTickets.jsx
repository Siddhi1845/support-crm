import { useEffect, useState } from "react";
import axios from "axios";

function MyTickets() {
  const [tickets, setTickets] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `https://support-crm-472e.onrender.com/api/tickets/user/${user.email}`
        );

        setTickets(res.data);
            } catch (error) {
            console.log(error);
            }
        };

  return (
    <div className="tickets-page">
      <h1>🎫 My Tickets</h1>

      <div className="ticket-table-card">
        <table className="ticket-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>

            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.ticket_id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default MyTickets;