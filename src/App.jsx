import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from './page/Home.jsx'
import Login from './page/Login.jsx'
import Register from "./page/Register.jsx";
import Content from "./page/Content.jsx";
import Broadcast from "./page/Broadcast.jsx";
import Followers from "./page/Followers.jsx";
import Account from "./page/Account.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/content" element={<Content />} />
        <Route path="/broadcast" element={<Broadcast />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  )
}

export default App