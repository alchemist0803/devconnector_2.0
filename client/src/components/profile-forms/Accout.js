import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';

const Account = ({
    setAlert
}) => {

    const client = useSelector((state) => state.auth.user);
    const initialForm = {
        name: '',
        cvv: '',
        cardNumber: '',
        budget: '',
        proposal: '',
    }
    const [formData, setFormData] = useState(initialForm);

    return (
        <section className="account">
            <div className='row'>
                    <form>
                        <div className='row '>
                            <div className="form-group col-md-8">
                                <input
                                    className='ownerName'
                                    type="name"
                                    name="name"
                                    value={from}
                                    onChange={onChange}
                                />

                            </div>
                        </div>
                    </form>
            </div>
        </section >
    );
};


export default connect(null, {  })(
    Account
);
