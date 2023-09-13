module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'no-var': 'error', // var 금지
        'no-multiple-empty-lines': 'error', // 여러 줄 공백 금지
        'no-console': ['error', {allow: ['warn', 'error', 'info']}], // console.log() 금지
        eqeqeq: 'error', // 일치 연산자 사용 필수
        'dot-notation': 'error', // 가능하다면 dot notation 사용
        'no-unused-vars': 1, // 사용하지 않는 변수 경고 (에러 대신)
        'func-style': ['error', 'expression'], // 함수 스타일 지정

        'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
    },
};
