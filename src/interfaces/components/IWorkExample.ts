import React from 'react';
import {IComponent} from '@Interfaces/IComponent';

export interface IWorkExampleProps extends IComponent {
    title: string;
    children: React.ReactNode;
    url: string;
}

export type IWorkExample = React.Component<IWorkExampleProps>;
