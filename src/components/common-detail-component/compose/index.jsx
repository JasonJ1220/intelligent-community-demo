import React, { useEffect, useRef } from 'react';
import GlobalMessage from '../../../common/global-message';
import { Carousel } from 'oss-ui';
import './index.less';

export default function Compose({ children, triggerChangeEventName, ...otherCarouselProps }) {
    const carouselRef = useRef(null);

    useEffect(() => {
        //组件初始化时设置监听的事件
        GlobalMessage.on('message', triggerChangeEventName, ({ type, data }) => {
            // 注册监听的事件类型
            if (type === 'switch' && carouselRef.current) {
                carouselRef.current.innerSlider.slickGoTo(data);
            }
        });
    }, [triggerChangeEventName]);

    return (
        <div className="compose-component-wrapper">
            <Carousel ref={carouselRef} {...otherCarouselProps}>
                {children}
            </Carousel>
        </div>
    );
}
