import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tickets"
      );

      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) => {
      const matchesSearch =
      ticket.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      ticket.ticket_id
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      ticket.customer_email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      ticket.description
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      ticket.subject
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        ticket.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );
  const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    filteredTickets.map((ticket) => ({
      TicketID: ticket.ticket_id,
      Customer: ticket.customer_name,
      Email: ticket.customer_email,
      Subject: ticket.subject,
      Status: ticket.status,
      Priority: ticket.priority,
    }))
  );

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Tickets"
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(
    fileData,
    "SupportCRM_Tickets.xlsx"
  );
};
  return (
    <div className="tickets-page">
      <h1>🎟 Ticket Management</h1>

      <div className="ticket-toolbar">

        <input
          className="search-box"
          type="text"
          placeholder="Search by ID, Customer, Email, Subject or Description..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>

      </div>
      <div className="ticket-actions">

        <button
          className="export-btn"
          onClick={exportToExcel}
        >
          📊 Export Excel
        </button>

      </div>
      <div className="ticket-table-card">
        <table className="ticket-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Tickets Found
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <Link
                      to={`/ticket/${ticket.id}`}
                    >
                      {ticket.ticket_id}
                    </Link>
                  </td>

                  <td>
                    {ticket.customer_name}
                  </td>

                  <td>
                    {ticket.subject}
                  </td>

                  <td>
                    <span
                      className={
                        ticket.status === "Closed"
                          ? "status-closed"
                          : ticket.status === "In Progress"
                          ? "status-progress"
                          : "status-open"
                      }
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        ticket.priority === "High"
                          ? "priority-high"
                          : ticket.priority === "Medium"
                          ? "priority-medium"
                          : "priority-low"
                      }
                    >
                      {ticket.priority}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Tickets;