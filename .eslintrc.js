module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  globals: {
    jest: 'readonly',
    Nullable: 'readonly',
    ReturnNullFn: 'readonly',
    TimeoutHandle: 'readonly',
    ComponentSize: 'readonly',
  },
  env: {
    es6: true,
    node: true,
    jest: true,
    // browser: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  overrides: [
    {
      files: ['**/__test__/**', '**/gulpfile.ts'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      // beacuse the `error.ts`used to output some tips for developer, so it need to be allowed to use the console
      files: ['build/**', 'packages/utils/error.ts', 'packages/utils/util.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    // js/ts

    // beacuse eslint `no-unused-vars` not recognize the declared var of typescript, so we use the @typescript-eslint
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['arrowFunctions'] },
    ],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-console': ['warn', { allow: ['error'] }],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    camelcase: ['error', { properties: 'never' }],

    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-with': 'error',
    'no-void': 'error',
    'prefer-const': [
      'warn',
      { destructuring: 'all', ignoreReadBeforeAssign: true },
    ],
    'prefer-template': 'error',
    'object-shorthand': [
      'error',
      'always',
      { ignoreConstructors: false, avoidQuotes: true },
    ],
    'block-scoped-var': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { disallowTypeAnnotations: false },
    ],

    // vue
    'vue/no-v-html': 2,
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // import
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],

        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@vue/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@hkust-ui/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
      },
    ],
  },
}
