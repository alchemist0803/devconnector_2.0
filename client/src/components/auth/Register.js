import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        userType: 'dogWalker',
        email: '',
        city: "Jerusalem",
        password: '',
        password2: ''
    });

    const { name, userType, email, city, password, password2 } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, userType, city, email, password });
        }
    };
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    const cityName = [
        "Jerusalem",
        "Tel Aviv-Yafo",
        "Haifa",
        "Rishon LeẔiyyon",
        "Petaẖ Tiqwa",
        "Ashdod",
        "Netanya",
        "Beersheba",
        "Bené Beraq",
        "Holon",
        "Ramat Gan",
        "Ashqelon",
        "Reẖovot",
        "Bat Yam",
        "Bet Shemesh",
        "Kefar Sava",
        "Herẕliyya",
        "Hadera",
        "Modi‘in Makkabbim Re‘ut",
        "Nazareth",
        "Lod",
        "Ramla",
        "Ra‘ananna",
        "Rahat",
        "Nahariyya",
        "Givatayim",
        "Hod HaSharon",
        "Rosh Ha‘Ayin",
        "Qiryat Ata",
        "Umm el Faḥm",
        "Qiryat Gat",
        "Eilat",
        "Nes Ẕiyyona",
        "‘Akko",
        "El‘ad",
        "Ramat HaSharon",
        "Karmiel",
        "Afula",
        "Tiberias",
        "Eṭ Ṭaiyiba",
        "Qiryat Yam",
        "Qiryat Moẕqin",
        "Qiryat Bialik",
        "Qiryat Ono",
        "Or Yehuda",
        "Ma‘alot Tarshīḥā",
        "Ẕefat",
        "Dimona",
        "Tamra",
        "Netivot",
        "Sakhnīn",
        "Yehud",
        "Al Buţayḩah",
        "Al Khushnīyah",
        "Fīq",
    ]
    const cities = cityName.map((city) => {
        return <option value={city}>{city}</option>
    });

    return (
        <section className="container">
            <div className="auth">

                <h2 className="large head">SIGN UP</h2>
                <form className="form row" onSubmit={onSubmit}>
                    <div className="col-md-6">
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
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <select
                                name="city"
                                value={city}
                                onChange={onChange}
                            >
                                {cities}
                            </select>

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
                    </div>
                        <input type="submit" className="btn btn-success" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </section >
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);