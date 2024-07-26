import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { User } from '../../src/Pages/UsersAdminDash/UsersAdminDash'
import DisableUserPopup from '../../src/components/DisableUserPopup/DisableUserPopup'

const users: User[] = [{
    billingAddress: null,
    birthdate: null,
    createdAt: "2024-07-05T10:53:12.186Z",
    email: "shema@gmail.com",
    firstName: "shema",
    gender: null,
    isActive: true,
    isGoogle: false,
    isVerified: true,
    lastName: "shema",
    password: "password",
    passwordLastChanged: "2024-07-05T10:53:12.186Z",
    preferredCurrency: null,
    preferredLanguage: null,
    role: "admin",
    updatedAt: "2024-07-09T09:31:05.175Z",
    use2FA: false,
    userId: "8683d3fb-597a-45d5-8e21-ef7d288e985a",
}]

describe('DisableUserPopup Component', () => {
    
    it('Renders DisableUserPopup component', () => {

        render(
            <DisableUserPopup
            page={0}
            selectedUser={users[0]}
            updateUsers={(users: User[])=>users}
            handlePopup={(state: boolean)=>state}
	    serSpinnerActive={(param: boolean | (prev: boolean)=>boolean)=>void}
            >
            </DisableUserPopup>
        )

        const disableUserRole = screen.getByText('Disable User')
        expect(disableUserRole).toBeInTheDocument()

    })
})

