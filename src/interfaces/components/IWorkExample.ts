import React from 'react';

export interface IWorkExampleProps {
    title: string;
    children: React.ReactNode;
    url: string;
}

export type IWorkExample = React.Component<IWorkExampleProps>;
