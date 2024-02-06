// Import main module
import gulp from "gulp";

// Import path
import { path } from "./gulp/config/path.js";

// Import plugins
import { plugins } from "./gulp/config/plugins.js";

// Passing the changes to the global variable
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { modules } from "./gulp/tasks/modules.js";
import { images } from "./gulp/tasks/images.js";
import { favicon } from "./gulp/tasks/favicon.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";
import { sprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// File watcher
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.favicon, favicon);
}

// Sequential fonts processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

// const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, modules, images, favicon, sprite),
); // Add function create sprite

// Building task execution scenarios
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Export scripts
export { dev };
export { build };
export { deployZIP }; // Use 'npm run zip' to create zip
export { deployFTP };
export { sprite }; // Use 'npm run sprite' to create svg sprite

// Default script execution
gulp.task("default", dev);
