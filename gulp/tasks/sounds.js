export const sounds = () => {
    return app.gulp
      .src(app.path.src.sounds)
      .pipe(app.gulp.dest(app.path.build.sounds))
      .pipe(app.plugins.browsersync.stream());
  };