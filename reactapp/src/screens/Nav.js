import React from "react";
import "../App.css";
import logo from "../assets/Logo_Forky_dark.png";
import { Link } from "react-router-dom";
import { Badge } from "antd";

import { FiBell } from "react-icons/fi";

function Nav() {
  return (
    <nav>
      <div className="navbar">
        <Link to="/">
          <img style={{ width: 80, height: 80 }} src={logo} alt="Logo" />
        </Link>
        <Link to="/">Accueil</Link>
        <Link to="/my-invitations">Mes Invitations</Link>
        <Link to="/my-profile">Mon Profil</Link>

        <div className="notif">
          <div style={{ color: "#418581" }}>
            <Link to="/notifs">
              <Badge size="small" dot>
                <FiBell size={25} />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
