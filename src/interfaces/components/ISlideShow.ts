
import React from 'react';

export interface ISlideShowItem {
    render: () => React.ReactNode;
}

export interface ISlideShowProps {
    items: Array<ISlideShowItem>;
    index: number;
}
