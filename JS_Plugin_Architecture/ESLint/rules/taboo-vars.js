const rule = context => {
    let vars = []

    // eslintrcで渡された値をcontextから取得
    if(Array.isArray(context.options[0])) {
        vars = context.options[0]
    }

    return {
        Identifier: node => {
            if(vars.indexOf(node.name) !== -1) {
                context.report({
                    node,
                    message: "You MUST NOT USE taboo variables."
                })
            }
        }
    }
}

rule.schema = [
    {
        type: "array",
        items: {type: "string"},
        uniqueItems: true
    }
]
