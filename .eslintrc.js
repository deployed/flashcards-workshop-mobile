// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:prettier/recommended'],
  ignorePatterns: ['**/node_modules/', '**/generated/', '*.js'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/__tests__/*.{ts,tsx}', '**/setupTests.ts', '**/*.test.{ts,tsx}'],
      },
    ],
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-nested-ternary': 'error',
    'class-methods-use-this': 'off',
    'react/require-default-props': 'off',
    // @typescript-eslint / eslint conflicts
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: false },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // React 17
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/style-prop-object': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
