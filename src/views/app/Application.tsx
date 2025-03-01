
import React from 'react';
import '@Styles/app/Application';
import {ApplicationLogic} from '@Logic/app/ApplicationLogic';
import {ScreenURL} from '@Logic/utility/ScreenURL';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router-dom';

import {HomeScreen} from '@Views/screens/HomeScreen';
import {FluxArchitectureScreen} from '@Views/screens/FluxArchitectureScreen';

export class Application extends React.Component {
    private $logic: ApplicationLogic;

    constructor(props: {}) {
        super(props);
        this.$logic = new ApplicationLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            <HashRouter>
                <Routes>
                    <Route path='' element={<HomeScreen />} />
                    <Route path={ScreenURL.HOME} element={<HomeScreen />} />
                    <Route path={ScreenURL.FLUX_ARCHITECTURE} element={<FluxArchitectureScreen />} />
                </Routes>
            </HashRouter>
        </div>;
    }
}
