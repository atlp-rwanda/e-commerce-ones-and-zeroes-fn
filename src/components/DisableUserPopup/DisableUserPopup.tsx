import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import './DisableUserPopup.scss'
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../Pages/UsersAdminDash/UsersAdminDash'
import axios from 'axios';
import { toast } from "react-toastify";

interface Props {
    page: number,
    selectedUser: User,
    refreshData: () => void,
    handlePopup: (state: boolean) => void,
    setSpinnerActive: (param: boolean | ((prev: boolean) => boolean)) => void,
}

function DisableUserPopup({ page, selectedUser, refreshData, handlePopup, setSpinnerActive }: Props) {
    const [reason, setReason] = useState<string>('')
    const token: string | null = localStorage.getItem('token')
    const navigate = useNavigate()

    async function handleDisableUser() {
        try {
            handlePopup(false)
            setSpinnerActive(prev => !prev)
            const response = await axios.put(`${process.env.BACKEND_URL}/api/users/disable/${selectedUser.userId}`, {
                reason: reason
            }, {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            })
            refreshData()
            toast.success(response.data.message,{autoClose:2000})
        } catch (err: any) {
            console.log(err)
            setSpinnerActive(false)
            toast.error(err.message,{autoClose:2000});
            if (err.response && err.response.status === 401){
                navigate('/login')
            }
            handlePopup(false)
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setReason(event.target.value)
    }

    function handleClickingOutside(event: any) {
        if (!event.target.closest("#disableUser")) handlePopup(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickingOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickingOutside)
        }
    }, [])

    return (
        <div className="fullContainer">
            <div id="disableUser" className="popupContainer">
                <div className="topBar">
                    <h3>{selectedUser.isActive ? 'Disable User' : 'Restore User'}</h3>
                    <FontAwesomeIcon className="closeBtn" icon={faClose} onClick={() => handlePopup(false)}></FontAwesomeIcon>
                </div>
                {
                    selectedUser.isActive ?
                        <div className="reasonContainer">
                            <label>Reason:</label>
                            <textarea placeholder="Reason for disabling user ..." onChange={handleChange}></textarea>
                        </div>
                        : <p>Are you sure you want to restore this account?</p>
                }
                <button onClick={handleDisableUser}>Confirm</button>
            </div>
        </div>
    )
}

export default DisableUserPopup
