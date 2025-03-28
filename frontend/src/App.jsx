import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/login_signup/LoginSignup";
import NewsDashboard from "./components/news_dashboard/NewsDashboard";
import DetailedNews from "./components/detailed_news/DetailedNews";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginSignup/>} path="/login"/>
        <Route element={<NewsDashboard/>} path="/"/>
        <Route element={<ProtectedRoutes/>}>
          <Route element={<DetailedNews/>} path="/detailed"/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
