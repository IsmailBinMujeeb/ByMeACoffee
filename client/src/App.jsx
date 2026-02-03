import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Protected from "@/components/protected";
import CreateOrder from "./pages/CreateOrder";
import MenuPage from "./pages/Menu";
import OrdersPage from "./pages/Orders";
import AddMenuPage from "./pages/AddMenu";
import EditMenuPage from "./pages/EditMenu";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Home from "./pages/Home";

function App() {
  const { role } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {role === "admin" && (
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        )}
        <Route
          path="/menu"
          element={
            <Protected>
              <MenuPage />
            </Protected>
          }
        />
        <Route
          path="/menu/create"
          element={
            <Protected>
              <AddMenuPage />
            </Protected>
          }
        />
        <Route
          path="/menu/edit/:itemId"
          element={
            <Protected>
              <EditMenuPage />
            </Protected>
          }
        />
        <Route
          path="/orders"
          element={
            <Protected>
              <OrdersPage />
            </Protected>
          }
        />
        <Route
          path="/order/create"
          element={
            <Protected>
              <CreateOrder />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to={"/menu"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
