const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const nudsPath = path.resolve(__dirname, '../project-ignition-library-nuds');
const projectNodeModules = path.resolve(__dirname, 'node_modules');

config.watchFolders = [nudsPath];

config.resolver.nodeModulesPaths = [
  projectNodeModules,
];

config.resolver.extraNodeModules = new Proxy(
  {
    'react': path.resolve(projectNodeModules, 'react'),
    'react-native': path.resolve(projectNodeModules, 'react-native'),
    'react-native-svg': path.resolve(projectNodeModules, 'react-native-svg'),
    'expo-font': path.resolve(projectNodeModules, 'expo-font'),
  },
  {
    get: (target, name) => {
      if (name in target) return target[name];
      return path.join(projectNodeModules, String(name));
    },
  }
);

config.resolver.blockList = [
  new RegExp(path.resolve(nudsPath, 'node_modules', 'react') + '/.*'),
  new RegExp(path.resolve(nudsPath, 'node_modules', 'react-native') + '/.*'),
  new RegExp(path.resolve(nudsPath, 'node_modules', 'react-native-svg') + '/.*'),
];

module.exports = config;
