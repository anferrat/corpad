import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from './svgIcons'

export const CPIconsPack = {
  name: 'cp',
  icons: createIconsMap(),
}

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

const IconProvider = (name) => ({
  toReactElement: (props) => MaterialIcon({ name, ...props }),
})

function MaterialIcon({ name, style, fill, fill2 }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon name={name} height={height} fill={fill} fill2={fill2} style={iconStyle} />
  )
}