
import '@Styles/components/SlideShow.less';

import {ISlideShowProps} from '@Interfaces/components/ISlideShow';

export function SlideShow(props: ISlideShowProps) {
    return <div className='SlideShow'>
        {props.items.map((item, i) => {
            return <div
                key={i}
                className='slideshow-item'
                style={{left: props.index * -100 + '%'}}
            >
                {item.render()}
            </div>;
        })}
    </div>;
}
