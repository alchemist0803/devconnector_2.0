import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Forgot from './components/auth/ForgotPassword';
import Alert from './components/layout/Alert';
import AboutUs from './components/layout/AboutUs'
import ContactUs from './components/layout/ContactUs'
import Dashboard from './components/dashboard/Dashboard';
import User from './components/dashboard/Admin/User';
import DogWalkerList from './components/dashboard/Dog-Owner/DogWalkerList';
import WalkerProfile from './components/profile-forms/WalkerProfile';
import DogProfile from './components/profile-forms/DogProfile';
import OrderList from './components/dashboard/Dog-Walker/OrderList';

import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';

import { Provider} from 'react-redux';
import store from './store';
import { getUser, loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());
        store.dispatch(getUser());

        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Alert />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="forgot" element={<Forgot />} />
                    <Route path="aboutUs" element={<AboutUs />} />
                    <Route path="contactUs" element={<ContactUs />} />
                    <Route
                        path="dashboard"
                        element={<PrivateRoute component={Dashboard} />}
                    />
                    <Route
                        path="user"
                        element={<PrivateRoute component={User} />}
                    />
                    <Route
                        path="dogWalkerList"
                        element={<PrivateRoute component={DogWalkerList} />}
                    />
                     <Route
                        path="orderList"
                        element={<PrivateRoute component={OrderList} />}
                    />
                    <Route
                        path="walkerProfile"
                        element={<PrivateRoute component={WalkerProfile} />}
                    />
                    <Route
                        path="dogProfile"
                        element={<PrivateRoute component={DogProfile} />}
                    />
                </Routes>
                <Footer />
            </Router>
        </Provider>
    );
};

export default App;
