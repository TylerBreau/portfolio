
import {Header} from '@Views/components/Header';

import {IHeaderItem} from '@Interfaces/components/IHeader';
import {
    IPortfolioHeaderProps,
    PortfolioHeaderIndex
} from '@Interfaces/components/IPortfolioHeader';

export function PortfolioHeader(props: IPortfolioHeaderProps) {
    let items: IHeaderItem[] = [
        {
            text: 'About Me',
            isActive: props.index === PortfolioHeaderIndex.ABOUT_ME,
            onClick: () => {
                props.onIndexChange(PortfolioHeaderIndex.ABOUT_ME);
            }
        },
        {
            text: 'Work Experience',
            isActive: props.index === PortfolioHeaderIndex.WORK_EXPERIENCE,
            onClick: () => {
                props.onIndexChange(PortfolioHeaderIndex.WORK_EXPERIENCE);
            }
        },
        {
            text: 'Technical Articles',
            isActive: props.index === PortfolioHeaderIndex.TECHNICAL_ARTICLE_TILES,
            onClick: () => {
                props.onIndexChange(PortfolioHeaderIndex.TECHNICAL_ARTICLE_TILES);
            }
        }
    ];
    if (props.subscreen) {
        items.push(props.subscreen);
    }
    return <Header
        items={items}
    />;
}
