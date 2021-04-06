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

            <li class="nav-item">
              <Link to="/login" class="navbar-brand">login</Link>
            </li>
        </ul>
      </div>
    </nav>


  );
}

export default Navbar;