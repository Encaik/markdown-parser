window.onload = function(){var insertDiv = document.getElementById('md');insertDiv.innerHTML = "<h1>H1</h1><br/><h2>H2</h2><br/><h3>H3</h3><br/><h4>H4</h4><br/><h5>H5</h5><br/><h6>H6</h6><br/><p>正文</p><br/><hr/><br/><i>md</i><br/><b>md</b><br/><s>md</s><br/><a href='https://www.baidu.com/'>百度</a><br/><img src='./img/index.jpg' width='100%' alt='图片'/><br/>123456<code>12345</code>123456<br/><pre class='javascript'>class Subject {\n  constructor() {\n    this.observers = [];\n  }\n  add(observer) {\n    this.observers.push(observer);\n  }\n  remove(observer) {\n    this.observers.map((item, index) => {\n      if (item === observer) {\n        this.observers.splice(index, 1);\n      }\n    });\n  }\n  notify() {\n    this.observers.map((item, index) => {\n      item.update();\n    });\n  }\n}\nclass Observer {\n  constructor(name) {\n    this.name = name;\n  }\n  update() {\n    console.log(this.name);\n  }\n}\nvar sub = new Subject();\nvar obs1 = new Observer('obs1');\nvar obs2 = new Observer('obs2');\nsub.add(obs1);\nsub.add(obs2);\nsub.notify(); // I`m obs1   I`m obs2\nsub.remove(obs2);\nsub.notify(); //I`m obs1</pre><br/>"}