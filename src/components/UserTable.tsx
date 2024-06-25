
import React, { useEffect } from "react"
import '../styles/UserTable.scss'
const logo = require('../assets/images/logo.png')

const UserTable: React.FC = () => {

	return (
		<div>
			<table>
				<thead>
				<tr>
					<th></th>
					<th>User</th>
					<th>Email Address</th>
					<th>User Role</th>
					<th>status</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td><input type="checkbox" id="" name="selected" value="selected"/></td>
					<td>
						<div className="userProfile">
						<img alt="profile" src={logo}/>
						<p>Jake</p>
						</div>
					</td>
					<td>jakefinch@gmail.com</td>
					<td>
						<select name="role">
							<option value="Buyer">Buyer</option>
							<option value="seller">Seller</option>
							<option value="admin">Admin</option>
						</select>
					</td>
					<td>
						<select name="isActive">
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	)
}

export default UserTable
