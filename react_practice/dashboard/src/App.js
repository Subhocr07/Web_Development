import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Filemanager from "./pages/Filemanager";
import Name from "./pages/Name";
import Order from "./pages/Order";
import Settings from "./pages/Settings";
import User from "./pages/User";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/filemanager" element={<Filemanager />} />
            <Route path="/name" element={<Name />} />
            <Route path="/order" element={<Order />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<>Element not found</>} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
