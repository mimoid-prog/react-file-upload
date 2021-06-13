import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";
import autoprefixer from "autoprefixer";
import svg from "rollup-plugin-svg";
import packageJson from "./package.json";

const config = {
  input: "src/index.ts",
  output: {
    file: packageJson.main,
    format: "cjs",
    sourcemap: true
  },
  plugins: [
    typescript(),
    svg(),
    styles({
      postcss: {
        plugins: [autoprefixer()]
      }
    })
  ],
  external: ["react", "react-dom"]
};

export default config;
