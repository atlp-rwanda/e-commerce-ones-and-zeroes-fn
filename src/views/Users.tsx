import React, { useState } from 'react'
import '../styles/Users.scss'
import UserTable from '../components/UserTable'

const Users: React.FC = ()=>{
    return (
    <div>
    	<div className="mainContainer">
    	    <UserTable/>
	    </div>
    </div>
    )
}

export default Users
