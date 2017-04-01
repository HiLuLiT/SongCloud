import React from 'react';

export default function Signup() {

  return (
    <div className="sign-in-wrapper">

      <div className="cloud-wrapper">
        <i className="fa fa-mixcloud" aria-hidden="true"></i>
        <h1 className="sign-in-header">SongCloud</h1>
      </div>

      <form className="form-wrapper">
        <h3>Sign Up</h3>
        <label htmlFor="username" className="user-label">User Name</label>
        <input id="username" type="text"/>
        <label htmlFor="password" className="pass-label">Password</label>
        <input id="password" type="text"/>

      </form>
      <button className="continue-btn">CONTINUE</button>
      <span>Don't have an account yet? <a href="" className="create-account-link">Create Account</a></span>

    </div>
  );
};
