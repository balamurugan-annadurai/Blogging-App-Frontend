import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <main className='px-0 md:px-[100px]'>
                <Outlet />
            </main>
        </>
    );
};

export default AppLayout;
