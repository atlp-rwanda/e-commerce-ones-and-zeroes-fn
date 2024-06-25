import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import OptionsMenu from '../../src/components/OptionsMenu/OptionsMenu'
import { User } from '../../src/Pages/Users/Users'

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
    password: "$2b$10$3Xr5kaeXE1fplOs8SnTv3uhpiV2EfCz3aPhnw5L.GfYhY38NNmVO2",
    passwordLastChanged: "2024-07-05T10:53:12.186Z",
    preferredCurrency: null,
    preferredLanguage: null,
    role: "admin",
    updatedAt: "2024-07-09T09:31:05.175Z",
    use2FA: false,
    userId: "8683d3fb-597a-45d5-8e21-ef7d288e985a",
}]

function mockUpdateOptionsMenuActive(state: boolean) {
    console.log(state)
}

function mockUpdateSelectedUser(user: User | null){
    console.log(user)
}

describe('OptionsMenu Component', () => {
    
    it('Renders OptionsMenu component', () => {

        render(
            <OptionsMenu
            optionsMenuPosition={{x:12,y:12}}
            updateOptionsMenuActive={mockUpdateOptionsMenuActive}
            updateSelectedUser={mockUpdateSelectedUser}
            >
                <li>Change User Role</li>
                <li>Disable User</li>
                <li>Delete User</li>
            </OptionsMenu>
        )

        const changeUserRole = screen.getByText('Change User Role')
        expect(changeUserRole).toBeInTheDocument()

    })
})

