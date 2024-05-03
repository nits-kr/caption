module.exports = function override(config, env) {
    // Modify webpack config here
    if (env === 'production') {
      // Disable sourcemap warnings
      config.devtool = false;
    }
    
    return config;
  };