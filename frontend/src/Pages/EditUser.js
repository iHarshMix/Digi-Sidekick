import {  useRouteLoaderData } from 'react-router-dom';
import UserForm from '../components/UserForm'

const EditUserPage=()=>{
    const data= useRouteLoaderData('user-detail');
    return(
        <UserForm user={data} method="patch"/>
    )
}
export default EditUserPage;

