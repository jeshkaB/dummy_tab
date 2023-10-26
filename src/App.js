import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {lazy, useEffect, useState} from "react";

import MainLayout from "./MainLayout";
import tabsArray from './tabs.json';

const App = () => {
    const navigate = useNavigate();
    const getFirstTab = (tabsArray) => {
        return tabsArray.find(item => item.order === 0)
    };
    const getTabByUrl = (tabsArray, url) => {
        return tabsArray.find(item => item.id === url.slice(1))
    };

    const firstTab = getFirstTab(tabsArray);
    const firstUrl = '/' + firstTab.id;

    const {pathname: currentUrl} = useLocation();
    const [url, setUrl] = useState(`${currentUrl}`);

    useEffect(() => {
        if (currentUrl === '/') {
            navigate(firstUrl)
            setUrl(firstUrl)
        }
    }, []);

    const currentComponent = getTabByUrl(tabsArray, url) || firstTab;

    const Component = lazy(() => import(`./${currentComponent.path}`));

    return (
        <div>
            <Routes>
                <Route path={''} element={<MainLayout tabList={tabsArray} setUrl={setUrl}/>}>
                    <Route path={url} element={<Component/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
