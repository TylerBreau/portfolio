
import {useState} from "react";

import "@Styles/components/TabView.less";

import {
    ITabViewProps,
    ITabViewItem
} from "@Interfaces/components/ITabView";

import {SlideShow} from "./SlideShow";

export function TabView(props: ITabViewProps) {
    let [index, setIndex] = useState(props.items[0].index);

    return <div className='TabView'>
        <div className='TabViewHeader'>
            {props.items.map((item: ITabViewItem) => {
                let className: string = 'headerItem';
                if (item.index === index) {
                    className += ' active';
                }
                return <span
                    key={"headerItem-" + item.index}
                    className={className}
                    onClick={() => setIndex(item.index)}
                >
                    {item.title}
                </span>;
            })}
        </div>
        <SlideShow
            index={index}
            items={props.items}
        />
    </div>;
}