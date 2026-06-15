
import React, {RefObject, useLayoutEffect, useRef, useState} from "react";

import '@Styles/components/SlideShow.less';

import {ISlideShowProps} from '@Interfaces/components/ISlideShow';

export function SlideShow(props: ISlideShowProps) {
    let [maxHeight, setMaxHeight] = useState<string>('100%');
    let refMap: Record<number, RefObject<HTMLDivElement | null>> = {};
    for (let i = 0, length = props.items.length; i < length; ++i) {
        refMap[i] = useRef<HTMLDivElement | null>(null);
    }

    useLayoutEffect(() => {
        let activeSlide: HTMLDivElement | null = refMap[props.index].current;
        if (!activeSlide) return;

        if (activeSlide.clientHeight + 'px' !== maxHeight) {
            setMaxHeight(activeSlide.clientHeight + 'px');
        }
    }, [props.index, maxHeight, setMaxHeight]);

    let slideShowStyle: React.CSSProperties = {};
    if (props.shouldLimitHeight !== false) {
        slideShowStyle.maxHeight = maxHeight;
    }

    return <div
        className='SlideShow'
        style={slideShowStyle}
    >
        {props.items.map((item, i) => {
            let className = 'slideshow-item';
            if (props.index === i) {
                className += ' active';
            }
            return <div
                key={i}
                className={className}
                style={{left: props.index * -100 + '%'}}
                ref={refMap[i]}
            >
                {item.render()}
            </div>;
        })}
    </div>;
}
