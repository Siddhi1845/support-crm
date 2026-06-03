import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateTicket from "./pages/CreateTicket";
import Tickets from "./pages/Tickets";
import TicketsDetails from "./pages/TicketsDetails";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";
import Profile from "./pages/Profile";
import MyTickets from "./pages/MyTickets";

function Layout() {
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

 const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  return (
    <div className="layout">
      {!isAuthPage && <Sidebar />}

      <div
        className={
          isAuthPage
            ? "content-full"
            : "content"

        }
      >
        <Routes>
          {/* Login Page */}
          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              user?.role === "admin"
                ? <Dashboard />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/tickets"
            element={
              user?.role === "admin"
                ? <Tickets />
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/create-ticket"
            element={
              user
                ? <CreateTicket />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/ticket/:id"
            element={
              user?.role === "admin"
                ? <TicketsDetails />
                : <Navigate to="/login" />
            }
          />
          {/* Invalid URL Redirect */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
              path="/profile"
              element={
                user
                  ? <Profile />
                  : <Navigate to="/login" />
              }
            />
            <Route
              path="/my-tickets"
              element={
                user
                  ? <MyTickets />
                  : <Navigate to="/login" />
              }
            />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;