import React, { useState, useCallback } from 'react';
import GridLayout from 'react-grid-layout';
import { withResizeDetector } from 'react-resize-detector';
import ClassNames from 'classnames';
import { useDrop } from 'react-dnd-cjs';

const ReactGridLayout = withResizeDetector(GridLayout);

function BaseReactGridLayout(props) {
    const {
        children,
        onLayoutChange = () => {},
        containerPadding,
        margin,
        rowHeight,
        cols,
        isDroppable = true,
        style = {},
        id,
    } = props;
    const [droppingItem, setDroppingItem] = useState(null);
    const [showPlaceholder, setShowPlaceholder] = useState(false);
    const [fromOutside, setFromOutside] = useState(false);
    const [preventCollision, setPreventCollision] = useState(false);
    const [, dropRef] = useDrop({
        accept: 'viewItem',
        collect: (monitor, props) => {
            return {
                canDrop: monitor.canDrop(),
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
                dragingItem: monitor.getItem(),
            };
        },
        hover: (item) => {
            setFromOutside(true);
            const gridSize = { w: cols / 3, h: 100 };
            setDroppingItem({ i: item.data.name, ...gridSize });
        },
        drop(item, monitor) {
            setFromOutside(false);
            setDroppingItem(null);
        },
    });

    const onDrop = useCallback(
        (layouts, layoutItem, event) => {
            onLayoutChange('new', layoutItem);
        },
        [onLayoutChange]
    );

    const onDragStart = useCallback(() => {
        setShowPlaceholder(fromOutside ? false : true);
        setPreventCollision(fromOutside ? true : false);
    }, [fromOutside]);

    function onResizeStart() {
        setPreventCollision(false);
        setShowPlaceholder(true);
    }

    const onResizeOrDragStop = useCallback(
        (layout, oldItem, newItem) => {
            onLayoutChange('replace', newItem);
        },
        [onLayoutChange]
    );

    return (
        <div
            // style={{ backgroundColor: isOverCurrent ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)' }}
            ref={dropRef}
            style={style}
            id={id}
            className={ClassNames(`base-react-grid-layout-wrapper`, {
                'show-placeholder': showPlaceholder,
            })}
        >
            <ReactGridLayout
                cols={cols}
                className="edit-content-grid-layout"
                // layout={layout}
                // isDraggable={isDraggable}
                // isResizable={isResizable}
                // resizeHandles={['sw', 'nw', 'se', 'ne']}
                // 拖动元素
                draggableHandle=".drag-icon"
                droppingItem={droppingItem}
                // useCSSTransforms={false}
                // onBreakpointChange={onBreakpointChange}
                // onLayoutChange={onLayoutChange}
                onDragStart={onDragStart}
                onDrop={onDrop}
                // isBounded={true}
                onResizeStart={onResizeStart}
                onResizeStop={onResizeOrDragStop}
                onDragStop={onResizeOrDragStop}
                // onWidthChange={onWidthChange}
                // 是否垂直向上吸附，设置false为可以任意放置
                // verticalCompact={false}
                compactType={'vertical'}
                // resizeHandle={(resizeHandleAxis) => {
                //     console.log(resizeHandleAxis);

                //     return <div className="sdfsdfsdf">sdfsdf</div>;
                // }}
                // 是否可放置
                isDroppable={isDroppable}
                // 行高单位，影响栅格的高度，当droggable为true时，垂直方向可以拖动移动的单位距离
                rowHeight={rowHeight}
                containerPadding={containerPadding}
                margin={margin}
                preventCollision={preventCollision}
                // breakpoints={{ lg, md, sm, xs, xxs }}
            >
                {children}
            </ReactGridLayout>
        </div>
    );
}

export default withResizeDetector(BaseReactGridLayout);
