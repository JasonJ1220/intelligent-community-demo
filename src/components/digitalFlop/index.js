import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cRender, _ } from 'oss-web-toolkits';
import './style.less';

const defaultConfig = {
    /**
     * @description 数字展示数组
     * @type {Array<Number>}
     * @default number = []
     * @example number = [10]
     */
    numberList: [],
    /**
     * @description 内容 可包含占位符 占位符数量 与 numberList 长度保持一致
     * @type {String}
     * @default content = ''
     * @example content = '{numberHolder}个'
     */
    content: '',
    /**
     * @description 浮点数
     * @type {Number}
     * @default toFixed = 0
     */
    toFixed: 0,
    /**
     * @description 显示位置
     * @type {String}
     * @default textAlign = 'center'
     * @example textAlign = 'center' | 'left' | 'right'
     */
    textAlign: 'center',
    /**
     * @description 行间隔
     * @type {Number}
     *@default rowGap = 0
     */
    rowGap: 0,
    /**
     * @description 文本样式
     * @type {Object} {CRender Class Style}
     */
    style: {
        fontFamily: 'PixelLCD',
        fill: '#ffc844',
        fontSize: 24,
    },
    /**
     * @description 格式化函数
     * @type {Null|Function}
     */
    formatter: (number) => {
        const numbers = number.toString().split('').reverse();
        const segs = [];

        while (numbers.length) {
            // 未考虑 tofix 的情况
            segs.push(numbers.splice(0, 3).join(''));
        }

        return segs.join(',').split('').reverse().join('');
    },
    /**
     * @description CRender animationCurve
     * @type {String}
     * @default animationCurve = 'easeOutCubic'
     */
    animationCurve: 'easeOutCubic',
    /**
     * @description CRender animationFrame
     * @type {String}
     * @default animationFrame = 50
     */
    animationFrame: 50,
    /**
     * @description 默认从这个值开始滚动
     * @type {Object}
     * @default undefined
     */
    defaultBeforeNumberList: [0],
};

const DigitalFlop = ({ config = {}, className, style }) => {
    const domRef = useRef(null);
    const rendererRef = useRef(null);
    const graphRef = useRef(null);
    const configRef = useRef(null);

    function getGraph(mergedConfig) {
        const { animationCurve, animationFrame } = mergedConfig;
        const graphConfig = {
            name: 'numberText',
            animationCurve,
            animationFrame,
            shape: getShape(mergedConfig),
            style: getStyle(mergedConfig),
        };
        // 拓展 NumberText
        const text = new cRender.NumberText(graphConfig);
        rendererRef.current.add(text);
        return text;
    }

    function getShape({ numberList, content, toFixed, textAlign, rowGap, formatter }) {
        const [w, h] = rendererRef.current.area;
        const position = [w / 2, h / 2];

        if (textAlign === 'left') position[0] = 0;
        if (textAlign === 'right') position[0] = w;
        const convertNumberList = numberList.map((item) => Number(item));

        return { numberList: convertNumberList, content, toFixed, position, rowGap, formatter };
    }

    function getStyle({ style, textAlign }) {
        return _.merge(style, {
            textAlign,
            textBaseline: 'middle',
        });
    }

    useEffect(() => {
        // isEqual 不能比较两个函数
        // config的值并没有变化，但是还是走了下面的代码，所以动画被重新触发了
        if (_.isEqual(configRef.current, config)) return;
        configRef.current = config;
        const mergedConfig = _.merge(_.cloneDeep(defaultConfig, true), config || {});
        if (!rendererRef.current) {
            rendererRef.current = new cRender.default(domRef.current);

            graphRef.current = getGraph(mergedConfig);
        }

        const graph = graphRef.current;
        graph.animationEnd();

        const shape = getShape(mergedConfig);
        const cacheNum = graph.shape.numberList.length;
        const shapeNum = shape.numberList.length;

        cacheNum !== shapeNum && (graph.shape.numberList = shape.numberList);

        const { animationCurve, animationFrame } = mergedConfig;

        Object.assign(graph, { animationCurve, animationFrame });

        const defaultBeforeValue = _.merge(
            _.cloneDeep(config, true),
            { numberList: config.defaultBeforeNumberList || defaultConfig.defaultBeforeNumberList } || {}
        );

        graph.animation('style', getStyle(mergedConfig), true);
        graph.animation('shape', shape, false, defaultBeforeValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    const classNames = useMemo(() => classnames('digital-flop', className), [className]);

    return (
        <div className={classNames} style={style}>
            <canvas ref={domRef} />
        </div>
    );
};

DigitalFlop.propTypes = {
    config: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default DigitalFlop;
