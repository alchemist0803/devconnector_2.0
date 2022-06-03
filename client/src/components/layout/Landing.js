import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay side">
        <div className="landing-inner">
          <h1 className="x-large">DOG WALKER</h1>
          <p className="lead">
            Welcome! You can get conveninece in here, DOG WALKER
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-success">
              Sign Up
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
