module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "plugins": [
    "prettier"
  ],
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "globals": {
    "jest": false,
    "it": false,
    "beforeEach": false,
    "process": false,
    "describe": false,
    "test": false,
    "expect": false,
    "console.warn": false,
    "__dirname": false,
  },
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "semi": false,
      "arrowParens": "always",
      "printWidth": 120,
      "tabWidth": 2,
      "trailingComma": "es5"
    }],
    "no-console": ["error", { allow: ["warn", "log"] }],
    "linebreak-style": [
      "error",
      "unix"
    ]
  }
};
