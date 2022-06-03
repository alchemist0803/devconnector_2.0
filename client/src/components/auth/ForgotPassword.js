import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { setAlert } from '../../actions/alert';
import { forgot } from '../../actions/auth';

const ForgotPassword = ({ isAuthenticated, setAlert, forgot }) => {
    const [formData, setFormData] = useState({
        name: '',
        userType: 'dogWalker',
        email: '',
        password: '',
        password2: ''
    });

    const { name, userType, email, password, password2 } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            forgot({ name, userType, email, password });
        }
    };
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <section className="container">
            <div className="auth">
                <h3 className="head">RESIGN UP</h3>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <select
                            name="userType"
                            value={userType}
                            onChange={onChange}
                        >
                            <option value="dogWalker">Dog-Walker</option>
                            <option value="dogOwner">Dog Owner</option>
                        </select>
                    </div>
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
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="ReRegister" />
                </form>
            </div>
        </section >
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, forgot })(ForgotPassword);
