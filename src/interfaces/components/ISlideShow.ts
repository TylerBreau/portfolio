
import React from 'react';
import {IComponentProps} from '@Interfaces/IComponentProps';

export interface ISlideShowItem {
    render: () => React.ReactNode;
}

export interface ISlideShowProps extends IComponentProps {
    items: Array<ISlideShowItem>;
    index: number;
}

export type ISlideShow = React.Component<ISlideShowProps>;
