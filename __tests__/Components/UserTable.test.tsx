import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import UserTable from '../../src/components/UserTable/UserTable'
import { User } from '../../src/Pages/Users/Users'
import { Position } from '../../src/Pages/Users/Users'

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

describe('UserTable Component', () => {
    
    it('Renders UserTable component', () => {
        render(<UserTable
            users={users}
            optionsMenuActive={false}
            selectedUser={users[0]}
            updateOptionsMenuActive={(state: boolean)=>state}
            updateSelectedUser={(user: User | null)=>user}
            updateOptionsMenuPosition={(position: Position)=> position}
        ></UserTable>)

        const name = screen.getByText("shema")
        const email = screen.getByText("shema@gmail.com")
        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()

    })
})

