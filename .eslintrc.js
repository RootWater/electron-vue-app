module.exports = {
    root: true,
    env: {
        node: true
    },
    "extends": [
        "plugin:vue/essential",
        "@vue/standard"
    ],
    rules: {
        "indent": 0,
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-unused-vars": [2, {
            "vars": "all",
            "args": "none"
        }], //不允许有声明后未使用的变量或者参数
        "no-empty": ["error", {
            "allowEmptyCatch": true
        }], // 允许空catch子句（即不包含注释）
        "space-before-function-paren": [1, {
            "anonymous": "always",
            "named": "never"
        }], // 在函数左括号的前面是否有空格
        "semi": [0], // 必须在语句后面加分号
        "quotes": 0, // ["error", "double"],// 字符串没有使用双引号
        "comma-style": [2, "last"], //逗号风格，换行时在行首还是行尾
        "comma-spacing": [1, {
            "before": false,
            "after": true
        }], // 逗号后有空格，前没有空格
        "comma-dangle": [2, "never"], //对象字面量项尾不能有逗号
        "no-var": 0, // 禁用var，用let和const代替
        "no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
        "array-bracket-spacing": [2, "never"], // 是否允许非空数组里面有多余的空格
        "semi-spacing": [2, {
            "before": false,
            "after": true
        }], // 分号前后空格
        "no-unsafe-finally": 0 //允许finally块中的控制流操作
    },
    parserOptions: {
        parser: "babel-eslint"
    }
}
