import { useState, useEffect } from 'react'
import NavBar from '../../components/Navbar/Navbar'
import SideBar from '../../components/Sidebar/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './AdminDashboard.scss'
import axios from 'axios'
import { User } from '../UsersAdminDash/UsersAdminDash'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Pagination from '../../components/Pagination/Pagination'
import { useNavigate, useParams } from 'react-router'
import Spinner from '../../components/Spinner/Spinner'
import { IconContext } from 'react-icons'
import { BsCart2 } from 'react-icons/bs'
import { FaUser, FaShoppingBag } from 'react-icons/fa'
import { IoIosHome } from 'react-icons/io'
import { RiDashboardHorizontalFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'


function AdminDashboard() {

    const navigate = useNavigate()
    const [userCount, setUserCount] = useState<number>(0)
    const [productCount, setProductCount] = useState<number>(0)
    const [orderCount, setOrderCount] = useState<number>(0)

    const [users, setUsers] = useState<User[]>([])
    const [orders, setOrders] = useState<any>([])

    const [userPage, setUserPage] = useState<number>(1)
    const [userPageCount, setUserPageCount] = useState<number>(0)

    const [orderPage, setOrderPage] = useState<number>(1)
    const [orderPageCount, setOrderPageCount] = useState<number>(0)

    const [sideBarActive, setSideBarActive] = useState<boolean>(false)
    const [spinnerActive, setSpinnerActive] = useState<boolean>(true)
    const token: string | null = localStorage.getItem('token')

    const { id } = useParams<{ id?: string | undefined }>();

    useEffect(() => {
        async function getUsers() {
            const response = await axios.get(`${process.env.BACKEND_URL}/api/users?page=${userPage}&rowsPerPage=5`,
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            )
            setUserCount(response.data.data.pagination.totalUsers)
            setUserPageCount(response.data.data.pagination.pageCount)
            setUsers(response.data.data.users)
        }

        async function getProducts() {
            const response = await axios.get(`${process.env.BACKEND_URL}/api/products`,
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            )
            setProductCount(response.data.length)
        }

        async function getOrders() {
            const response = await axios.get(`${process.env.BACKEND_URL}/api/orders?page=${orderPage}&pageSize=5`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            setOrderCount(response.data.pagination.totalOrders)
            setOrderPageCount(response.data.pagination.totalPages)
            setOrders(response.data.orders)
        }

        Promise.all([getUsers(), getProducts(), getOrders()]).then(() => {
            setSpinnerActive(false)
        }).catch(error => {
            console.log(error)
            setSpinnerActive(false)
            if (error.response && error.response.status === 401) {
                navigate('/login')
            }
        })

    }, [userPage, orderPage])

    return (
        <div className='adminDashPageContainer'>
            <NavBar
                sideBarActive={sideBarActive}
                updateSideBarActive={(state: boolean) => setSideBarActive(state)}
            ></NavBar>
            <div className='adminDashContainer'>
                <SideBar className={sideBarActive ? 'menuSideBar' : ''}>
                    <li>
                        <Link to={`/adminDash/${id}`} className='active'>
                            <IconContext.Provider value={{ className: "side-bar-icons" }}>
                                <RiDashboardHorizontalFill />
                            </IconContext.Provider>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/adminDash/${id}/users`}>
                            <IconContext.Provider value={{ className: "side-bar-icons" }}>
                                <FaUser />
                            </IconContext.Provider>
                            <span>Users</span>
                        </Link>
                    </li>
                </SideBar>
                {spinnerActive ? <Spinner /> : ''}
                <div className="statsContainer">
                    <div className="stats">
                        <div className="stat">
                            <p className="figure">{userCount}</p>
                            <p className="tag">Users</p>
                        </div>
                        <div className="stat">
                            <p className="figure">{productCount}</p>
                            <p className="tag">Products</p>
                        </div>
                        <div className="stat">
                            <p className="figure">{orderCount}</p>
                            <p className="tag">Orders</p>
                        </div>
                    </div>
                    <div className="dataContainer">
                        <h4>Orders</h4>
                        {
                            orders.length !== 0 ?
                                <>
                                    <table className='itemTable'>
                                        <thead>
                                            <tr>
                                                <th>paymentIntentId</th>
                                                <th>status</th>
                                                <th>paid</th>
                                                <th>createdAt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map((order: any) =>
                                                    <tr key={order.orderId}>
                                                        <td>
                                                            <p>{order.paymentIntentId}</p>
                                                        </td>
                                                        <td>
                                                            <p>{order.status}</p>
                                                        </td>
                                                        <td>
                                                            <p>{order.paid ? 'paid' : 'Not Paid'}</p>
                                                        </td>
                                                        <td>
                                                            <p>{order.createdAt}</p>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination
                                        pageCount={orderPageCount}
                                        updatePage={(page: number) => {
                                            setSpinnerActive(true)
                                            setOrderPage(page + 1)
                                        }}>
                                    </Pagination>
                                </>
                                : <p>No Orders found</p>
                        }
                    </div>
                    <div className="dataContainer">
                        <h4>Users</h4>
                        {
                            users.length !== 0 ?
                                <>
                                    <table className='itemTable'>
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Email Address</th>
                                                <th>User Role</th>
                                                <th>Status</th>
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
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination
                                        pageCount={userPageCount}
                                        updatePage={(page: number) => {
                                            setSpinnerActive(true)
                                            setUserPage(page + 1)
                                        }}>
                                    </Pagination>
                                </>
                                : <p>No Users found</p>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard