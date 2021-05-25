import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">

      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/home" class="navbar-brand">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to={"/sign-in"}>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
          </li>
        </ul>
      </div>
    </nav>


  );
}

export default Navbar;