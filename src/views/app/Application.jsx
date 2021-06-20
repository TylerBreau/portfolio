
import React from 'react';
import '@Styles/app/Application';
import {ApplicationLogic} from '@Logic/app/ApplicationLogic';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import {HomeScreen} from '@Views/screens/HomeScreen';

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.$logic = new ApplicationLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                </Routes>
            </BrowserRouter>
        </div>;
    }
}
