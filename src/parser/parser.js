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
    // 斜体
    else if (/^(_|\*){1}[^_|\*]+(_|\*){1}$/.test(variable[index])) {
      _h.push(`<i>${variable[index].replace(/(_|\*){1}/g, "")}</i>`);
    }
    // 加粗
    else if (/^(_|\*){2}[^_|\*]+(_|\*){2}$/.test(variable[index])) {
      _h.push(`<b>${variable[index].replace(/(_|\*){2}/g, "")}</b>`);
    }
    // 删除
    else if (/^~{2}[^~]+~{2}$/.test(variable[index])) {
      _h.push(`<s>${variable[index].replace(/~{2}/g, "")}</s>`);
    }
    // 链接
    else if (/^\[.*\]\(.*\)$/.test(variable[index])) {
      let text = variable[index].match(/\[.*\]/)[0].replace(/(\[|\])/g, "");
      let href = variable[index].match(/\(.*\)/)[0].replace(/(\(|\))/g, "");
      _h.push(`<a href='${href}'>${text}</a>`);
    }
    // 图片
    else if (/^\!\[.*]\(.*\)$/.test(variable[index])) {
      let text = variable[index].match(/\[.*\]/)[0].replace(/(\[|\])/g, "");
      let href = variable[index].match(/\(.*\)/)[0].replace(/(\(|\))/g, "");
      _h.push(`<img src='${href}' width='100%' alt='${text}'/>`);
    }
    // 代码块
    else if (/^\`{3}/.test(variable[index])) {
      let code = [];
      for (let row = index + 1; row < variable.length; row++) {
        console.log(variable[row]);
        if (!/^\`{3}/.test(variable[row])) {
          code.push(variable[row]);
        } else {
          index = row;
          break;
        }
      }
      code = code.join("\\n");
      console.log(code);
      _h.push(`<pre>${code}</pre>`);
    }
    // 代码行
    else if (/\`[^_|\*]+\`/.test(variable[index])) {
      _h.push(
        `${variable[index].replace(/\`/, "<code>").replace(/\`/, "</code>")}`
      );
    }
    // 嵌套区块
    // 列表
    // 表格
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
