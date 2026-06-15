
import React from 'react';

export interface ISlideShowItem {
    render: () => React.ReactNode;
}

export interface ISlideShowProps {
    items: Array<ISlideShowItem>;
    index: number;
    /**
     * Limits parent height to active child height. Prevents white space due to taller child siblings.
     * Defaults to true. 
     */
    shouldLimitHeight?: boolean;
}
