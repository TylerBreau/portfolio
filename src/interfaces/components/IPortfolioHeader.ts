
import {IHeaderItem} from '@Interfaces/components/IHeader';

export enum PortfolioHeaderIndex {
    ABOUT_ME = 0,
    WORK_EXPERIENCE = 1,
    TECHNICAL_ARTICLE_TILES = 2,
    TECHNICAL_ARTICLE = 3
}

export type TOnIndexChange = (index: PortfolioHeaderIndex) => void;

export interface IPortfolioHeaderProps {
    index: PortfolioHeaderIndex;
    onIndexChange: TOnIndexChange;
    subscreen?: IHeaderItem | null;
}
