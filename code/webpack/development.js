import browserSync from "browser-sync";
import cp from "child_process";
import log from "fancy-log";
import path from "path";
import webpack from "webpack";
import makeMiddleware from "./makeMiddleware";

let server;

function runServer(serverPath, cb) {
  if (server) {
    server.kill("SIGTERM");
  }

  server = cp.spawn("node", [serverPath], {
    env: Object.assign({ NODE_ENV: "development" }, process.env),
    stdio: ["pipe", process.stdout, process.stderr, "ipc"]
  });

  server.on("message", data => {
    if (data.started) {
      cb(data.port);
    }
  });
}

function runProxy(middleware, port) {
  browserSync({
    port: 3000,
    notify: false,
    open: false,
    proxy: {
      target: `localhost:${port}`,
      // ws: true // in case websockets will be used
      middleware
    },

    // No need to watch '*.js' here, webpack will take care of it
    // for us, including full page reloads if HMR won't work.
    // (Not convinced we _really_ need BrowserSync to watch things, but anyway...
    files: ["build/public/*.css"]
  });
}

let initialBuild = true;
function onServerStarted(middleware, port) {
  if (initialBuild) {
    initialBuild = false;
    runProxy(middleware, port);
  }
}

export default function development(serverConfig, clientConfig) {
  // run frontend, after initial build run server
  makeMiddleware(clientConfig).then(middleware => {
    log("Starting server build");
    // watch server-side code for changes
    webpack(serverConfig).watch(
      {
        ignored: /node_modules/
      },
      (err, stats) => {
        if (err) {
          return log("Error\n", err);
        }

        if (stats.hasErrors()) {
          return log("Error\n", stats.toString("errors-only"));
        }

        log(
          "[webpack]\n",
          stats.toString({
            colors: true,
            version: false,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            children: false
          })
        );

        const { output } = serverConfig;
        const serverPath = path.join(output.path, "server.js");
        runServer(serverPath, (port) => onServerStarted(middleware, port));
        return log("Server is built and starting");
      }
    );
  });

  process.on("exit", () => {
    if (server) {
      server.kill("SIGTERM");
    }
  });
}
