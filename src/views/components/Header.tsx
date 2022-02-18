
import React from 'react';
import '@Styles/components/Header';
import {
    IHeader,
    IHeaderProps,
    IHeaderItem
} from '@Interfaces/components/IHeader';
import {HeaderLogic} from '@Logic/components/HeaderLogic';
import {Divider} from '@Views/components/Divider';

export class Header extends React.Component<IHeaderProps> implements IHeader {
    private $logic: HeaderLogic;

    constructor(props: IHeaderProps) {
        super(props);

        this.$logic = new HeaderLogic(this);
    }

    _createItem(item: IHeaderItem, index: number): React.ReactNode {
        let className = 'header-item';
        if (item.isActive) {
            className += ' active';
        }
        return <span
            className={className}
            key={index}
            onClick={() => {
                this.$logic.onHeaderItemClick(item);
            }}
        >
            {item.text}
        </span>;
    }

    render() {
        const headerItems: Array<React.ReactNode> = [];
        for (let i = 0, items = this.props.items, length = items.length; i < length; ++i) {
            headerItems.push(this._createItem(items[i], i));
            if (i + 1 < length) {
                headerItems.push(<Divider key={i + 1 + '-divider'} />);
            }
        }
        return <div className='Header'>
            {headerItems}
        </div>;
    }
}
