import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchTickets();

    const loggedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    setUser(loggedUser);
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        "https://support-crm-472e.onrender.com/api/tickets"
      );

      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  const highPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const chartData = [
    {
      name: "Open",
      value: openTickets,
    },
    {
      name: "In Progress",
      value: inProgressTickets,
    },
    {
      name: "Closed",
      value: closedTickets,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Welcome Back
            {user ? `, ${user.name}` : ""}
            👋
          </h1>

          <p className="dashboard-subtitle">
            Manage customer support tickets
            and monitor activities from one place.
          </p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card total">
          <h3>🎫 Total Tickets</h3>
          <h2>{totalTickets}</h2>
        </div>

        <div className="stat-card open">
          <h3>🟢 Open Tickets</h3>
          <h2>{openTickets}</h2>
        </div>

        <div className="stat-card progress">
          <h3>🟡 In Progress</h3>
          <h2>{inProgressTickets}</h2>
        </div>

        <div className="stat-card closed">
          <h3>🔴 Closed Tickets</h3>
          <h2>{closedTickets}</h2>
        </div>

        <div className="stat-card high">
          <h3>🔥 High Priority</h3>
          <h2>{highPriorityTickets}</h2>
        </div>
      </div>

      <div className="summary-box">
        <h3>📋 Today's Overview</h3>

        <p>
          You currently have{" "}
          <strong>{openTickets}</strong>{" "}
          open tickets that require attention.
        </p>
      </div>

      <div className="chart-card">
        <h2>📊 Ticket Status Overview</h2>

        <div className="chart-container">
          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {chartData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="activity-card">

        <h2>📢 Recent Activity</h2>

        {tickets.slice(0, 5).map((ticket) => (
          <div
            key={ticket.id}
            className="activity-item"
          >
            <strong>
              {ticket.ticket_id}
            </strong>

            <p>
              {ticket.customer_name}
              {" "}
              created a ticket
            </p>
          </div>
        ))}

      </div>

      <div className="table-card">

        <h2>Recent Tickets</h2>

        <table className="ticket-table">

          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Tickets Available
                </td>
              </tr>
            ) : (
              tickets
                .slice(0, 5)
                .map((ticket) => (
                  <tr key={ticket.id}>

                    <td>
                      <Link
                        className="ticket-link"
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
                            : ticket.status ===
                              "In Progress"
                            ? "status-progress"
                            : "status-open"
                        }
                      >
                        {ticket.status}
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

export default Dashboard;