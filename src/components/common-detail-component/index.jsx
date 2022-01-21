import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { PageContainer } from 'oss-ui';
import { _, logger } from 'oss-web-toolkits';
import BaseReactGridLayout from '../base-react-grid-layout';
import { containersMap } from '../layouts/maps';
import ComposeComponent from './compose';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import Highlight from './highlight';
import TweenOne from 'rc-tween-one';
import GlobalMessage from '@Common/global-message';
import { withResizeDetector } from 'react-resize-detector';
import useEnvironment from '../../models/useEnvironment';
// import { Button } from 'oss-ui';
import initSocket from '@Common/socket';
import { nanoid } from 'nanoid';
import ActionMap from './actionMap';
import './index.less';

// let curEvent = {
//     name: undefined,
//     status: 0,
//     animProps: {},
// };

function Index(props) {
    const {
        topGridLayoutElementId,
        className = '',
        layoutConfig,
        componentsMap,
        controlConfig,
        history,
        match,
        // width = 0,
        height = 0,
        style,
        otherProps,
        store,
        canBeControlled = false,
    } = props;

    const [children, setChildren] = useState(null);
    const [extraBlocks, setExtraBlocks] = useState(null);
    const [show, setShow] = useState(false);
    const [paused, setPaused] = useState(true);
    const [highlightKey, setHighlightKey] = useState(undefined);
    const [maskAnim, setMaskAnim] = useState({});

    const { environment } = useEnvironment();

    // const [curBtns, setCurBtns] = useState(
    //     Object.values(controlConfig)
    //         .map((item) => item.supportEvents)
    //         .flat(1)
    // );

    const genGridItem = useCallback(
        (gridItem, isFirstLevel) => {
            const doms = [];
            const Container = containersMap.get(gridItem.container.name).component;

            if (!gridItem.layoutInfo) {
                const CurComponent = componentsMap.get(gridItem.container.content[0]['componentName']).component;
                const HighlightWrapper = _.has(controlConfig, gridItem.key) ? Highlight : React.Fragment;

                let highlightProps = {};

                if (_.has(controlConfig, gridItem.key)) {
                    highlightProps = {
                        itemKey: gridItem.key,
                        supportEvents: controlConfig[gridItem.key] ? controlConfig[gridItem.key]['supportEvents'] : [],
                    };
                }

                doms.push(
                    <HighlightWrapper {...highlightProps} key={gridItem.key}>
                        <Container className="react-grid-item-content-container" {..._.omit(gridItem.container.config, ['contentConfig'])}>
                            <CurComponent history={history} match={match} {...otherProps} />
                        </Container>
                    </HighlightWrapper>,
                );
            } else {
                const children = [];

                gridItem.container.content.forEach((item) => {
                    children.push(genGridItem(item, false));
                });
                const HighlightWrapper = _.has(controlConfig, gridItem.key) ? Highlight : React.Fragment;
                let highlightProps = {};

                if (_.has(controlConfig, gridItem.key)) {
                    highlightProps = {
                        itemKey: gridItem.key,
                        supportEvents: controlConfig[gridItem.key] ? controlConfig[gridItem.key]['supportEvents'] : [],
                    };
                }
                doms.push(
                    <HighlightWrapper {...highlightProps}>
                        <Container className="react-grid-item-content-container" {..._.omit(gridItem.container.config, ['contentConfig'])}>
                            {gridItem.container.content.length > 1 && gridItem.container.config.contentConfig.composeType === 'compact' ? (
                                <ComposeComponent children={children} {...gridItem.container.config.contentConfig.carouselConfig} />
                            ) : (
                                <BaseReactGridLayout
                                    isDroppable={false}
                                    cols={gridItem.layoutInfo.cols}
                                    rowHeight={gridItem.layoutInfo.rowHeight}
                                    margin={gridItem.layoutInfo.margin}
                                    containerPadding={gridItem.layoutInfo.containerPadding}
                                    children={children}
                                />
                            )}
                        </Container>
                    </HighlightWrapper>,
                );
            }

            return (
                <div
                    key={`${gridItem.key}-${Math.random()}`}
                    style={{
                        zIndex: highlightKey === gridItem.key ? 1 : 'auto',
                    }}
                    data-grid={{
                        ...gridItem.dataGrid,
                        h: layoutConfig.layoutInfo.flexible
                            ? parseInt((gridItem.dataGrid.h / layoutConfig.layoutInfo.height) * height, 10)
                            : gridItem.dataGrid.h,
                        static: true,
                        isDraggable: false,
                        isResizable: false,
                        resizeHandles: [],
                    }}
                >
                    {gridItem.entry ? (
                        <TweenOne
                            {...gridItem.entry.process}
                            paused={paused}
                            style={{ width: '100%', height: '100%', position: 'absolute', ...gridItem.entry.overwrite }}
                        >
                            <div style={{ width: '100%', height: '100%' }}>{doms}</div>
                        </TweenOne>
                    ) : (
                        <div style={{ width: '100%', height: '100%' }}>{doms}</div>
                    )}
                </div>
            );
        },
        [componentsMap, paused, highlightKey, controlConfig, history, match, height, layoutConfig, otherProps],
    );

    useEffect(() => {
        GlobalMessage.on('message', 'CURRENT-HIGHLIGHT-KEY', ({ type, data }) => {
            setHighlightKey(data);
        });
        GlobalMessage.on('message', 'MASKLAYER-SHOW-HIDE', ({ type, data }) => {
            setMaskAnim(data);
        });
        // logger.default.debug(nanoid());
    }, []);

    useEffect(() => {
        if (layoutConfig) {
            setChildren(
                layoutConfig.container.content
                    .filter((item) => item.blockLayType !== 'free')
                    .map((itemDropView) => {
                        return genGridItem(itemDropView, true);
                    }),
            );

            // 绝对定位脱离栅格布局的组件
            setExtraBlocks(
                layoutConfig.container.content
                    .filter((item) => item.blockLayType === 'free')
                    .map((freeItem) => {
                        const Container = containersMap.get(freeItem.container.name).component;

                        const CurComponent = componentsMap.get(freeItem.container.content[0]['componentName']).component;
                        return (
                            <div
                                key={freeItem.key}
                                style={{
                                    position: 'absolute',
                                    left: freeItem.dataGrid.x,
                                    top: freeItem.dataGrid.y,
                                    width: freeItem.dataGrid.w,
                                    height: freeItem.dataGrid.h,
                                }}
                            >
                                <Container {..._.omit(freeItem.container.config, ['contentConfig'])}>
                                    <CurComponent history={history} match={match} {...otherProps} />
                                </Container>
                            </div>
                        );
                    }),
            );
            // TODO: react-grid-layout页面初始展现时，有一个从左上角到右下角的组件排布过渡，
            // TODO: 暂时用setTimeout隐藏该过程(好像并不能完全隐藏),并根据show标志位，执行布局块入场动画
            setTimeout(() => {
                setShow(true);
            }, 300);
        }
    }, [genGridItem, layoutConfig, componentsMap, history, match, otherProps]);

    useEffect(() => {
        let socketInstance = null;

        if (canBeControlled) {
            // 统一订阅一次全局页面跳转事件
            store.subscribe({ type: 'CURRENT_ROUTE_PATH' }, () => {
                const destPath = store.getState()['CURRENT_ROUTE_PATH'];

                if (destPath !== history.location.pathname) {
                    history.push(destPath);
                }
            });

            // 初始化一个websocket连接 大屏页面是被动接收消息方，目前只接收信息
            socketInstance = initSocket(
                `${environment.shaanxiPadControlSocketService.direct}/service`,
                () => {
                    console.log('Connection open ...');
                },
                (event) => {
                    console.log('receive data ...', event);

                    try {
                        const { type, data } = JSON.parse(event?.data) || {};
                        const realParams = ActionMap[type];
                        // 由于前端还没做所有的对应pad功能树图中的按钮功能，这里先只写全场馆的映射
                        if (realParams) {
                            // 功能树图中的字段还没有和前台对应操作的状态id对应起来，这里先只写全场馆网络质量的播放
                            store.dispatch({ type: realParams.realActionName, data: realParams.handleFn(data) });
                        } else {
                            //通过store.dispatch派发通知
                            store.dispatch({ type, data });
                        }
                    } catch (e) {}
                },
                () => {
                    console.log('onError');
                },
            );
        }

        return () => {
            socketInstance?.closeSocket();
        };
    }, [store, history, canBeControlled, environment]);

    useLayoutEffect(() => {
        if (show) {
            setPaused(false);
        }
    }, [show]);

    //#region
    // const highlight = (item) => {
    //     if (curEvent.name === item.eventName) {
    //         GlobalMessage.postMessage(curEvent.name, 'switch', { status: Number(!curEvent.status) });

    //         curEvent = {
    //             name: item.eventName,
    //             status: Number(!curEvent.status),
    //             animProps: item.param,
    //         };
    //     } else {
    //         if (curEvent.name && curEvent.status === 1) {
    //             GlobalMessage.postMessage(curEvent.name, 'switch', {
    //                 status: 0,
    //                 animation: Object.assign({}, curEvent.animProps.backward.animation, {
    //                     onComplete: () => {
    //                         GlobalMessage.postMessage(item.eventName, 'switch', { status: 1 });
    //                     },
    //                 }),
    //             });
    //         } else {
    //             GlobalMessage.postMessage(item.eventName, 'switch', { status: 1 });
    //         }
    //         curEvent = {
    //             name: item.eventName,
    //             status: 1,
    //             animProps: item.param,
    //         };
    //     }
    //     console.log(curEvent);
    // };
    //#endregion

    if (layoutConfig) {
        const CurContainer = containersMap.get(layoutConfig.container.name).component;

        return (
            <PageContainer showHeader={false} className="common-detail-page-container">
                <div
                    id="detail-root-container-wrapper"
                    className={`detail-root-container-wrapper${className ? ` ${className}` : ''}`}
                    style={{
                        ...style,
                        width: layoutConfig.layoutInfo.flexible ? '100%' : layoutConfig.layoutInfo.width,
                        height: layoutConfig.layoutInfo.flexible ? '100%' : layoutConfig.layoutInfo.height,
                        // backgroundColor,
                        // backgroundImage: `url(${backgroundImage})`,
                        // transform: 'translateY(-100%)',
                        // display: show ? 'block' : 'none',
                        opacity: show ? 1 : 0,
                        // transition: 'opacity 0.5s',
                    }}
                >
                    <DndProvider backend={HTML5Backend} context={window}>
                        <CurContainer {..._.omit(layoutConfig.container.config, ['contentConfig'])}>
                            <BaseReactGridLayout
                                id={topGridLayoutElementId}
                                style={{ height: '100%', width: '100%' }}
                                cols={layoutConfig.layoutInfo.cols}
                                margin={layoutConfig.layoutInfo.margin}
                                rowHeight={layoutConfig.layoutInfo.rowHeight}
                                isDroppable={false}
                                containerPadding={layoutConfig.layoutInfo.containerPadding}
                                children={children}
                            />
                        </CurContainer>
                    </DndProvider>
                    {/* 不在网格系统内显示的内容组件 */}
                    {extraBlocks}
                    {/* 全局唯一公用的蒙层，关闭后需要隐藏 */}
                    <TweenOne
                        {...maskAnim}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            display: 'none',
                        }}
                    ></TweenOne>
                </div>
                {/* <div
                    className="control-menus"
                    style={{
                        position: 'fixed',
                        left: '100px',
                        bottom: '100px',
                        width: '500px',
                        height: 400,
                        display: 'flex',
                        zIndex: '100000000',
                    }}
                >
                    {curBtns.map((item) => {
                        return (
                            <div style={{ width: 200, height: 200 }}>
                                <Button onClick={() => highlight(item)}>{item.title}</Button>;
                            </div>
                        );
                    })}
                </div> */}
            </PageContainer>
        );
    }

    return null;
}

Index.defaultProps = {
    // 默认值放在defaultProps中，在组件中默认值会重复赋值
    controlConfig: {},
    otherProps: {},
};

export default withResizeDetector(Index);
