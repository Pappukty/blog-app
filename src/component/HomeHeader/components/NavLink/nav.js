import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import "./nav.css";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useStateContext } from "../../../../contexts/context";
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userName } = useStateContext();
  return (
    <div className="nav">
      <div className="nav-item">
        <h2 className="nav-blg">
          <Link to="/">
            B<span>l</span>o<span>g</span>
          </Link>
        </h2>

        <Link to="/CreatePost" className="icon">
          <span className="create-icon">
            <AiOutlinePlusSquare className="plus" />
          </span>
        </Link>
        <div>
          {!menuOpen ? (
            <nav className="nav">
              <ul className="nav-link">
                <Link to="userAccount">
                  <li>Profile</li>
                </Link>
                <Link to="/login">
                  <li>Logout</li>
                </Link>
              </ul>
            </nav>
          ) : (
            ""
          )}
        </div>
        <button
          className="profile-cr-log"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <BiUserCircle className="profile-icon-cr-log" />
          <h5>{userName.name ? `${userName.name}` : "profile"} </h5>
        </button>
      </div>
    </div>
  );
};

export default Nav;
