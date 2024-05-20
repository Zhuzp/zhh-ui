import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import terser from '@rollup/plugin-terser';
// import { eslint } from 'rollup-plugin-eslint';
// import typescript from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

const libName = 'libName'

export default [
    {
        input: './index.ts',
        output: [
            {
                file: `dist/${libName}.cjs.js`,
                format: 'cjs',
              },
              {
                file: `dist/${libName}.es.js`,
                format: 'es',
              },
              {
                file: `dist/${libName}.umd.js`,
                format: 'umd',
                // globals: {
                //   'vue': 'Vue',
                // },
                name: libName,
              },
        ],
        external: ['lodash'],
        plugins: [
            resolve(),  // 这样 Rollup 能找到 `ms`
            commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
            // eslint(),
            babel({
                babelHelpers: 'runtime',
                presets: ["@babel/preset-env",'@babel/preset-react'],
                plugins: [["@babel/plugin-transform-runtime", { useESModules: true }]],
                extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"], //增加配置
            }),
            terser(),
            typescript({
                jsx: 'react',
                allowSyntheticDefaultImports: true
            }),
            scss({
                // 插件选项
                output: 'bundle.css', // 输出的 CSS 文件名
            }),
        ]
    }
];
