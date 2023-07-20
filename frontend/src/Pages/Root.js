import { Outlet, useNavigation } from "react-router-dom";

import classes from './Root.module.css'
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    const navigation = useNavigation();

    const isLoading= navigation.state==='loading';
    return (
        <>
            <MainNavigation />
            <main>
                {isLoading && <p className={classes.para}>Loading...</p>}

                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;