import React from 'react';
import {IComponentProps} from '@Interfaces/IComponentProps';

export interface IWorkExampleProps extends IComponentProps {
    title: string;
    children: React.ReactNode;
    url: string;
}

export type IWorkExample = React.Component<IWorkExampleProps>;
