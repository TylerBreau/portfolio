
import '@Styles/app/Application.less';
import {ScreenURL} from '@Interfaces/ScreenURL';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router-dom';
import {HomeScreen} from '@Views/screens/HomeScreen';
import {FluxArchitectureScreen} from '@Views/screens/FluxArchitectureScreen';

export function Application() {
    return <div className='Application'>
        <HashRouter>
            <Routes>
                <Route path='' element={<HomeScreen />} />
                <Route path={ScreenURL.HOME} element={<HomeScreen />} />
                <Route path={ScreenURL.FLUX_ARCHITECTURE} element={<FluxArchitectureScreen />} />
            </Routes>
        </HashRouter>
    </div>;
}
