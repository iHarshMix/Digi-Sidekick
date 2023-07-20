import { useRouteError } from "react-router-dom";

import MainNavigation from '../components/MainNavigation'
import PageContent from "../components/PageContent";

const ErrorPage=()=>{
    const error= useRouteError(); // shape of the error object depends on the thrown response [or] any other kind of oject/data.

    let title= "An error Occured";
    let message= "Something went wrong";

    if(error.status=== 500){
        // message= JSON.parse(error.data).message;
        
        message= error.data.message;  // with throw json() utility function of react-router-dom
    }
    if(error.status===404){
        title="Not Found";
        message= "Could not find resource or page";
    }
    return (
        <>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}
export default ErrorPage;