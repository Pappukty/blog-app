import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icon">
        <span>
          <Link>
            <AiFillGithub className="icon-fd" />
          </Link>
        </span>
        <span>
          <Link>
            <AiFillLinkedin className="icon-fd" />
          </Link>
        </span>
        <span>
          <Link>
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
        2023 All Rights Reserverd. This template is made with by
        
      </span>
      <Link className="name-prt">ajay</Link>
    </div>
  );
};

export default Footer;
