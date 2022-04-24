const ary = [[10, 20, 30], 10, [9, [99, 66, 33], 8]];

const aryToString = (node, indent = 0) => {
  const leading = "  ".repeat(indent);

  if (Array.isArray(node)) {
    return Object.keys(node)
      .map((key) => {
        return `${leading}${key}: \n` + `${aryToString(node[key], indent + 2)}`;
      })
      .join("\n");
  }
  return `${leading}${node}`;
};
// console.log(aryToString(ary))

// Tree
const data = {
  a: {
    href: "123",
    onclick: "test()",
    img: {
      src: "https://nanka.png",
    },
  },
  div: {
    ul: {
      li: {
        text: "りすとです",
      },
    },
  },
  p: {
    text: "だんらくですよよよ",
  },
};
// DOMをつくる
const createDom = (node) => {
  // objectの場合はcreateElement
  if (typeof node === "object" && node) {
    return Object.keys(node).map((key) => {
      // domをつくる
      const dom = document.createElement(key);
      // こどもがstrならばsettattribute
      if (typeof node[key] === "string") {
        dom.setAttribute(key, node[key]);
      }
      // こどもがobjectならばdomをつくる
      if (typeof node[key] === "object") {
        console.log(node[key]);
        dom.appendChild(createDom(node[key]));
      }
    });
  }
  // objectでないばあいは
  // おやにattributeをセットする -> できない
  // ここで、おやをみられない
  // return document.createElementnode.setattribute('')
};
// console.log(createDom(data))

const data3 = {
  type: "div",
  class: "dekai-modal",
  children: [
    {
      type: "a",
      href: "https://dokkano_page.com",
      onclick: "test()",
      children: {
        type: "img",
        src: "https://via.placeholder.com/300/09f/fff.png",
      },
    },
    { type: "p", text: "らんらんらるー" },
  ],
};
// DOMをつくる
const createDom2 = (node) => {
  // objectの場合はcreateElement
  if (typeof node === "object" && node) {
    // まずdomつくる
    const dom = document.createElement(node["type"]);
    for (const key in node) {
      if (key === "type") {
        continue;
      }
      if (key === "class") {
        dom.classList.add(node[key]);
        continue;
      }
      if (key === "children") {
        if (Array.isArray(node[key])) {
          node[key].forEach((childNode) =>
            dom.appendChild(createDom2(childNode))
          );
        } else {
          dom.appendChild(createDom2(node[key]));
        }
        continue;
      }
      if (key === "text") {
        dom.innerText = node[key];
        continue;
      }
      dom.setAttribute(key, node[key]);
      continue;
    }

    return dom;
  }
};
createDom2(data3);
