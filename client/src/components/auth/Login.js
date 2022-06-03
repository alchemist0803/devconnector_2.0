import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, auth: { isAuthenticated, user } }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (user && isAuthenticated) {
      if (user.userType === "admin")
        return <Navigate to="/user" />;
      else return <Navigate to="/dashboard" />;
  }
  return (
    <section className="container">
      <div className="auth">
        <h3 className="large head">Sign In</h3>
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          <Link to="/forgot">Forgot Password?</Link>
        </p>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
