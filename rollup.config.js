import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
 
export default [
    {
        input: 'src/main.js',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' },
            { file: pkg.module, format: 'umd' }
        ],
        external: ['lodash'],
        plugins: [
            resolve(),  // 这样 Rollup 能找到 `ms`
            commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
            eslint(),
            babel({
                exclude: 'node_modules/**', // 防止打包node_modules下的文件
                runtimeHelpers: true,       // 使plugin-transform-runtime生效
              }),
            terser()
        ]
    }
];
