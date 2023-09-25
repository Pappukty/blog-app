import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { GiBookAura } from "react-icons/gi";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-icon">
          <span>
            <Link to="https://github.com/Pappukty">
              <AiFillGithub className="icon-fd" />
            </Link>
          </span>
          <span>
            <Link to="https://www.linkedin.com/in/ajay-k-4a2895283/">
              <AiFillLinkedin className="icon-fd" />
            </Link>
          </span>
          <span>
            <Link to="https://www.instagram.com/">
              <FaInstagramSquare className="icon-fd" />
            </Link>
          </span>
          <span>
            <Link></Link>
          </span>
        </div>
        <span className="des-footer">
          {" "}
          <AiOutlineCopyrightCircle />
          2023-All rights reserved. This Developed with by
          <GiBookAura className="icon-ft-book" />
          Ajay
        </span>
      </div>
    </div>
  );
};

export default Footer;
