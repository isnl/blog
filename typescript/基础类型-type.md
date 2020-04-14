## 数据类型

#### 布尔类型

```typescript
let isDone: boolean = false;
```

#### 数字类型

```typescript
let decliteral: number = 20;
let hexLiteral: number = 0x14;
let binaryLiteral: number = 0b10100;
let octalLiteral: number = 0o24;
```

### 字符串类型

```typescript
let name: string = "hello";
```

### 数组

```typescript
let list: number[] = [1, 2, 3]; //推荐

let list: Array<number> = [1, 2, 3];
```

### 元组

```typescript
let x: [string, number];
x = ["hello", 10];
```

### 枚举类型

> enum 声明，首字母大写。

```typescript
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;
```

> 顺序可自定义 每个都可

```typescript
enum Color{
  Red: 1,
  Green,
  Blue
}
let colorName:string = Color[2];
```

### any 类型

```typescript
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;
```

### void 类型

```typescript
function warnUser(): void {
  console.log("this is a warning message");
}
let unusable: void = null;
let unusable: void = undefined;
```

### never 类型

> 表示的是那些永不存在的值的类型。 例如， never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```
### Object类型
> object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

### 类型断言
两种表现形式
```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```