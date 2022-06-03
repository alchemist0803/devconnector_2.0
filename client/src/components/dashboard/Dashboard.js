import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = ({
    auth: { user },
    setAlert
}) => {

    const onClick = () => {
        if (user.status) {
            if (user.userType === "dogOwner") {
                return <Navigate to="/dogWalkerList" />
            } else {
                return <Navigate to="/requestPage" />
            }
        } else setAlert('You are not approved yet', 'danger');
    }

    return (
        <section className="dashboard">
            <div className='side'>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Welcome {user && user.name}
                </p>
                {/* if you have profile show project, if not create profile */}
                {user && user.userType == "dogOwner" && (
                    <>
                        <h3>Here when you need us</h3>
                        <p>Whether you're looking for daily walks, planning a trip, stuck at work, or just want your best friend to have some company — we offer any day, anytime care.
                        </p>

                        <h3>Safety is serious business</h3>
                        <p>Your dog's safety is our top priority. Every Pet Caregiver passes an enhanced background check, our services are insured, and support is standing by around the clock.
                        </p>

                        <h3>All about convenience</h3>
                        <p>We've thought of everything, so you don't have to. From GPS-tracked walks and customized lockboxes, to easy booking on the Wag! app, we make your life easier at every step.
                        </p>

                        <h3>We've been around the block</h3>
                        <p>This site has a trusted record of experience with over 10M pet care services across 4,600 cities and counting. More than 150,000 Pet Caregivers nationwide are dog people, and it shows.
                        </p>

                        <h3>We've been around the block</h3>
                        <p>This site has a trusted record of experience with over 10M pet care services across 4,600 cities and counting. More than 150,000 Pet Caregivers nationwide are dog people, and it shows.
                        </p>

                        <h3>We've been around the block</h3>
                        <p>This site has a trusted record of experience with over 10M pet care services across 4,600 cities and counting. More than 150,000 Pet Caregivers nationwide are dog people, and it shows.
                        </p>
                        {user.status ? <Link to="/dogWalkerList" className='btn btn-success'>
                            GO
                        </Link> : setAlert("You are not approved yet.", "danger")}
                        
                    </>
                )}
                {(user && user.userType == "dogWalker" && (
                    <>
                        <h3>The Dog Walker - Multi award-winning pet care and wellbeing specialist</h3>
                        <p>Founded by pet lover Richie Barlow in 2006, The Dog Walker is one of the UKs largest pet care and wellbeing specialists. We provide fully insured and registered care for customers’ pets in the stress-free environment of their own home.</p><br />
                        <p>
                            While our customers go about their busy lives, we walk their dogs and even offer exclusive home boarding. We provide a pet-taxi service for important events such as weddings, as well as those unfortunate vet visits. At The Dog Walker we also provide in-house care for cats too, making it a less stressful experience for felines.
                        </p><br />
                        <p>
                            Having been a dog and cat owner all his life and then working at a range of kennels in Yorkshire - dealing with up to 80 cats and 55 dogs at any one time - Richie was convinced that there was a better way to care for our furry friends. He saw how pets often felt distressed by howling and barking in an unfamiliar environment and that they feel safer and more relaxed in their own home surroundings.
                        </p><br />
                        <p>
                            We are now 15-years strong and our accolades stack up along the way. We are winners of 'Best Small Business 2015', Deborah Meadens regional winner for 'Local Business Accelerators 2012' and proud owner of 'Young Entrepreneur of the Year 2013'. As our efforts in business are becoming widely known, The Dog Walker has been approached by a number of TV companies, including Dragons Den and ITV documentaries to name a few.
                        </p><br />
                        Due to Richies passion for the business, we've been appearing in national and regional newspapers, on radio stations and blogs with Richie being named one of Insider Magazines '42 under 42'.
                        <p>
                            The success of The Dog Walker has seen competitors benefit from our hard work as we have set the standard for professional dog-walking and many now copy our format.</p><br />
                        {user.status ? <Link to="/orderList" className='btn btn-success'>
                            GO
                        </Link> : setAlert("You are not approved yet.", "danger")}
                    </>

                )
                )}
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(
    Dashboard
);
