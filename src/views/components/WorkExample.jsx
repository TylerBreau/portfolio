
import React from 'react';
import '@Styles/components/WorkExample';
import {WorkExampleLogic} from '@Logic/components/WorkExampleLogic';

export class WorkExample extends React.Component {
    constructor(props) {
        super(props);
        this.$logic = new WorkExampleLogic(this);
    }

    render() {
        return <div
            className={this.$logic.getClassName()}
            onClick={this.$logic.onClick}
        >
            <span className='title'>{this.$logic.getProps().title}</span>
            <div className='description'>{this.$logic.getProps().children}</div>
        </div>;
    }
}
