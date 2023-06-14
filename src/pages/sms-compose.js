import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from '../components/loader';

const ServerURL = "https://sms-system-server-pq47jcjoc-rahul2870.vercel.app"

// to generate OTP randomly
function generateOTP() {
    const otpLength = 6;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const OTP = generateOTP();  // OTP for first screen load.

export default function ContactInfoPageF() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { list: contactList } = useSelector(_ => _?.contact);
    const [letConfirm, setLeftConfirm] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [smsText, setSmsText] = useState(`Hi, Your OTP is: ${OTP}`);
    const [error, setError] = useState({});

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            const currentUser = contactList?.find(_ => _?.id == id);
            setUser(currentUser);
        }, 1000);



        return () => {
            clearTimeout(timeoutId);
        };

    }, [id, contactList]);


    const sendSMSRequest = () => {
        setLoading(true);
        fetch(`${ServerURL}/send-sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user,
                otp: OTP,
                text: smsText
            })
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                if (!result?.success) {
                    NotificationManager.error('Something Went Wrong.', 'Got Error!', 5000);
                }
                NotificationManager.success('Sent Successfully.', 'Success!');
                navigate("/history");
            })
            .catch(error => {
                setLoading(false);
                NotificationManager.error('Something Went Wrong.', 'Got Error!', 5000);
            });

    }

    if (isLoading) {
        return <Loader />
    }
    return <div className='container'>
        {letConfirm && <div className='confirmation-box'>
            <h1>Alert! Message will only send to <span style={{ textDecoration: "underline" }}>+91-9810153260</span></h1>
            <div>
                <button onClick={() => { setLeftConfirm(false); }}>Cancel</button>
                <button onClick={sendSMSRequest}>Send Anyway</button>
            </div>
        </div>}
        {user ? <div>
            <div className='header-title'>
                <h1>Send Message Quick</h1>
                <p>User id : {id}</p>
            </div>
            <div className='user-details'>
                <p>Name</p>
                <h3>{user?.firstName} {user?.lastName}</h3>
                <p>Contact Number</p>
                <h3>{user?.number}</h3>
                <p>Text Message</p>
                <textarea
                    value={smsText}
                    onChange={_ => {
                        setSmsText(_.target.value);
                        if (_.target.value.length > 5) { setError({}); } // validating 
                    }}
                    placeholder="Type your sms."
                />
                {error?.texterror && <p style={{ color: "red", fontWeight: "600" }}>{error?.texterror}</p>}
                <div>
                    <p onClick={() => { navigate(-1); }}>Go Back</p>
                    <button onClick={() => {
                        if (smsText?.length === 0) {
                            setError(_ => ({ ..._, texterror: "Please Write Some Message" }));
                        } else if (smsText?.length < 5) {
                            setError(_ => ({ ..._, texterror: "Please Write Some More." }));
                        } else {
                            setError({});
                            setLeftConfirm(true);
                        }

                    }}>Send SMS</button>
                </div>
            </div>
        </div> : <div>
            <Loader />
        </div>}

        <NotificationContainer />
    </div>
}
