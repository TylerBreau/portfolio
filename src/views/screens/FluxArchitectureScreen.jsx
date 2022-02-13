
import React from 'react';
import '@Styles/screens/FluxArchitecture';
import {FluxArchitectureLogic} from '@Logic/screens/FluxArchitectureLogic';

export class FluxArchitectureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.$logic = new FluxArchitectureLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
        </div>;
    }
}
