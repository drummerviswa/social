import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout(currentUser);
      navigate("/login")
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Parimaatram</span>
        </Link>
        <HomeOutlinedIcon onClick={() => navigate("/")} />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        {currentUser.type===0?<></>:<PersonOutlinedIcon onClick={() => navigate("/admin")} />}
        <EmailOutlinedIcon className="em" onClick={() => {window.open("https://www.gmail.com","_blank")}} />
        <NotificationsOutlinedIcon className="no" />
        <div style={{cursor:"pointer"}} className="user" onClick={handleLogout}>
          <img
            src={"/uploads/"+currentUser.coverPic}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
