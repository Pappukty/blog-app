 import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import "./nav.css";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useStateContext } from "../../../../contexts/context";
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userName, userLogin, setUserLogin } = useStateContext();
  const Logout = () => {
    setMenuOpen(false);
    setUserLogin(false);
    localStorage.clear();
  };
  return (
    <div className="nav">
      <div className="nav-item">
        <div>
          <h2 className="nav-blg">
            <Link to="/">
              <h3>
                {" "}
                B<span>l</span>o<span>g</span>
              </h3>
            </Link>
          </h2>
        </div>
        <div>
          <Link to="/createpost" className="icon">
            <span className="create-icon">
              <AiOutlinePlusSquare className="plus" />
            </span>
          </Link>
        </div>
        <div>
          {menuOpen && (
            <nav
              className="nav-nv"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <ul className="nav-link">
                <Link to="userAccount">
                  <li>Profile</li>
                </Link>
                <Link to="/login" onClick={Logout}>
                  <li>Logout</li>
                </Link>
              </ul>
            </nav>
          )}

          <button
            className="profile-cr-log"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <BiUserCircle className="profile-icon-cr-log" />
            {/* <h5>{userName.userName ? `${userName.userName}` : "profile"} </h5> */}
            profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
