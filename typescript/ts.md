### 类型注解

### 接口

interface 关键字声明 名称首字母大写，和类一致。

string,number,boolean,array,object

接口可代替函数参数的类型注解

### 类

```javascript
class User {
    fullName:string,
    firstName:string,
    lastName:string
    constructor(firstName:string,lastName:string){
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = this.firstName + '' + this.lastName;
    }
}
const user = new User('huan','zhang');
```
