
import React from 'react';
import {
    Link
} from 'react-router-dom';

import '@Styles/components/WorkExample';
import {WorkExampleLogic} from '@Logic/components/WorkExampleLogic';
import {
    IWorkExample,
    IWorkExampleProps
} from '@Interfaces/components/IWorkExample';

export class WorkExample extends React.Component<IWorkExampleProps> implements IWorkExample {
    private $logic: WorkExampleLogic;

    constructor(props: IWorkExampleProps) {
        super(props);
        this.$logic = new WorkExampleLogic(this);
    }

    render() {
        return <Link to={this.props.url}>
            <div
                className={this.$logic.getClassName()}
            >
                <span className='title'>{this.props.title}</span>
                <div className='description'>{this.props.children}</div>
            </div>
        </Link>;
    }
}
