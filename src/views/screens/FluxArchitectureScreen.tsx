
import React from 'react';
import '@Styles/screens/FluxArchitecture';
import {FluxArchitectureScreenLogic} from '@Logic/screens/FluxArchitectureScreenLogic';
import {Footer} from '@Views/components/Footer';
import {Header} from '@Views/components/Header';

export class FluxArchitectureScreen extends React.Component<{}, {}> {
    private $logic: FluxArchitectureScreenLogic;

    constructor(props: {}) {
        super(props);
        this.$logic = new FluxArchitectureScreenLogic(this);
    }

    render() {
        return <div className={this.$logic.getClassName()}>
            <Header items={[]} />
            <div className='body'>
            </div>
            <Footer />
        </div>;
    }
}
