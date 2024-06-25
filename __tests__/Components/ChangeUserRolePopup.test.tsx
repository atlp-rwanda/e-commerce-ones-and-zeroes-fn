import '@testing-library/jest-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { render, screen } from '@testing-library/react'
import ChangeUserRolePopup from '../src/components/ChangeUserRolePopup/ChangeUserRolePopup'
import { User } from '../src/Pages/UsersAdminDash/UsersAdminDash'
import axios from 'axios'

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

const mockResponse={
    data:{
        message: 'user role updated'
    },
    status: 200
}

const mockUserResponse = {
    data:{
        data: users
    }
}

const mockStore = configureMockStore()
const initialStore = { token: 'secret' }
const store = mockStore(initialStore)

jest.mock('axios')

describe('ChangeUserRolePopup Component', () => {

    it('Renders ChangeUserRolePopup component', () => {
        axios.put = jest.fn().mockReturnValue(mockResponse)
        axios.get = jest.fn().mockReturnValue(mockUserResponse)

        render(
            <Provider store={store}>
                <ChangeUserRolePopup
                    userOffset={0}
                    selectedUser={users[0]}
                    updateUsers={(users: User[]) => users}
                    handlePopup={(state: boolean) => state}
                    setSpinnerActive={(param: boolean |((prev: boolean)=> boolean))=>param}
                >
                </ChangeUserRolePopup>
            </Provider>
        )

        const changeUserRole = screen.getByText('Change User Role')
        expect(changeUserRole).toBeInTheDocument()

    })
})

