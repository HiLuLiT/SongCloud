import './topbar.scss';


import React from 'react';
import {NavLink} from 'react-router-dom'


export default class Topbar extends React.Component {
  constructor() {
    super();

    this.searchSubmit = this.searchSubmit.bind(this);
  };

  searchSubmit(event) {
    event.preventDefault();
    let searchQuery = this.search.value;
    this.props.history.push(`/explore/${searchQuery}?search=true`)
  }

  render() {
    return (
      <div className="topbar">

        <div className="logo-title-div">
          <NavLink to="/">
            <i className="fa fa-mixcloud cloud-logo-topbar" aria-hidden="true"/>
            <h1 className="title">SongCloud</h1>
          </NavLink>
          <nav>
            <ul className="nav-header">
              <li><NavLink to="/explore" activeClassName="selected">Explore</NavLink></li>
              <li><NavLink to="/playlists" activeClassName="selected">Playlists</NavLink></li>
            </ul>
          </nav>
        </div>

        <div className="right-top-bar-div">
          <form className="search-div" onSubmit={this.searchSubmit}>
            <button type="submit" className="fa fa-search search-font" aria-hidden="true"/>
            <input ref={(search) => this.search = search}
                   className="input-field"
                   type="search"
                   placeholder="SEARCH"/>
          </form>

          <NavLink to="/signin" className="log-out-btn">Logout</NavLink>
        </div>
      </div>
    );
  }
}
