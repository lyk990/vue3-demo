import typescript from "@rollup/plugin-typescript";
import pkg from './package.json' assert { type: 'json' }
// const pkg = require('./package.json')

export default {
  input: "./src/index.ts",
  output: [
    // 1.cjs -> common.js
    // esm
    {
      format: "cjs",
      file: pkg.main,
    },
    {
      format: "es",
      file: pkg.module,
    },
  ],
  plugins: [typescript()],
};
