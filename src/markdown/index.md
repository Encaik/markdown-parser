# H1

## H2

### H3

#### H4

##### H5

###### H6

正文

---

_md_

**md**

~~md~~

[百度](https://www.baidu.com/)

![图片](./img/index.jpg)

123456`12345`123456

```js
class Subject {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    this.observers.map((item, index) => {
      if (item === observer) {
        this.observers.splice(index, 1);
      }
    });
  }
  notify() {
    this.observers.map((item, index) => {
      item.update();
    });
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(this.name);
  }
}
var sub = new Subject();
var obs1 = new Observer('obs1');
var obs2 = new Observer('obs2');
sub.add(obs1);
sub.add(obs2);
sub.notify(); // I`m obs1   I`m obs2
sub.remove(obs2);
sub.notify(); //I`m obs1
```
