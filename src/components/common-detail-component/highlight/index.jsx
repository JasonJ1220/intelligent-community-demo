import React from 'react';
// import React, { useState, useEffect, useCallback } from 'react';
import GlobalMessage from '@Common/global-message';
import './index.less';
import TweenOne from 'rc-tween-one';
import { _ } from 'oss-web-toolkits';

class HighLight extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            anim: {},
        };
    }

    componentDidMount() {
        const { supportEvents, itemKey } = this.props;

        for (let eventItem of supportEvents) {
            GlobalMessage.on('message', eventItem.eventName, ({ type, data }) => {
                const curAniDirectionParam = data.status === 1 ? eventItem.param.forward : eventItem.param.backward;
                const anim = Object.assign({}, _.omit(curAniDirectionParam, 'mask'), _.omit(data, 'status'));

                this.setState({
                    anim,
                });
                if (curAniDirectionParam.mask) {
                    GlobalMessage.postMessage('MASKLAYER-SHOW-HIDE', 'switch', curAniDirectionParam.mask);
                }
                GlobalMessage.postMessage('CURRENT-HIGHLIGHT-KEY', 'switch', itemKey);
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // const hightlighEventKey = Object.keys(this.props).find((item) => item.startsWith('$$HIGHLIGHT_EVENT'));
        // if (prevProps[hightlighEventKey] !== this.props[hightlighEventKey]) {
        //     const closeAnim = [...this.props[hightlighEventKey].values()].find((item) => !item.status) || {};
        //     const openAnim = [...this.props[hightlighEventKey].values()].find((item) => !!item.status) || {};
        //     console.log(openAnim);
        //     this.setState(
        //         {
        //             anim: Object.assign({}, closeAnim.animProps, { reverse: true }),
        //         },
        //         () => {
        //             this.setState({
        //                 anim: Object.assign({}, openAnim.animProps),
        //             });
        //         }
        //     );
        // }
        // const { children, ...otherProps } = props;
        // const hightlighEventKey = Object.keys(otherProps).find((item) => item.startsWith('$$HIGHLIGHT_EVENT'));
        // // console.log(props);
        // console.log(otherProps);
        // // console.log(hightlighEventKey);
        // // console.log(otherProps && hightlighEventKey && otherProps[hightlighEventKey].values());
        // const mergedStyleObj = {};
        // if (otherProps && hightlighEventKey) {
        //     [...otherProps[hightlighEventKey].values()].forEach((item) => {
        //         if (item.status === 1) {
        //             Object.assign(mergedStyleObj, item.styleProps);
        //         }
        //     });
        // }
    }

    render() {
        const { children } = this.props;
        const { anim } = this.state;

        return (
            <TweenOne className="high-light-zone-wrapper" {...anim}>
                {children}
            </TweenOne>
        );
    }
}

export default HighLight;
