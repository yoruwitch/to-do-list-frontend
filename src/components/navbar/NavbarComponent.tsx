import logo from "../../assets/logo.png";
import "./navbar.css";
function NavbarComponent() {
    return (
        <>
            <nav>
                <div className="navbar_container">
                    <img src={logo} alt="Logo" id="logo" />
                </div>
            </nav>
        </>
    );
}

export default NavbarComponent;
