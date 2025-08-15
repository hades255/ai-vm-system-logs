const path = require('path');

module.exports = function override(config, env) {
  // Add any custom webpack configurations here
  
  // Example: Add path aliases
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  };

  // Example: Customize webpack rules if needed
  // config.module.rules.push({
  //   test: /\.svg$/,
  //   use: ['@svgr/webpack'],
  // });

  return config;
}; 