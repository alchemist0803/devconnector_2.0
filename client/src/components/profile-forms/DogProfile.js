import React, { useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';

import { dogProfile, deleteProfile } from '../../actions/profile';


const DogProfile = ({
    auth: { user },
    dogProfile,
    deleteProfile,
}) => {
    const [file, setFile] = useState("./avatar/doc.jpg");
    function handleChange(e) {
        console.log(URL.createObjectURL(e.target.files[0]));
        // setFile(e.target.files[0].name);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const [dogList, setDogList] = useState([]);
    const [formData, setFormData] = useState({
        type: "Sheperd",
        name: "",
        birth: "",
        description: "",
    });
    const [showProfile, setShowProfile] = useState(false);
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        setDogList(user.dogProfile);
    }, [user]);

    const {
        type,
        name,
        birth,
        description,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dogProfile(formData, edit, file);
        setShowProfile(false);
        setFile("./avatar/doc.jpg");
    };

    const dogs = {
        columns: [
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Birthday',
                field: 'birth',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Edit',
                field: 'edit',
                sort: 'asc',
                width: 200
            },
        ],
        rows: dogList.map((user) => {
            return (
                {
                    type: user.type === undefined ? "" : user.type,
                    name: user.name,
                    birth: user.birth && user.birth.slice(0, 10),
                    description: user.description,
                    edit: <div>
                        <button
                            onClick={() => {
                                setShowProfile(true);
                                setEdit(true);
                                setFormData({ id: user._id, type: user.type, name: user.name, birth: user.birth.slice(0, 10), description: user.description });
                                setFile(user.file);
                            }
                            }
                            className="btn btn-success">
                            Edit
                        </button>
                        <button
                            onClick={() =>
                                deleteProfile(user._id)
                            }
                            className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                }
            )
        })
    };
    return (
        <section className="walkerList">
            <div className='showProfile' style={{ filter: showProfile ? "blur(1rem)" : "blur(0)" }}>
                <div className='main'>
                    <MDBDataTable hover
                        btn={true}
                        striped
                        bordered
                        small
                        data={dogs}
                    />
                    <div className='add btn btn-success' onClick={() => {
                        setShowProfile(true); setEdit(false); setFormData({
                            type: "Sheperd",
                            name: "",
                            birth: "",
                            description: "",
                        })
                    }}>ADD</div>
                </div>
            </div>

            <div className="addProfile" style={{ display: showProfile ? "block" : "none" }}>
                <h1 className="large text-primary">
                    {edit ? 'Edit Your Dog Profile' : 'Create Your Dog Profile'}
                </h1>
                <span className='btn btn-danger' onClick={() => setShowProfile(false)}>X</span>

                <form className="form" onSubmit={onSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label htmlFor="file-input">
                                <img src="upload.jpg" />
                            </label>

                            <input type="file" id="file-input" className='file' onChange={handleChange} />
                            <img src={file} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input
                                id = "name"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Dog Type</label>
                        <select name="type" value={type} onChange={onChange}>
                            <option value="Sheperd">Sheperd</option>
                            <option value="Retriever">Retriever</option>
                            <option value="BichonFrise">BichonFrise</option>
                            <option value="BorderCollie">BorderCollie</option>
                            <option value="Bulldog">Bulldog</option>
                            <option value="Poodle">Poodle</option>
                            <option value="Boxer">Boxer</option>
                            <option value="SiberianHusky">SiberianHusky</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label htmlFor='date'>Dog's Birthday</label>
                        <input
                            id="date"
                            type="Date"
                            placeholder="Birthday"
                            name="birth"
                            value={birth}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onChange}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary my-1" />
                    <div className="btn btn-danger my-1" onClick={() => setShowProfile(false)}>
                        Go Back
                    </div>
                </form>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { dogProfile, deleteProfile })(
    DogProfile
);
