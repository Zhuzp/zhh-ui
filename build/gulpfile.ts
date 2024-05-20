// 打包方式：串行(series)  并行(parallel)
import { series, parallel } from "gulp";
import { withTaskName,run } from "./utils"
import { spawn } from "child_process";
const rimraf = require('rimraf');
import { projectRoot, outDir } from "./utils/paths";
// gulp 不叫打包，做代码转化 vite

/**
 * 1. 打包样式
 * 2. 打包工具方法
 * 3. 打包所有组件
 * 4. 打包每个组件
 * 5. 生成一个组件库
 * 6. 发布组件
 */


function removeDist(cb) {
  console.log(outDir)
  rimraf.sync(outDir)
  cb();
}

function buildComponents(cb) {
  // body omitted
  async () => run('pnpm --fiter @zhh-ui/components run build')
  cb();
}


exports.default = series(
  removeDist,
  async () => run('pnpm --filter @zhh-ui/components run build')
);

