const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Custom configuration goes here
  resolver: {
    // Add custom extensions if needed
    assetExts: ['png', 'jpg', 'jpeg', 'svg', 'webp'],
    // Include custom source file extensions
    sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json'],
    // Add custom resolver options if needed
    // For example, to handle module paths
    // resolverMainFields: ['browser', 'main'],
  },
  watchFolders: [
    // Include additional folders if necessary
    path.resolve(__dirname, 'assets'),
  ],
  transformer: {
    // Custom transformer configuration if needed
    // Example: custom transformer options
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
