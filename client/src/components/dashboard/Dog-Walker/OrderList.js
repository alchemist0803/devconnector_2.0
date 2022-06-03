import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';

import { acceptOrder, refuseOrder } from '../../../actions/order';
import { addFunds } from '../../../actions/account';
import { messages, getMessage } from '../../../actions/message';

const OrderList = ({
    acceptOrder,
    refuseOrder,
    addFunds,
    getMessage,
    messages,
}) => {

    const client = useSelector((state) => state.auth.user);
    const initialMessageForm = {
        otherName: '',
        message: '',
    }
    const [orderData, setOrderData] = useState([]);
    const [view, setView] = useState(true);
    const [ccview, setCCView] = useState(false);
    const [funds, setFunds] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [names, setName] = useState("");
    const [contact, setContact] = useState(false);
    const [messageForm, setMessageForm] = useState(initialMessageForm);
    const { walker, message } = messageForm;
    const [messageData, setMessageData] = useState([]);
    const [messageContent, setMessageContent] = useState([]);

    useEffect(() => {
        setOrderData(client.request);
        setMessageData(client.messages);
    }, [client]);
    const accountData = orderData.filter((order) => {
        if (order.status === "done")
            return true
        else return false
    });

    const initialCardForm = {
        holderName: '',
        cvv: '',
        cardNumber: '',
        year: '',
        month: '',
    }
    const [cardFormData, setCardFormData] = useState(initialCardForm);
    const {
        holderName,
        cvv,
        cardNumber,
        year,
        month,
    } = cardFormData
    const GetMessage = (names) => {
        getMessage(names);
        messageData.map((walker) => {
            let className;
            if (walker.otherName === names) {
                messageList = walker.message.map((message) => {
                    if (message.where === "from") className = "msg-from"
                    else className = "msg-to"
                    return <div className={className}>{message.content}</div>
                })
            }
        })
        setMessageContent(messageList);
    }
    const MessageToAction = (e) => {
        e.preventDefault();
        messages(messageForm);
        setMessageForm(initialMessageForm);
        GetMessage(names);
        setContact(false);
    }
    let messageList;

    const contactBtnClicked = (name) => {
        setName(name);
        setContact(true);
        setMessageForm({ ...messageForm, "otherName": name });
        GetMessage(name);
    }
    const messageInput = (e) => {
        setMessageForm({ ...messageForm, [e.target.name]: e.target.value });
    }
    const orderList = {
        columns: [
            {
                label: 'Owner Name',
                field: 'ownerName',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Dog Name',
                field: 'dogName',
                sort: 'asc',
                width: 150
            },
            {
                label: 'From',
                field: 'from',
                sort: 'asc',
                width: 200
            },
            {
                label: 'To',
                field: 'to',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Budget',
                field: 'budget',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Proposal',
                field: 'proposal',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Refuse/Accept',
                field: 'accept',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Chat',
                field: 'chat',
                sort: 'asc',
                width: 200
            },
        ],
        rows: orderData.map((order) => {
            return (
                {
                    ownerName: order.ownerName,
                    dogName: order.dogName,
                    from: order.deadline.from.slice(0, 10),
                    to: order.deadline.to.slice(0, 10),
                    budget: order.budget,
                    proposal: order.proposal,
                    status: order.status,
                    accept: <div>
                        <button
                            onClick={() => { acceptOrder(client.name, order.ownerName, order.dogName) }}
                            className="btn btn-success"
                            disabled={order.status !== "posted"}>
                            Accept
                        </button>
                        <button
                            onClick={() => { refuseOrder(client.name, order.ownerName, order.dogName) }}
                            className="btn btn-danger"
                            disabled={order.status !== "posted" && order.status !== "accepted"}>
                            Refuse
                        </button>
                    </div>,
                    chat: <button
                        onClick={() => contactBtnClicked(order.ownerName)}
                        className="btn btn-primary"
                    >
                        Chat
                    </button>
                }
            )
        })
    };
    const accountList = {
        columns: [
            {
                label: 'Budget',
                field: 'budget',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Owner Name',
                field: 'ownerName',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Dog Name',
                field: 'dogName',
                sort: 'asc',
                width: 150
            },
            {
                label: 'From',
                field: 'from',
                sort: 'asc',
                width: 200
            },
            {
                label: 'To',
                field: 'to',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Proposal',
                field: 'proposal',
                sort: 'asc',
                width: 200
            },
        ],
        rows: accountData.map((order) => {
            return (
                {
                    budget: order.budget,
                    ownerName: order.ownerName,
                    dogName: order.dogName,
                    from: order.deadline.from.slice(0, 10),
                    to: order.deadline.to.slice(0, 10),
                    proposal: order.proposal,
                }
            )
        })
    };
    const changeHandler = (e) => {
        setFunds(e.target.value);
    }
    const AddFunds = () => {
        setCCView(true);
        setIsAdd(true);
    }
    const Withdraw = () => {
        setCCView(true);
        setIsAdd(false);
    }
    const onChange = (e) => {
        setCardFormData({ ...cardFormData, [e.target.name]: e.target.value });
    }
    const FundHandler = (e) => {
        e.preventDefault();
        setCCView(false);
        addFunds(funds, isAdd)
    }

    return (
        <section className="orderList row positionSetter">
            <div className='col-md-3 side'>
                <div onClick={() => setView(true)}>Order List</div>
                <hr></hr>
                <span onClick={() => setView(false)}>Account History</span><sup className='text-white' style={{backgroundColor: "red", padding: "2px", borderRadius: "10px"}}>{client && client.pay}</sup>
            </div>
            <div className='col-md-9 main'>
                {view &&
                        <div style={{ filter: contact ? "blur(1rem)" : "blur(0)" }}>
                        <MDBDataTable
                            className='orders'
                            hover
                            striped
                            bordered
                            small
                            data={orderList}
                        />
                    </div>
                }
                {!view &&
                    <div className='accountList'
                    style={{ filter: ccview ? "blur(1rem)" : "blur(0)" }}
                    >
                        <MDBDataTable hover
                            striped
                            bordered
                            small
                            data={accountList}
                        />
                        <div>
                            <input
                                className='fund'
                                type="number"
                                placeholder="1000$"
                                name="fund"
                                value={funds}
                                onChange={changeHandler}
                            />
                            <button className='add btn btn-success' onClick={AddFunds}>ADD</button>
                            <button className='withdraw btn btn-danger' onClick={Withdraw}>Withdraw</button>
                        </div>
                    </div>
                }
                {ccview &&
                    <form className='form ccview' onSubmit={FundHandler}>
                        <div className='large text-danger'>Credit Card Information</div>
                        <span className='btn btn-danger' onClick={()=>setCCView(false)}>X</span>
                        <div className='row '>
                            <div className="form-group col-md-8">
                                <label htmlFor='ownerName'>Holder Name</label>
                                <input
                                    id='ownerName'
                                    type="text"
                                    name="holderName"
                                    value={holderName}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor='cvv'>CVV</label>
                                <input
                                    id='cvv'
                                    type="number"
                                    name="cvv"
                                    value={cvv}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='cardNumber'>Card Number</label>
                            <input
                                id='cardNumber'
                                type="number"
                                name="cardNumber"
                                value={cardNumber}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group row">
                            <label>Expiration Date</label>
                            <div className='col-md-3'>
                                <select value={month} onChange={onChange}>
                                    <option value="01">January</option>
                                    <option value="02">February </option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className='col-md-3'>
                                <select value={year} onChange={onChange}>
                                    <option value="16"> 2016</option>
                                    <option value="17"> 2017</option>
                                    <option value="18"> 2018</option>
                                    <option value="19"> 2019</option>
                                    <option value="20"> 2020</option>
                                    <option value="21"> 2021</option>
                                    <option value="22"> 2022</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary col-md-5">Confirm</button>
                        </div>
                    </form>
                }
                <div className='sendMessage' style={{ display: contact ? "block" : "none" }}>
                    <h2>Send Message</h2>
                    <span className='btn btn-danger' onClick={() => setContact(false)}>X</span>
                    <div className='content'>
                        <div className='show' style={{ backgroundColor: "white", overflowY: "scroll" }}>
                            {messageContent}
                        </div>
                        <div className='send'>
                            <form className="form" onSubmit={MessageToAction}>
                                <div className="form-group">
                                    <textarea
                                        className='message'
                                        name="message"
                                        value={message}
                                        onChange={messageInput}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Send" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default connect(null, { acceptOrder, refuseOrder, addFunds, messages, getMessage })(
    OrderList
);