import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './UsersAdminDash.scss'
import UserTable from '../../components/UserTable/UserTable'
import OptionsMenu from '../../components/OptionsMenu/OptionsMenu'
import DisableUserPopup from '../../components/DisableUserPopup/DisableUserPopup'
import ChangeUserRolePopup from '../../components/ChangeUserRolePopup/ChangeUserRolePopup'
import Spinner from '../../components/Spinner/Spinner';
import { ToastContainer } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Pagination from '../../components/Pagination/Pagination';
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { RiDashboardHorizontalFill } from 'react-icons/ri';

export interface User {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isGoogle: false,
    gender: string | null,
    birthdate: string | null,
    preferredLanguage: string | null,
    preferredCurrency: string | null,
    billingAddress: string | null,
    isVerified: boolean,
    isActive: boolean,
    role: string,
    passwordLastChanged: string,
    createdAt: string,
    use2FA: boolean,
    updatedAt: string
}

export interface Position {
    x: number,
    y: number
}

function UsersAdminDash() {

    const navigate = useNavigate()
    const [spinnerActive, setSpinnerActive] = useState<boolean>(true)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [optionsMenuActive, setOptionsMenuActive] = useState<boolean>(false)
    const [optionsMenuPosition, setOptionsMenuPosition] = useState<Position>({ x: 0, y: 0 })
    const [changeUserRolePopupActive, setChangeUserRolePopupActive] = useState<boolean>(false)
    const [disableUserPopupActive, setdisableUserPopupActive] = useState<boolean>(false)

    //pagination
    const [page, setPage] = useState<number>(0)
    const [pageCount, setPageCount] = useState<number>(0)

    const [sideBarActive, setSideBarActive] = useState<boolean>(false)

    const token: string | null = localStorage.getItem('token')

    const { id } = useParams<{ id?: string | undefined }>()

    if (!id || id === "undefined") {
        navigate('/login')
    }

    function updateOptionsMenuActive(state: boolean) {
        setOptionsMenuActive(state)
    }

    function updateSelectedUser(user: User | null) {
        setSelectedUser(user)
    }

    function updateOptionsMenuPosition(position: Position) {
        setOptionsMenuPosition(position)
    }

    async function fetchData() {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/users?page=${page}&rowsPerPage=5`,
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
        setUsers(response.data.data.users)
        setPageCount(response.data.data.pagination.pageCount)
    }

    async function refreshData(){
        fetchData()
        .then(() => {
            setSpinnerActive(false)
        })
        .catch(err => {
            console.log(err)
            setSpinnerActive(false)
            if (err.response && err.response.status === 401) {
                navigate('/login')
            }
        })
    }

    useEffect(() => {

        fetchData()
            .then(() => {
                setSpinnerActive(false)
            })
            .catch(err => {
                console.log(err)
                setSpinnerActive(false)
                if (err.response && err.response.status === 401) {
                    navigate('/login')
                }
            })
    }, [page])

    return (
        <div className='userAdminPageContainer'>
            <Navbar
                sideBarActive={sideBarActive}
                updateSideBarActive={(state: boolean) => setSideBarActive(state)}
            ></Navbar>
            <div className="userAdminDashContainer">
                <Sidebar className={sideBarActive ? 'menuSideBar' : ''}>
                    <li>
                        <Link to={`/adminDash/${id}`}>
                            <IconContext.Provider value={{ className: "side-bar-icons" }}>
                                <RiDashboardHorizontalFill />
                            </IconContext.Provider>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/adminDash/${id}/users`} className='active' >
                            <IconContext.Provider value={{ className: "side-bar-icons" }}>
                                <FaUser />
                            </IconContext.Provider>
                            <span>Users</span>
                        </Link>
                    </li>
                </Sidebar>
                <div className="usersTableContainer">
                    {
                        spinnerActive ? <Spinner></Spinner> : ''
                    }
                    <UserTable
                        users={users}
                        optionsMenuActive={optionsMenuActive}
                        selectedUser={selectedUser}
                        updateOptionsMenuActive={updateOptionsMenuActive}
                        updateSelectedUser={updateSelectedUser}
                        updateOptionsMenuPosition={updateOptionsMenuPosition}
                    />
                    <Pagination
                        pageCount={pageCount}
                        updatePage={(page: number) => {
                            setSpinnerActive(true)
                            setPage(page + 1)
                        }}
                    >
                    </Pagination>
                </div>
            </div>
            <ToastContainer containerId={'popupToast'} />
            {
                selectedUser && optionsMenuActive ?
                    <OptionsMenu
                        optionsMenuPosition={optionsMenuPosition}
                        updateOptionsMenuActive={updateOptionsMenuActive}
                        updateSelectedUser={updateSelectedUser}
                    >
                        <li onClick={() => {
                            setOptionsMenuActive(false)
                            setChangeUserRolePopupActive(true)
                        }}>Change User Role</li>
                        <li onClick={() => {
                            setOptionsMenuActive(false)
                            setdisableUserPopupActive(true)
                        }}>{selectedUser.isActive ? 'Disable User' : 'Restore User'}</li>
                    </OptionsMenu>
                    : ''
            }
            {
                selectedUser && changeUserRolePopupActive ?
                    <ChangeUserRolePopup
                        page={page}
                        selectedUser={selectedUser}
                        refreshData={refreshData}
                        handlePopup={(state: boolean) => setChangeUserRolePopupActive(state)}
                        setSpinnerActive={setSpinnerActive}
                    ></ChangeUserRolePopup> : ''
            }
            {
                selectedUser && disableUserPopupActive ?
                    <DisableUserPopup
                        page={page}
                        selectedUser={selectedUser}
                        refreshData={refreshData}
                        handlePopup={(state: boolean) => setdisableUserPopupActive(state)}
                        setSpinnerActive={setSpinnerActive}
                    ></DisableUserPopup> : ''
            }
        </div>
    )
}

export default UsersAdminDash
