import {Outlet, useNavigate} from 'react-router-dom';
import {Suspense} from "react";
import './common.css'

const MainLayout = ({tabList, setUrl})=> {

    const navigate = useNavigate();
    const getTab = (path)=> {
        navigate (`/${path}`);
        setUrl(`/${path}`)
    };

    return (
        <div className={'mainLayout'}>
            <header>
                {tabList.map(item=> <div className={'button'} key={item.id} onClick={()=>getTab(item.id)}>{item.id}</div>)}
            </header>
            <Suspense fallback={<div>Loading...</div>}>
                <main>
                    <Outlet/>
                </main>
            </Suspense>
        </div>
    );
}

export default MainLayout;
