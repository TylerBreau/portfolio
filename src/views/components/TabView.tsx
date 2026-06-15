
import {RefObject, useState, useRef, useCallback} from "react";

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
    let refMap: Record<number, RefObject<HTMLSpanElement | null>> = {};
    for (let i = 0, length = props.items.length; i < length; ++i) {
        refMap[props.items[i].index] = useRef<HTMLSpanElement | null>(null);
    }

    let adjustScroll = useCallback((newIndex: number) => {
        if (!refMap[newIndex].current) return;
        if (!refMap[newIndex].current.parentElement) return;
        let parent: HTMLElement = refMap[newIndex].current.parentElement;

        let activeIndexBox: DOMRect = refMap[newIndex].current.getBoundingClientRect();
        let parentBox: DOMRect = parent.getBoundingClientRect();
        
        if (activeIndexBox.left < parentBox.left) {
            let diff: number = Math.ceil(Math.abs(activeIndexBox.left) + parentBox.left);
            parent.scrollTo({
                left: parent.scrollLeft - diff,
                behavior: 'smooth'
            });
        }
        else if (activeIndexBox.right > parentBox.right) {
            let diff: number = Math.ceil(activeIndexBox.right - parentBox.right);
            parent.scrollTo({
                left: parent.scrollLeft + diff,
                behavior: 'smooth'
            });
        }
    }, [refMap]);

    return <div className='TabView'>
        <div className='TabViewHeader'>
            <span
                className='chevron left'
                onClick={() => {
                    if (index !== 0) {
                        setIndex(index - 1);
                        adjustScroll(index - 1);
                    }
                }}
            >
                {'<'}
            </span>
            <div className='content'>
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
                            ref={refMap[item.index]}
                        >
                            {item.title}
                        </span>
                    ];
                    if (props.items.length -1 !== arrayIndex) {
                        out.push(<Divider key={'divider-' + arrayIndex} type={DividerType.LINE} />);
                    }
                    return out;
                })}
            </div>
            <span
                className='chevron right'
                onClick={() => {
                    if (index !== props.items.length - 1) {
                        setIndex(index + 1);
                        adjustScroll(index + 1);
                    }
                }}
            >
                {'>'}
            </span>
        </div>
        <SlideShow
            index={index}
            items={props.items}
        />
    </div>;
}