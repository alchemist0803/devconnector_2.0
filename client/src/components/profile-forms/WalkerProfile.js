import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const WalkerProfile = ({
    auth: { user },
    createProfile,
}) => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        setUserData(user);
    }, [user]);

    const [formData, setFormData] = useState({
        type: "Beginer",
        name: "",
        birthday: "",
        phone: "",
        description: ""
    });

    const {
        type,
        name,
        birthday,
        phone,
        description
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData);
    };

    return (
        <section className='walker'>
            <div className="walkProfile">
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <select name="type" value={type} onChange={onChange}>
                            <option value="Beginer">Beginer</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <small className='form-text'>Walker Level</small>
                    </div>
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
                        <input
                            type="Date"
                            placeholder="Birthday"
                            name="birthday"
                            value={birthday}
                            onChange={onChange}
                        />
                    </div>
                    <small className='form-text'>Your Birthday</small>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="03-9366383"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                        />
                    </div>
                    <small className='form-text'>Your Birthday</small>
                    <div className="form-group">
                        <textarea
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onChange}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary my-1" />
                    <Link to="/dashboard" className='btn btn-success'>Go Back</Link>
                </form>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { createProfile })(
    WalkerProfile
);
