import '../style/Navbar.css'

function Navbar() {
    return (
      <>
        <div className="navbar-container">
            <div className="navbar">
                <a href="/public/user/photos" className="navbar-item">
                    <img src="../../public/assets/image.png" alt="Content" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Content</p>
                </a>
                <a href="/public/user/search" className="navbar-item">
                    <img src="../../public/assets/signal.png" alt="Broadcast" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Broadcast</p>
                </a>
                <a href="/public/user/feeds" className="navbar-item">
                    <img src="../../public/assets/check.png" alt="Followers" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Followers</p>
                </a>
                <a href="/public/user/spaces" className="navbar-item">
                    <img src="../../public/assets/setting.png" alt="Account" className="navbar-item-img"/>
                    <p className="navbar-item-desc">Account</p>
                </a>
            </div>
        </div>
      </>
    )
}
  
  export default Navbar