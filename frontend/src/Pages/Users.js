import { useLoaderData, json, useNavigation} from 'react-router-dom'

import UsersList from '../components/UsersList';

function UsersPage() {


    const data= useLoaderData();

    return (
        <>
            <UsersList users={data} />
        </>
    );
}

export default UsersPage;

export async function loader(){
    const response= await fetch('http://localhost:8080/users')
    if(!response.ok){
        throw json(
            {message: 'Could not fetch users'},
            {status: 500}
        )
    } else {
        return response; 
    }
}