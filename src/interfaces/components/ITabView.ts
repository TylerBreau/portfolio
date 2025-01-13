
import {ISlideShowItem} from "./ISlideShow";

export interface ITabViewItem extends ISlideShowItem {
    title: string;
    index: number;
}

export interface ITabViewProps {
    items: Array<ITabViewItem>;
}
