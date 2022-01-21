# react版的视图服务请求
> 所有的方法都是基于当前的视图服务开发的

## data-parser
### single-value 单指标数据解析
```ts
const singleValue: (parsedResponse: IParsedResponse, mapIndicatorListIndexToResult?: IMapIndicatorListIndexToResult) => ISingleValueResult
```

## hoc
### react-view-item-data
> 创建视图服务请求高阶组件的方法
```js

class Index extend React.Component{

    /**
     * 被包装后的组件props会增加三个属性
     * - parsedResponse 处理之后的res
     * - response 原始的
     * - requestActions = {
     *      abort 取消请求
     *      reload 重新请求
     * }
     */

    render(){
        return(
            <div>demo</div>
        )
    }
}

const hoc = createViewItemDataRequestHoc(viewRequestApi)(Index,props=>({}))
```

### with-single-value 单值数据高阶组件
- withSingleValue
  ```ts
  const withSingleValue: (viewRequestApi: Function, Comp: any) => React.ForwardRefExoticComponent<IHocProps & React.RefAttributes<unknown>>
  ```
- createWithSingleValueHoc
  ```ts
  const createWithSingleValueHoc: (viewRequestApi: Function) => (Comp: any) => React.ForwardRefExoticComponent<IHocProps & React.RefAttributes<unknown>>
  ```

## hooks
### useViewItemData
```js
const Comp = ()=>{

    // 获取请求回来的参数
    const {parsedResponse,response,actions} = useViewItemData(viewRequestApi,{
        viewItemId :"",
        viewPageId:"",
        viewPageArgs :{},
        interval:false, // 表示不启用定时器
    });

}
```

### createUseViewItemData
`useViewItemData` 柯里化

### use-memorized-object 缓存object的hook

### use-single-value  单指标解析使用hook


## viewRequestUtils
- `getResponseHeader(res)` 获取header
- `getResponseRows(res)` 获取rows
- `buildViewItemDataResponse({indicatorList,dimessions,rows})` 构建视图服务返回的数据结构

## TODO:
- [x] 单个接口请求
- [ ] 多个接口组
- [ ] 动态传入请求url

