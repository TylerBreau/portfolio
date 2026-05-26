
import {useState} from "react";

import "@Styles/components/TabView.less";

import {
    ITabViewProps,
    ITabViewItem
} from "@Interfaces/components/ITabView";
import {DividerType} from "@Interfaces/components/IDivider";

import {SlideShow} from "@Views/components/SlideShow";
import {Divider} from "@Views/components/Divider";

export function TabView(props: ITabViewProps) {
    let [index, setIndex] = useState(props.items[0].index);

    return <div className='TabView'>
        <div className='TabViewHeader'>
            {props.items.map((item: ITabViewItem, arrayIndex: number) => {
                let className: string = 'headerItem';
                if (item.index === index) {
                    className += ' active';
                }
                let out = [
                    <span
                        key={"headerItem-" + item.index}
                        className={className}
                        onClick={() => setIndex(item.index)}
                    >
                        {item.title}
                    </span>
                ];
                if (props.items.length -1 !== arrayIndex) {
                    out.push(<Divider type={DividerType.LINE} />);
                }
                return out;
            })}
        </div>
        <SlideShow
            index={index}
            items={props.items}
        />
    </div>;
}