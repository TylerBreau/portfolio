
import React from 'react';
import '@Styles/screens/HomeScreen';
import {HomeScreenLogic} from '@Logic/screens/HomeScreenLogic';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.$logic = new HomeScreenLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            hello world
        </div>;
    }
}
