#!/usr/bin/env node

const path = require("path");
const cwd = process.cwd();
const argv = process.argv;
const output = path.join(cwd, "node_modules/.tmp/server.cjs");
const script = require.resolve(path.join(cwd, argv[2]));

// remove this script from CLI
process.argv = process.argv.filter((_, i) => i !== 2);

const vm = require("vm");
const Module = require("module");
const esbuild = require("esbuild");
const resolve = require("@esbuild-plugins/node-resolve");

const options = {
  entryPoints: [script],
  platform: "node",
  target: "node14",
  format: "cjs",
  write: false,
  bundle: true,
  outfile: output,
  plugins: [
    resolve.default({
      extensions: [".ts", ".js"],
      async onNonResolved(request) {
        if (request.startsWith("~/")) {
          request = path.join(cwd, "source", request.slice(2));
          request = await resolve.resolveAsync(request, {});

          return { path: request };
        }
      },
      onResolved(resolved) {
        if (resolved.includes("node_modules")) {
          return { external: true };
        }
        return resolved;
      },
    }),
  ],
};

esbuild.build(options).then((bundle) => {
  const _dirname = cwd;
  const _filename = cwd + "/" + script;
  const _module = new Module(_dirname);
  const code = bundle.outputFiles[0].contents;

  _module.filename = script;
  _module.paths = Module._nodeModulePaths(_dirname);

  Object.assign(global, {
    __filename: _filename,
    __dirname: _dirname,
    exports: _module.exports,
    module: _module,
    require: _module.require.bind(_module),
  });

  vm.runInThisContext(Buffer.from(code).toString(), {
    filename: _filename,
  });
});
