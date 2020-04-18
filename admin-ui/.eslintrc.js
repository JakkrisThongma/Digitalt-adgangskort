module.exports = {
  env: {
    browser: true
  },
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["react", "jsx-a11y", "import", "prettier", "react-hooks"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        trailingComma: "none",
        singleQuote: false,
        printWidth: 80,
        bracketSpacing: true,
        tabWidth: 2,
        useTabs: false,
        jsxBracketSameLine: true,
        "react/jsx-max-props-per-line": [1, { "when": "always" }]
      }
    ],
    quotes: [2, "double", { avoidEscape: true }],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    'import/resolver': {
      'webpack': { config: 'webpack/webpack.common.js'
    }
    }
  }
};




