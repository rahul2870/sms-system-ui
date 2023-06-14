import React from 'react'

export default function Loader() {
    return <div style={{ textAlign: "center" ,margin:"70px 0px"}}>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p style={{ fontSize: 12 }}>Please wait!</p>
    </div>;
}
