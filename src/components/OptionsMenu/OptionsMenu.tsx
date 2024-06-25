import './OptionsMenu.scss'
import { useEffect } from 'react'
import { ReactNode } from 'react'
import { User } from '../../Pages/UsersAdminDash/UsersAdminDash'

interface Props{
    children: ReactNode,
    optionsMenuPosition: {x: number, y: number}
    updateOptionsMenuActive: (state: boolean)=>void,
    updateSelectedUser: (user: User | null)=>void
}

function OptionsMenu({ children,optionsMenuPosition,updateOptionsMenuActive,updateSelectedUser }: Props) {

    function handleClickingOutside(event: any){
		if(event.target.closest(".ellipsis")) return

        if(!event.target.closest("#optionsMenu")){
            updateOptionsMenuActive(false)
            updateSelectedUser(null)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown",handleClickingOutside)
		return ()=>{
			document.removeEventListener("mousedown",handleClickingOutside)
		}
	},[])


    return (
        <div id='optionsMenu' className="menuContainer" style={{top:`${optionsMenuPosition.y+35}px`,right:`${optionsMenuPosition.x}px`}}>
            <p>Actions</p>
            <ul>
                { children }
            </ul>
        </div>
    )
}

export default OptionsMenu