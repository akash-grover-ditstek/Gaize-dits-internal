module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
   },
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:prettier/recommended",
      "plugin:jsx-a11y/strict",
   ],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: "module",
   },
   settings: {
      react: {
         version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
      },
   },
   plugins: ["react", "jsx-a11y", "@typescript-eslint"],
   rules: {
      "react-hooks/exhaustive-deps": "error",
      "no-var": "error",
      "brace-style": "error",
      "prefer-template": "error",
      "radix": "error",
      "space-before-blocks": "error",
      "import/prefer-default-export": "off",
      "react/no-unescaped-entities": "off",
      "prettier/prettier": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "no-async-promise-executor": "off",
      "prettier/prettier": "off",
      "react/prop-types": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "no-debugger": "warn",
      "no-constant-condition": "warn"
   },
   overrides: [
      {
         files: [
            "**/*.test.js",
            "**/*.test.jsx",
            "**/*.test.tsx",
            "**/*.spec.js",
            "**/*.spec.jsx",
            "**/*.spec.tsx",
         ],
         env: {
            jest: true,
         },
      },
   ],
   globals: {
      JSX: true,
   }
};
