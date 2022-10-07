import React from "react";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">

          <h1>Elefanti Ratings</h1>

          <div className="col">
            {/* Column1 */}
            <h4>FIND US ON</h4>
            <ul className="list-unstyled">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
            {/* Column2 */}
            <h4>RESOURCES</h4>
            <ul className="list-unstyled">
              <li>Support</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Elefanti Ratings | All rights reserved | Terms Of Service | Privacy
          </p>
          <button class="button button1">Green</button>
          <button class="button button2">Blue</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;