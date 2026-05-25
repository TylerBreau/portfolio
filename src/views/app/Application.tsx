
import {
    HashRouter,
    Routes,
    Route
} from 'react-router-dom';

import '@Styles/app/Application.less';

import {ScreenURL} from '@Interfaces/ScreenURL';

import {HomeScreen} from '@Views/screens/HomeScreen';

export function Application() {
    return <div className='Application'>
        <HashRouter>
            <Routes>
                <Route path='' element={<HomeScreen />} />
                <Route path={ScreenURL.HOME} element={<HomeScreen />} />
            </Routes>
        </HashRouter>
    </div>;
}
