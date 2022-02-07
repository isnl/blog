## useReducer 使用

使用场景：未使用 redux 或 mbox 等全局状态管理，状态管理较为轻量的小型项目

案例：以点击按钮实现`count`加减为例

### 1.创建 reducer 文件夹

在当前文件夹下创建以下三个文件：

- constans.ts
- index.ts
- useState.ts


1.在`useState.ts`里初始化 state:

```typescript
export interface State {
  count: number;
}
export interface Action {
  type: string;
  [key: string]: any;
}
import { useReducer } from "react";
const state: State = {
  count: 0,
};
export const useState = () => {
  return useReducer((state: State, action: Action) => {
    let newState = { ...state };
    if (action.type === constans.ADD) {
      newState.count++;
    } else if (action.type === constans.SUB) {
      newState.count--;
    }
    return newState;
  }, state);
};
```

2.`constans.ts`文件：

```typescript
export const ADD = "selfState/add";
export const SUB = "selfState/sub";
```

3.`index.ts`文件

```typescript
import { createContext } from "react";
import { useState } from "./useState";
import * as constans from "./constans";
const StateContext = createContext({});
export { useState, StateContext, constans };
```

### 2.在最外层父组件中使用 createContext 中的 Provider 将 state 和 dispatch 注入所有子组件:

最外层父组件: `index.tsx`

```tsx
import React from 'react'
import { useState, StateContext, constans } from "./reducer";
const { Provider } = StateContext;
import ChildrenComponent from './components/ChildrenComponent';
const Index = () => {
  const [state, dispatch] = useState();
  return <Provider value={{ state, dispatch }}>
    <ChildrenComponent>
  </Provider>
}
```

### 3.在子组件中使用

子组件：`ChildrenComponent.tsx`

```tsx
import React, { useContext } from "react";
import { useState, StateContext, constans } from "./reducer";
export default () => {
  const { state, dispatch } = useContext(StateContext) as {
    state: State;
    dispatch: React.Dispatch<Action>;
  };
  const { count } = state;
  return (
    <div>
      <button
        onClick={dispatch({
          type: constans.ADD,
        })}
      >
        +
      </button>
      <span>{count}</span>
      <button
        onClick={dispatch({
          type: constans.SUB,
        })}
      >
        -
      </button>
    </div>
  );
};
```
