import js from '@eslint/js';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        HTMLElement: 'readonly',
        ResizeObserver: 'readonly',
        unplashImgs: 'readonly',
        Quill: 'readonly',
        MicroModal: 'readonly',
        CustomEvent: 'readonly',
        getSelection: 'readonly'
      }
    },
    plugins: {
      'unused-imports': unusedImports
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'none'
        }
      ],
      'no-console': 'off'
    }
  }
];
