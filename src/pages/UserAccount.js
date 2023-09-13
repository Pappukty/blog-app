import React from "react";
import profile from "../image/images.jpg";
import "./style/UserAccount.css";
import { Link } from "react-router-dom";
const UserAccount = () => {
  return (
    <div>
      <div className="userhd">
        <h5 className="logoname">Blog</h5>

        <Link to="/home" className="user-hd-link">
          home
        </Link>
      </div>
      <div className="useraccount">
        <from>
          <section className="profile">
            <div className="userProfile">
              <img src={profile} alt="" width="90px" />
              <label for="userNe-la" className="userNe-la">
                username
              </label>
              <input type="text"></input>
              <label for="email-la" className="email-la">
                Email
              </label>
              <input type="email"></input>
              <label for="password-la" className="password-la">
                password
              </label>
              <input type="password"></input>
              <label for="number-la" className="number-la">
                Number
              </label>
              <input type="number"></input>
              <button className="userBtn"> add submit</button>
            </div>
          </section>
        </from>
      </div>
    </div>
  );
};

export default UserAccount;
