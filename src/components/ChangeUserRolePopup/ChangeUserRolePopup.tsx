import "./ChangeUserRolePopup.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from "../../Pages/UsersAdminDash/UsersAdminDash";
import axios from "axios";
import { toast } from 'react-toastify';

interface Props {
    page: number,
    selectedUser: User,
    refreshData: () => void,
    handlePopup: (state: boolean) => void,
    setSpinnerActive: (param: boolean | ((prev: boolean) => boolean)) => void,
}

function ChangeUserRolePopup({ page, selectedUser,refreshData, handlePopup, setSpinnerActive }: Props) {

    const [selectedRole, setSelectedRole] = useState<string>(selectedUser.role)

    const token: string | null = localStorage.getItem('token')

    const navigate = useNavigate()


    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedRole(event.target.value)
    }

    async function handleConfirm() {
        try {
            setSpinnerActive(prev => !prev)
            const response = await axios.put(`${process.env.BACKEND_URL}/api/users/setUserRole/${selectedUser.userId}`, {
                role: selectedRole
            }, {
                headers: {
                    'authorization': `Bearer ${token}`,
                }
            })
            refreshData()
            toast.success("User Role Changed",{autoClose:2000})
            handlePopup(false)
        } catch (err: any) {
            console.log(err)
            toast.error(err.message,{autoClose:2000})
            setSpinnerActive(false)
            if (err.response && err.response.status === 401){
                navigate('/login')
            }
            handlePopup(false)
        }

    }

    function handleClickingOutside(event: any) {
        if (!event.target.closest("#changeUserRole")) handlePopup(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickingOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickingOutside)
        }
    }, [])

    return (
        <div className="fullContainer">
            <div id="changeUserRole" className="popupContainer">
                <div className="topBar">
                    <h3>Change User Role</h3>
                    <FontAwesomeIcon className="closeBtn" icon={faClose} onClick={() => handlePopup(false)}></FontAwesomeIcon>
                </div>

                <div className="roleContainer">
                    <p>Role:</p>
                    <select value={selectedRole} onChange={handleChange}>
                        <option value={'buyer'}>Buyer</option>
                        <option value={'seller'}>Seller</option>
                        <option value={'admin'}>Admin</option>
                    </select>
                </div>

                <button onClick={handleConfirm} >Confirm</button>
            </div>
        </div>
    )
}

export default ChangeUserRolePopup
