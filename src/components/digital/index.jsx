import React from 'react';
import classNames from 'classnames';
import { _ } from 'oss-web-toolkits';
import './index.less';

// 使用了oss-web-toolkits中的工具,直接引入lodash可能造成_变量污染
const merge = _.merge;
const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 单个数位组件
function Digital(props) {
    const { digit, index, effectFlag, option, autoFillNum } = props;
    let flag = digit !== '.' && digit !== ',' && digit !== '-' && digit !== '+';

    if (flag) {
        let digit2 = Number(digit);
        if (digit2 < 0 || digit2 > 9) {
            return null;
        }

        let style = {
            marginRight: option.numbers.letterSpacing + 'px',
            color: autoFillNum > index ? option.numbers.autoFillColor : '',
        };

        if (effectFlag) {
            style = {
                transform: 'translateY(0)',
                ...style,
            };
        } else {
            let radomY = (Math.random() * 10).toFixed(0);
            style = {
                animation: 'counter-slider-' + radomY + '-' + digit + ' 1.2s ease-in',
                transform: 'translateY(-' + digit + '00%)',
                ...style,
            };
        }

        return (
            <ul className="counter-item" style={style}>
                {Numbers.map((num, index) => {
                    return <li key={index}>{num}</li>;
                })}
            </ul>
        );
    } else {
        return (
            <ul className={classNames('counter-item', 'counter-item-tag')}>
                <li>{digit}</li>
            </ul>
        );
    }
}

/**
 * 数字组件
 * @param {object} props.config 对应的是 state.option里面所有的的内容
 * @param {number} props.data 展示的值
 */
class Index extends React.PureComponent {
    state = {
        effectFlag: false,
        displayNum: 0,
        numbers: [],
        prefixStyle: null,
        numbersStyle: null,
        suffixStyle: null,
        autoFillNum: 0, // 补0的位数
        option: {
            justifyContent: 'center',
            alignItems: 'flex-end',
            prefix: {
                content: '',
                textStyle: {
                    color: '#FF0',
                    fontSize: 22,
                    fontWeight: '',
                    fontFamily: '',
                    marginRight: 4,
                },
            },
            numbers: {
                textStyle: {
                    color: '#FF0',
                    fontSize: 22,
                    fontWeight: '',
                    fontFamily: '',
                },
                letterSpacing: 0,
                decimal: -1,
                digitCount: -1, // 小数点前位数，默认不自动不全
                autoFillColor: '#375674',
                thousands: false,
                plusEnable: false, // 正数前是否显示+号
            },
            suffix: {
                content: '',
                textStyle: {
                    color: '#FF0',
                    fontSize: 22,
                    fontWeight: '',
                    fontFamily: '',
                    marginLeft: 2,
                },
            },
        },
    };

    componentDidMount() {
        this.mergeoption();
        this.setNumber();
    }

    componentDidUpdate(prevProp, prevState) {
        if (this.props.config !== prevProp.config) {
            this.mergeoption();
        }

        if (this.props.data !== prevProp.data || this._optionUpdateFlag) {
            this._optionUpdateFlag = false;
            this.setNumber();
        }
    }

    // 保证setNumber的时候读到的option是最新的，因为option是使用setState保存
    _optionUpdateFlag = false;
    mergeoption = () => {
        const option = {};
        merge(option, this.state.option, this.props.config);
        const pStyle = {};
        merge(pStyle, option.prefix.textStyle);
        const nStyle = {};
        merge(nStyle, option.numbers.textStyle);
        const sStyle = {};
        merge(sStyle, option.suffix.textStyle);
        this._optionUpdateFlag = true;
        this.setState({
            option,
            prefixStyle: pStyle,
            numbersStyle: nStyle,
            suffixStyle: sStyle,
        });
    };

    setNumber = () => {
        const num = this.props.data;
        let effectFlag = !num;
        if (typeof num === 'number' && !isNaN(num)) {
            let numbers = this.formatNumber(num).toString().split('');
            this.setState({
                effectFlag,
                numbers,
            });
        }
    };

    formatNumber = (num) => {
        const { option } = this.state;

        let positiveFlag = num > 0;
        let decimal = option.numbers.decimal;
        if (decimal > -1) {
            num = parseFloat(num).toFixed(decimal);
        }
        let digitCount = option.numbers.digitCount;
        if (digitCount > -1) {
            // 前边补全0
            let count = parseFloat(num).toFixed(0).toString().length;
            if (count < digitCount) {
                num = Array(digitCount - count + 1).join(0) + num.toString();
            }

            this.setState({
                autoFillNum: digitCount - count,
            });
        }
        if (option.numbers.thousands) {
            let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
            num = num.replace(re, '$1,');
        }
        if (option.numbers.plusEnable) {
            // 补全+号
            if (positiveFlag) {
                num = '+' + num;
            }
        }
        return num;
    };

    render() {
        const { option, prefixStyle, suffixStyle, numbers, numbersStyle } = this.state;

        return (
            <div className={classNames('counter-con', this.props.className)} style={{ justifyContent: option.justifyContent }}>
                {option && option.prefix && option.prefix.content !== '' && (
                    <span className={classNames('counter-prefix', 'counter-fix')} style={prefixStyle}>
                        {option.prefix.content}
                    </span>
                )}
                <div className="counter-num-con" style={numbersStyle}>
                    {numbers.map((item, index) => {
                        return <Digital key={index} index={index} digit={item} {...this.state} />;
                    })}
                </div>
                {option && option.suffix && option.suffix.content !== '' && (
                    <span className={classNames('counter-suffix', 'counter-fix')} style={suffixStyle}>
                        {option.suffix.content}
                    </span>
                )}
            </div>
        );
    }
}

export default Index;
