
import React from 'react';

export interface ISlideShowItem {
    title: string;
    render: () => React.ReactNode;
}

export interface ISlideShowTitleItem {
    title: string;
    index: number;
}

export interface ISlideShowProps {
    items: Array<ISlideShowItem>;
}

export interface ISlideShowState {
    index: number;
}

export type ISlideShow = React.Component<ISlideShowProps, ISlideShowState>;
