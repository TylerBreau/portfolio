
import React from 'react';
import {IComponentProps} from '@Interfaces/IComponentProps';

export interface IHeaderItem {
    text: string;
    /**
     * Can be used to tell Header to apply active styles to a header item.
     */
    isActive: boolean;
    /**
     * @param index The index of the items array item that was clicked.
    */
    onClick: Function;
}

export interface IHeaderProps extends IComponentProps {
    items: Array<IHeaderItem>;
}

export type IHeader = React.Component<IHeaderProps>;
