import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function AllContactList() {

    const { list: contactList } = useSelector(_ => _?.contact);
    const navigate = useNavigate();

    return <div className='container'>
        <div className='header-title'>
            <h1>All Contact List</h1>
            <p>Send SMS(s)</p>
        </div>

        {contactList?.length ?
            <div className='scroll-list'>
                <div className='contact-list-header'>
                    <p>First Name</p>
                    <p>| Last Name</p>
                    <p>| Contact Number</p>
                    <p>| Action(s)</p>
                </div>
                {contactList?.map((item, index) => <div
                    style={{
                       backgroundColor: index % 2 === 0 ? 'rgb(243, 243, 243)' : 'white'
                    }}
                    className='contact-items'
                    key={item?.id}>
                    <p>{item?.firstName}</p>
                    <p>{item?.lastName}</p>
                    <p>{item?.number}</p>
                    <div>
                        <p onClick={() => { navigate(`/info/${item?.id}`); }}>View</p>
                        <p onClick={() => { navigate(`/message-compose/${item?.id}`); }}>Send Message</p>
                    </div>
                </div>)}
            </div> : <div>
                <h1>No Contact List Found!</h1>
            </div>}
    </div>
}
