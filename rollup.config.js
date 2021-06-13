import typescript from "rollup-plugin-typescript2";
import image from "@rollup/plugin-image";
import sass from "rollup-plugin-sass";
import svg from "rollup-plugin-svg";
import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json";

const config = {
  input: "src/index.ts",
  output: {
    file: packageJson.main,
    format: "cjs",
    exports: "named",
    sourcemap: true
  },
  plugins: [typescript(), image(), commonjs(), sass({ insert: true })],
  external: ["react", "react-dom"]
};

export default config;
