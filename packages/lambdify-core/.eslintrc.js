module.exports = {
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:all",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "capitalized-comments": "off",
        "class-methods-use-this": "off",
        "dot-location": ["error", "property"],
        "eol-last": "off",
        "func-style": "off",
        "id-length": "off",
        "indent": ["error", "tab"],
        "init-declarations": "off",
        "max-len": ["error", 180],
        "multiline-ternary": "off",
        "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 3 }],
        "no-confusing-arrow": ["error", {"allowParens": true}],
        "no-console": "off",
        "no-extra-parens": "off",
        "no-magic-numbers": "off",
        "no-shadow": "off",
        "no-tabs": "off",
        "no-ternary": "off",
        "no-undefined": "off",
        "object-curly-spacing": ["error", "always"],
        "one-var": "off",
        "padded-blocks": "off",
        "quote-props": "off",
        "quotes": "off",
        "require-jsdoc": "off",
        "require-await": "off",
        "max-statements-per-line": ["error", { "max": 2 }],
        "no-process-exit": "off",
        "no-sync": "off"
    }
};