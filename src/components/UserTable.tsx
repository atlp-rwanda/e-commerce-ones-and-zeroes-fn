
import React, { useEffect } from "react"
import '../styles/UserTable.scss'
const logo = require('../assets/images/logo.png')

const UserTable: React.FC = () => {

	return (
		<div>
			<table>
				<thead>
				<tr>
					<th>User</th>
					<th>Email Address</th>
					<th>User Role</th>
					<th>status</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>
						<div className="userProfile">
						<img alt="profile" src={logo}/>
						<p>Jake</p>
						</div>
					</td>
					<td>jakefinch@gmail.com</td>
					<td>
						<p>Seller</p>
					</td>
					<td>
						<p>Active</p>
					</td>
				</tr>
				<tr>
					<td>
						<div className="userProfile">
						<img alt="profile" src={logo}/>
						<p>Jake</p>
						</div>
					</td>
					<td>jakefinch@gmail.com</td>
					<td>
						<p>Seller</p>
					</td>
					<td>
						<p>Active</p>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	)
}

export default UserTable
