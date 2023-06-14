import React, { useEffect, useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader';

const ServerURL = "https://sms-system-server.vercel.app"


export default function SmsHistoryPage() {

    const [sentSMSList, setSentSMSList] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [sortByTime, setSortByTime] = useState(1);
    const navigate = useNavigate();
    const fetchList = (sortByTime = 1) => {
        setIsloading(true);
        fetch(`${ServerURL}/sent-sms-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sortByTime: sortByTime
            })
        })
            .then(response => response.json())
            .then(result => {
                if (!result?.success) {
                    NotificationManager.error('Something Went Wrong.', 'Got Error!', 5000);
                }
                setSentSMSList(result?.messages);
                NotificationManager.success('Latest list!.', 'Fetched!');
                setIsloading(false);
                setSortByTime(sortByTime)
            })
            .catch(error => {
                setIsloading(false);
                NotificationManager.error('Something Went Wrong.', 'Got Error!', 5000);
            });
    }
    useEffect(() => {
        fetchList();
    }, []);


    if (isLoading) {
        return (<Loader />)
    }

    const sortListWRT = (order) => {
        fetchList(order);
    }
    return <div className='container'>

        <div className='header-sort'>
            <h1>List Of Sent SMS(s)</h1>
            <div>
                <p>Sort By Time</p>
                <div>
                    <p
                        onClick={() => { sortListWRT(1); }}
                        style={{
                            ...(sortByTime === 1 ? { fontWeight: "600", textDecoration: "underline" } : {})
                        }}>Ascending</p>
                    <p
                        onClick={() => { sortListWRT(-1); }}
                        style={{
                            ...(sortByTime === -1 ? { fontWeight: "600", textDecoration: "underline" } : {})
                        }}>Decending</p>
                </div>
            </div>
        </div>
        {sentSMSList?.length ?
            <div className='scroll-list'>
                <div className='contact-list-header'>
                    <p>Name</p>
                    <p>OTP</p>
                    <p>Time</p>
                    <p>Contact Number</p>
                    <p>Actions</p>
                </div>
                {sentSMSList?.map(item => {
                    const date = new Date(item?.createdAt);
                    const readableTime = date.toLocaleTimeString();
                    return <div
                        className='contact-items'
                        key={item?._id}>
                        <p>{item?.user?.firstName} {item?.user?.lastName}</p>
                        <p>{item?.otp}</p>
                        <p>{readableTime}</p>
                        <p>{item?.user?.number}</p>
                        <div>
                            <p onClick={() => { navigate(`/info/${item?.user?.id}`); }}>View</p>
                            <p onClick={() => { navigate(`/message-compose/${item?.user?.id}`); }}>Send Again</p>
                        </div>
                    </div>
                })}
            </div> : <div >
                <h1 style={{ textAlign: "center", fontWeight: "300", marginTop: "20vh" }}>No Contact List Found!</h1>
            </div>}
        <NotificationContainer />
    </div>
}
