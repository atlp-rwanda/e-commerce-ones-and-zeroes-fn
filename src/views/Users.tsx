import React, { useState } from 'react'
import '../styles/Users.scss'
import UserTable from '../components/UserTable'

const printSomething = ()=>{
    console.log("Hello")
}

const Users: React.FC = ()=>{
    return (
    <div>
    	<div className="mainContainer">
    	    <UserTable/>
	        <button className="btn" onClick={()=>printSomething()}>Save</button>
	    </div>
    </div>
    )
}

export default Users
