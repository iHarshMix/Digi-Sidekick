import { Outlet } from 'react-router-dom'
import UsersNavigation from '../components/UsersNavigation.js'

const UsersRootLayout=()=>{
    return(
        <>
            <UsersNavigation/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default UsersRootLayout;