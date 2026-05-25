
import React from 'react';
import '@Styles/components/Header.less';
import {
    IHeaderProps,
    IHeaderItem
} from '@Interfaces/components/IHeader';
import {Divider} from '@Views/components/Divider';

export function Header(props: IHeaderProps) {
    function createItem(item: IHeaderItem, index: number): React.ReactNode {
        let className = 'header-item';

        if (item.isActive) {
            className += ' active';
        }

        return (
            <span
                className={className}
                key={index}
                onClick={item.onClick}
            >
                {item.text}
            </span>
        );
    }

    const headerItems: Array<React.ReactNode> = [];

    for (let i = 0, items = props.items, length = items.length; i < length; ++i) {
        headerItems.push(createItem(items[i], i));

        if (i + 1 < length) {
            headerItems.push(<Divider key={i + 1 + '-divider'} />);
        }
    }

    return <div className='Header'>
        {headerItems}
    </div>;
}
