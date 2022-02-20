
import React from 'react';
import {ComponentLogic} from '@Logic/ComponentLogic';
import {
    IHeaderProps,
    IHeaderItem
} from '@Interfaces/components/IHeader';

export class HeaderLogic extends ComponentLogic<IHeaderProps, never> {
    constructor(node: React.Component) {
        super(node);
        this._addClassName('Header');

        this.onHeaderItemClick = this.onHeaderItemClick.bind(this);
    }

    public onHeaderItemClick(item: IHeaderItem): void {
        item.onClick();
    }
}
