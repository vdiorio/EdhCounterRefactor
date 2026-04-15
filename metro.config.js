const { getDefaultConfig } = require('expo/metro-config');

// All icons use direct import from "@expo/vector-icons/Ionicons".
// Metro will only bundle Ionicons.ttf — no other icon font is needed.
const config = getDefaultConfig(__dirname);

module.exports = config;
