import React from "react"
import { faUser,faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserTable.scss'
import { User } from '../../Pages/UsersAdminDash/UsersAdminDash'
import '../../styles/tables.scss'

function UserTable({ users,optionsMenuActive, selectedUser, updateOptionsMenuActive, updateSelectedUser, updateOptionsMenuPosition}: any) {

	function handleEllipsisClick(event: React.MouseEvent, user: User) {
		const rect = event.currentTarget.getBoundingClientRect()

		if(optionsMenuActive && selectedUser && selectedUser.userId === user.userId){
			updateOptionsMenuActive(false)
			updateSelectedUser(null)
		}else{
			updateOptionsMenuActive(true)
			updateSelectedUser(user)
			updateOptionsMenuPosition({
				x: window.innerWidth - rect.right,
				y: rect.top
			})
		}
	}



	return (
		<div className="tableContainer">
			<table className="itemTable">
				<thead>
					<tr>
						<th>User</th>
						<th>Email Address</th>
						<th>User Role</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{
						users.map((user: any) =>
							<tr key={user.userId}>
								<td>
									<div className="userProfile">
										<FontAwesomeIcon icon={faUser} className="userIcon"></FontAwesomeIcon>
										<p>{user.firstName}</p>
									</div>
								</td>
								<td>
									<p>{user.email}</p>
								</td>
								<td>
									<p>{user.role}</p>
								</td>
								<td>
									<p>{user.isActive ? 'active' : 'inactive'}</p>
								</td>
								<td>
									<div className="ellipsis" onClick={(event) => handleEllipsisClick(event, user)}>
										<FontAwesomeIcon className="ellipsisBtn" icon={faEllipsisH} />
									</div>
								</td>
							</tr>
						)
					}
				</tbody>
			</table>
		</div>
	)
}

export default UserTable
