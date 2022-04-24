const code = '1 + 2 * (3 + 4)';
// へるぱーかんすう
const getCode = node => code.substr(node.start, node.end - node.start);

const traverser = (node, exitVisitor, indent = 0) => {
    console.log(`${' '.repeat(indent)}enter: ${node.type}'${getCode(node)}'`);
    if(!(node.type in exitVisitor)) {
        console.error(`unknown type ${node.type}`);
        console.log(JSON.stringify(node, null, '  '));
        process.exit(1)
    }

    const res = {};
    // Nodeのなかみをなめる
    Object.keys(node).forEach(key => {
        if(!isNode(node[key])) {
            return;
        }

        if(Array.isArray(node[key])) {
            // Node型の配列なので再帰
            res[key] = node[key].map(v => traverser(v, exitVisitor, indent + 2)) 
        } else {
            res[key] = traverser(node[key], exitVisitor, indent + 2)
        }
    })

    console.log(`${'  '.repeat(indent)}exit:  ${node.type}'${getCode(node)}'`)
    // ビジだー関数呼び出ししてけっかをかえす
    return exitVisitor[node.type](node, res, indent)
}

