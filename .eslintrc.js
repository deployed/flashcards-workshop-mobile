import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import expoPlugin from 'eslint-plugin-expo';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactRefresh.configs.recommended,
  tanstackQuery.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.node,
        // React Native
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-native': fixupPluginRules(reactNative),
      expo: expoPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-require-imports': 'off',

      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': 'off',
      'react/prop-types': 'off',

      // React Native specific rules
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': ['warn', { skip: ['AppText'] }],
      'react-native/no-single-element-style-arrays': 'warn',
      ...reactHooks.configs.recommended.rules,
    },
  }, // Configuration for test files
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Configuration for config files
  {
    files: [
      'app.config.{js,ts}',
      'babel.config.{js,ts}',
      'metro.config.{js,ts}',
      'jest.config.{js,ts}',
    ],
    rules: {
      'expo/prefer-module-configs': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['ios', 'android', 'node_modules', '.expo'],
  },
);