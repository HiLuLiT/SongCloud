import React from 'react';
import {NavLink} from 'react-router-dom'
export default function Topbar() {

  return (
    <div className="my-header">

      <div className="logo-title-div">
        <NavLink to="/">
        <i className="fa fa-mixcloud cloud-logo-topbar" aria-hidden="true"></i>
        <h1 className="title">SongCloud</h1>
        </NavLink>
        <nav>
          <ul className="nav-header">
            <li><NavLink to="/explore" exact activeClassName="selected">Explore</NavLink></li>
            <li><NavLink to="/playlists" exact activeClassName="selected">Playlists</NavLink></li>
          </ul>
        </nav>
      </div>

      <div className="search-div">
        <input className="input-field" type="text" placeholder="SEARCH"/>
        <button className="log-out-btn">Log Out</button>
      </div>
    </div>
  );
};
