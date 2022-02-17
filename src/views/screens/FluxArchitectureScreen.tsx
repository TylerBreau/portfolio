
import React from 'react';
import '@Styles/screens/FluxArchitecture';
import {FluxArchitectureScreenLogic} from '@Logic/screens/FluxArchitectureScreenLogic';

export class FluxArchitectureScreen extends React.Component {
    private $logic: FluxArchitectureScreenLogic;

    constructor(props: never) {
        super(props);
        this.$logic = new FluxArchitectureScreenLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
        </div>;
    }
}
