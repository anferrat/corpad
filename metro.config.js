const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const MetroConfig = require('@ui-kitten/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const evaConfig = {
    evaPackage: '@eva-design/eva',
    customMappingPath: './src/styles/mapping.json',
};

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), MetroConfig.create(evaConfig));