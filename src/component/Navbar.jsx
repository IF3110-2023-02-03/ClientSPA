import { Link } from "react-router-dom";
import '../style/Navbar.css'

function Navbar() {
    return (
      <>
        <div className="navbar-container">
            <div className="navbar">
                <Link to='/content' className="navbar-item">
                    <img src="../../assets/image.png" alt="Content" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Content</p>
                </Link>
                <Link to='/broadcast' className="navbar-item">
                    <img src="../../assets/signal.png" alt="Broadcast" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Broadcast</p>
                </Link>
                <Link to='/followers' className="navbar-item">
                    <img src="../../assets/check.png" alt="Followers" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Followers</p>
                </Link>
                <Link to='/account' className="navbar-item">
                    <img src="../../assets/setting.png" alt="Account" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Account</p>
                </Link>
            </div>
        </div>
      </>
    )
}
  
  export default Navbar