import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Home from './page/Home.jsx';
import Login from './page/Login.jsx';
import Register from './page/Register.jsx';
import Content from './page/Content.jsx';
import Broadcast from './page/Broadcast.jsx';
import Followers from './page/Followers.jsx';
import Account from './page/Account.jsx';
import { extendTheme } from "@chakra-ui/react";

function App() {
    const breakpoints = {
        base: "0px",
        sm: "375px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
      };
      
    const theme = extendTheme({ breakpoints });
      
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/content' element={<Content />} />
                <Route path='/broadcast' element={<Broadcast />} />
                <Route path='/followers' element={<Followers />} />
                <Route path='/account' element={<Account />} />
                {/* Catch-all route for unmatched URLs */}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </Router>
    );
}

export default App;