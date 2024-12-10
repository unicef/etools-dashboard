import typescriptEslint from '@typescript-eslint/eslint-plugin';
import lit from 'eslint-plugin-lit';
import prettier from 'eslint-plugin-prettier';
import litA11Y from 'eslint-plugin-lit-a11y';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['**/.gitignore', 'demo/*', 'test/*', 'build/*', 'src/*']
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      lit,
      prettier,
      'lit-a11y': litA11Y
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        dayjs: true,
        Promise: true,
        Polymer: true,
        EtoolsPmpApp: true,
        EtoolsRequestCacheDb: true,
        ShadyCSS: true,
        Set: true
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module'
    },

    rules: {
      'lit-a11y/anchor-is-valid': 'off',
      'lit-a11y/click-events-have-key-events': 'off',
      'lit-a11y/no-autofocus': 'warn',
      'lit-a11y/aria-attrs': 'warn',
      'prettier/prettier': 'error',
      'lit/attribute-value-entities': 'off',
      'lit/no-legacy-template-syntax': 'off',
      'linebreak-style': 'off',

      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true
        }
      ],

      '@typescript-eslint/no-object-literal-type-assertion': 'off',
      'padded-blocks': 'off',
      'brace-style': 'off',
      'new-cap': 'off',
      'no-var': 'off',
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'comma-dangle': ['error', 'never'],

      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true
        }
      ],

      'prefer-promise-reject-errors': 'off',
      camelcase: 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true
        }
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
];
