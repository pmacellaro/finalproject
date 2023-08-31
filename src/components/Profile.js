import React from "react";
import './Profile.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function Profile({user}) {


return(

<div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
    <div className="rounded-lg shadow-xl bg-gray-900 text-white" style={{ width: '450px' }}>
        <div className="border-b border-gray-800 px-8 py-3">
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div>
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div>
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
        </div>
        <div className="px-8 py-6">
            <p><em className="text-blue-400">const</em> <span className="text-green-400">aboutMe</span> <span className="text-pink-500">=</span> <em className="text-blue-400">function</em>() {'{'}</p>
            <p>&nbsp;&nbsp;<span className="text-pink-500">return</span> {'{'}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;name: <span className="text-yellow-300">{user.username}</span>,</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Edit Profile?: <span className="text-yellow-300">'<NavLink to="/editprofile" className="text-yellow-300 hover:underline focus:border-none">Click Here</NavLink>'</span>,</p>
            
            <p>&nbsp;&nbsp;{'}'}</p>
            <p>{'}'}</p>
        </div>
    </div>
</div>)
}