// import { useParams } from "react-router-dom";
import { json, redirect, useRouteLoaderData} from "react-router-dom";
import UserItem from "../components/UserItem";


const EventDetailPage=()=>{
    // const params= useParams();
    const data= useRouteLoaderData('user-detail');

    // return(
    //     <>
    //         <h1>Event Detail page</h1>
    //         <p>{params}</p>
    //     </>
    // )
    return(
        <UserItem user={data}/>
    )
}
export default EventDetailPage;

export async function loader({request, params}){  // defining loader() for specific event with some /:eventId as params
    console.log(request.url);
    const id= params.userId;
    
    const response= await fetch('http://localhost:8080/users/'+id);
    if(!response.ok){
        throw json({message: 'Could not fetch the details for selected event'}, {status: 500});
    } else{
        return response;
    }
}


export async function action({request, params}){ // defining action() for specific event with some /:userId as params
    const userId= params.userId;
    const response= await fetch('http://localhost:8080/users/'+ userId, {
        method: request.method
    })

    if(!response.ok){
        throw json({message: 'Could not delete event'}, {status: 500});
    } 
    return redirect('/users');
}