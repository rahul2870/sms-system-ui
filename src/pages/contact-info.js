import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/loader';

export default function ContactInfoPageF() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { list: contactList } = useSelector(_ => _?.contact);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentUser = contactList?.find(_ => _?.id == id);
            setUser(currentUser);
        }, 2000);

        return () => { // clearing interval for unwanted side effects & memory leaks
            clearTimeout(timeoutId);
        };
    }, [id, contactList]);

    return <div className='container'>
        {user ? <div>
            <div className='header-title'>
                <h1>User Details</h1>
                <p>User id : {id}</p>
            </div>
            <div className='user-details'>
                <p>First Name</p>
                <h3>{user?.firstName}</h3>
                <p>Last Name</p>
                <h3>{user?.lastName}</h3>
                <p>Contact Number</p>
                <h3>{user?.number}</h3>
                <div>
                    <p onClick={() => { navigate(-1); }}>Go Back</p>
                    <button onClick={() => { navigate(`/message-compose/${user?.id}`) }}>Send Message</button>
                </div>
            </div>
        </div> : <div>
            <Loader />
        </div>}
    </div>
}
