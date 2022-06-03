import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';

import { deleteUser, approveUser, updateUser } from '../../../actions/auth'

const User = ({ deleteUser, approveUser, updateUser }) => {

    const userData = useSelector((state) => state.auth.allUser);
    let allUser = {};
    let dogWalker = {};
    let dogOwner = {};

    let [view, setView] = useState(0);
    let [updateView, setUpdateView] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        userType: 'admin',
        city: 'a',
        id: ''
    });
    const { name, userType, city, id } = formData;
    let filteredByWalker;
    let filteredByOwner;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        updateUser(formData);
        setUpdateView(false);
    };
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
    if (userData !== undefined) {
        filteredByWalker = userData.filter((userList) => {
            if (userList.userType === "dogWalker") {
                return true
            } else {
                return false
            }
        });
        filteredByOwner = userData.filter((userList) => {
            if (userList.userType === "dogOwner") {
                return true
            } else {
                return false
            }
        });
        allUser = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'User Type',
                    field: 'userType',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'City',
                    field: 'city',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Approve',
                    field: 'approve',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Edit',
                    field: 'edit',
                    sort: 'asc',
                    width: 250
                }
            ],
            rows: userData.map((user) => {
                return (
                    {
                        name: user.name,
                        userType: user.userType,
                        city: user.city,
                        email: user.email,
                        approve: <button
                            onClick={() => approveUser(user._id, user.status)}
                            className={!user.status && "btn btn-success" || user.status && "btn btn-danger"}>
                            {!user.status && "Approve" || user.status && "Deny"}
                        </button>,
                        edit: <div>
                            <button
                                onClick={() => {
                                    setUpdateView(!updateView);
                                    setFormData({ name: user.name, userType: user.userType, city: user.city, id: user._id });
                                }
                                }
                                className="btn btn-success">
                                Edit
                            </button>
                            <button
                                onClick={() => deleteUser(user._id)}
                                className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    }
                )
            })
        };
        dogWalker = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Member Since',
                    field: 'date',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'City',
                    field: 'city',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Approve',
                    field: 'approve',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Edit',
                    field: 'edit',
                    sort: 'asc',
                    width: 250
                }
            ],

            rows: filteredByWalker.map((user) => {
                return (
                    {
                        name: user.name,
                        date: user.date.slice(0, 4) + "." + user.date.slice(5, 7) + "." + user.date.slice(8, 10),
                        city: user.city,
                        email: user.email,
                        approve: <button
                            onClick={() => approveUser(user._id, user.status)}
                            className={!user.status && "btn btn-success" || user.status && "btn btn-danger"}>
                            {!user.status && "Approve" || user.status && "Deny"}
                        </button>,
                        edit: <div>
                            <button
                                onClick={() => {
                                    setUpdateView(!updateView);
                                    setFormData({ name: user.name, userType: user.userType, city: user.city, id: user._id });
                                }
                                }
                                className="btn btn-success">
                                Edit
                            </button>
                            <button
                                onClick={() => deleteUser(user._id)}
                                className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    }
                )
            })
        };
        dogOwner = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Member Since',
                    field: 'date',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'City',
                    field: 'city',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Approve',
                    field: 'approve',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Edit',
                    field: 'edit',
                    sort: 'asc',
                    width: 250
                }
            ],

            rows: filteredByOwner.map((user) => {
                return (
                    {
                        name: user.name,
                        date: user.date.slice(0, 4) + "." + user.date.slice(5, 7) + "." + user.date.slice(8, 10),
                        city: user.city,
                        email: user.email,
                        approve: <button
                            onClick={() => approveUser(user._id, user.status)}
                            className={!user.status && "btn btn-success" || user.status && "btn btn-danger"}>
                            {!user.status && "Approve" || user.status && "Deny"}
                        </button>,
                        edit: <div>
                            <button
                                onClick={() => {
                                    setUpdateView(!updateView);
                                    setFormData({ name: user.name, userType: user.userType, city: user.city, id: user._id });
                                }
                                }
                                className="btn btn-success">
                                Edit
                            </button>
                            <button
                                onClick={() => deleteUser(user._id)}
                                className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    }
                )
            })
        };

    }
    return (
        <section className='profileEditing'>
            <div className="userList">
                <div className='row'>
                    <div className='col-md-3 side'>
                        <div onClick={() => setView(0)}>All User List</div>
                        <hr></hr>
                        <div onClick={() => setView(1)}>Dog-Walkers</div>
                        <hr></hr>
                        <div onClick={() => setView(2)}>Dog Owners</div>
                    </div>
                    <div className='col-md-9 userTable'>
                        {view == 0 &&
                            <div>
                                {updateView &&
                                    <form className="form" onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value={name}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userType">User-Type</label>
                                            <select
                                                id="userType"
                                                name="userType"
                                                value={userType}
                                                onChange={onChange}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="dogWalker">Dog-Walker</option>
                                                <option value="dogOwner">Dog Owner</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <select
                                                id="city"
                                                name="city"
                                                value={city}
                                                onChange={onChange}
                                            >
                                                {cities}
                                            </select>

                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Update" />
                                    </form>
                                }
                                <MDBDataTable hover
                                    striped
                                    bordered
                                    small
                                    data={allUser}
                                />
                            </div>
                        }
                        {view == 1 &&
                            <div>
                                {updateView &&
                                    <form className="form" onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value={name}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userType">User-Type</label>
                                            <select
                                                id="userType"
                                                name="userType"
                                                value={userType}
                                                onChange={onChange}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="dogWalker">Dog-Walker</option>
                                                <option value="dogOwner">Dog Owner</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <select
                                                id="city"
                                                name="city"
                                                value={city}
                                                onChange={onChange}
                                            >
                                                {cities}
                                            </select>

                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Update" />
                                    </form>
                                }
                                <MDBDataTable hover
                                    striped
                                    bordered
                                    small
                                    data={dogWalker}
                                />
                            </div>
                        }
                        {view == 2 &&
                            <div>
                                {updateView &&
                                    <form className="form" onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value={name}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="userType">User-Type</label>
                                            <select
                                                id="userType"
                                                name="userType"
                                                value={userType}
                                                onChange={onChange}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="dogWalker">Dog-Walker</option>
                                                <option value="dogOwner">Dog Owner</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <select
                                                id="city"
                                                name="city"
                                                value={city}
                                                onChange={onChange}
                                            >
                                                {cities}
                                            </select>

                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Update" />
                                    </form>
                                }
                                <MDBDataTable hover
                                    striped
                                    bordered
                                    small
                                    data={dogOwner}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default connect(null, { deleteUser, approveUser, updateUser })(User);
