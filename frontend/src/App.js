import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './Pages/Root';
import ErrorPage from './Pages/Error';
import HomePage from './Pages/Home';
import UsersRootLayout from './Pages/UsersRoot'
import UsersPage, { loader as userLoader } from './Pages/Users';

import NewUserPage from './Pages/NewUser';
import { action as manipulateUserAction } from './components/UserForm'

import EditUserPage from './Pages/EditUser';
import UserDetailPage , {
    loader as userDetailLoader,
    action as deleteUserAction
} from './Pages/UserDetail';


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'users',
                element: <UsersRootLayout />,
                children: [
                    {
                        path: '',
                        element: <UsersPage />,
                        loader: userLoader
                    },
                    {
                        path: ':userId',
                        id: 'user-detail',
                        loader: userDetailLoader,
                        children: [
                            {
                                index: true,
                                element: <UserDetailPage />,
                                action: deleteUserAction
                            },
                            {
                                path: 'edit',
                                element: <EditUserPage />,
                                action: manipulateUserAction
                            },
                        ]
                    },
                    {
                        path: 'new',
                        element: <NewUserPage />,
                        action: manipulateUserAction
                    },
                ]
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
