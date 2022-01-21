import React from 'react';

export default function Index(props) {
    const { text, className, ...otherProps } = props;

    return (
        <div className={className} style={otherProps}>
            {text}
        </div>
    );
}

Index.supportSettingProps = [
    {
        type: 'text',
        name: 'text',
        label: '标题内容',
    },
    {
        type: 'number',
        name: 'fontSize',
        label: '字体大小',
    },
    {
        type: 'select',
        name: 'fontFamily',
        label: '字体',
        options: [
            {
                label: 'TRENDS',
                value: 'TRENDS',
            },
            {
                label: 'DIGIFACEWIDE',
                value: 'DIGIFACEWIDE',
            },
            {
                label: 'AGENCYR',
                value: 'right',
            },
            {
                label: 'AGENCYB',
                value: 'right',
            },
            {
                label: 'PixelLCD-7',
                value: 'right',
            },
            {
                label: 'FZZYJW--GB1-0',
                value: 'right',
            },
        ],
    },
    {
        label: '标题对齐',
        name: 'textAlign',
        type: 'select',
        options: [
            {
                label: '左对齐',
                value: 'left',
            },
            {
                label: '居中',
                value: 'center',
            },
            {
                label: '右对齐',
                value: 'right',
            },
        ],
    },
    {
        label: '行高',
        name: 'lineHeight',
        type: 'number',
        defaultValue: 32,
    },
    {
        label: '上padding',
        name: 'paddingTop',
        type: 'number',
        defaultValue: 0,
    },
    {
        label: '下padding',
        name: 'paddingBottom',
        type: 'number',
        defaultValue: 0,
    },
];
