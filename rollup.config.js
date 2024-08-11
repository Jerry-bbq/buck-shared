import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import dts from 'rollup-plugin-dts';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const packagesDir = join(dirname(__filename), 'packages');
const packageFiles = fs.readdirSync(packagesDir);

const createConfig = (file) => {
  return [
    {
      input: `./packages/${file}/src/index.ts`,
      output: [
        {
          file: `./packages/${file}/dist/index.cjs.js`,
          format: 'cjs',
        },
        {
          file: `./packages/${file}/dist/index.esm.js`,
          format: 'esm',
        },
        {
          file: `./packages/${file}/dist/index.js`,
          format: 'umd',
          name: 'buck-shared',
        },
        {
          file: `./packages/${file}/dist/index.min.js`,
          format: 'umd',
          name: 'buck-shared',
          plugins: [uglify()],
        },
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: 'ESNext',
            },
          },
          useTsconfigDeclarationDir: true,
        }),
        resolve(),
        commonjs(),
        json(),
      ],
    },
    {
      input: `./packages/${file}/src/index.ts`,
      output: [
        { file: `./packages/${file}/dist/index.cjs.d.ts`, format: 'cjs' },
        { file: `./packages/${file}/dist/index.esm.d.ts`, format: 'esm' },
        { file: `./packages/${file}/dist/index.d.ts`, format: 'umd' },
        { file: `./packages/${file}/dist/index.min.d.ts`, format: 'umd' },
      ],
      plugins: [dts()],
    },
  ];
};

const config = packageFiles.map((path) => createConfig(path)).flat();

export default defineConfig([...config]);
