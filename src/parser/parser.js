var fs = require("fs");

fs.readFile("./src/markdown/index.md", (err, data) => {
  if (err) {
    return console.error(err);
  }
  let variable = data.toString().split("\r\n");
  let _h = [];
  for (let index = 0; index < variable.length; index++) {
    console.log(variable[index]);
    // 标题
    if (/^#\s/.test(variable[index])) {
      _h.push(`<h1>${variable[index].replace("# ", "")}</h1>`);
    } else if (/^##\s/.test(variable[index])) {
      _h.push(`<h2>${variable[index].replace("## ", "")}</h2>`);
    } else if (/^###\s/.test(variable[index])) {
      _h.push(`<h3>${variable[index].replace("### ", "")}</h3>`);
    } else if (/^####\s/.test(variable[index])) {
      _h.push(`<h4>${variable[index].replace("#### ", "")}</h4>`);
    } else if (/^#####\s/.test(variable[index])) {
      _h.push(`<h5>${variable[index].replace("##### ", "")}</h5>`);
    } else if (/^######\s/.test(variable[index])) {
      _h.push(`<h6>${variable[index].replace("###### ", "")}</h6>`);
    }
    // 分割线
    else if (/^(-|_|\*){3}/.test(variable[index])) {
      _h.push(`<hr/>`);
    }
    // 字体
    // 链接
    // 图片
    // 嵌套区块
    // 列表
    // 表格
    // 代码块
    // 空行
    else if (variable[index] === "") {
      _h.push(`<br/>`);
    }
    // 正文
    else {
      _h.push(`<p>${variable[index]}</p>`);
    }
  }
  _h = _h.join("");
  let script = `window.onload = function(){var insertDiv = document.getElementById('md');insertDiv.innerHTML = "${_h}"}`;
  fs.writeFile("./src/page/js/script.js", script, "utf8", (err) => {
    if (err) {
      return console.error(err);
    }
  });
});
