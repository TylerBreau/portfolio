
import React from 'react';
import {IComponent} from '@Interfaces/IComponent';

export interface ISlideShowItem {
    render: () => React.ReactNode;
}

export interface ISlideShowProps extends IComponent {
    items: Array<ISlideShowItem>;
    index: number;
}

export type ISlideShow = React.Component<ISlideShowProps>;
