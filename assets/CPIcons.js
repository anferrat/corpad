import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from './svgIcons'
import { primary, basic, warning, danger, success, control } from '../src/styles/colors'

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

//never mind this
function getColor(color) {
  if (color === 'basic')
    return basic
  else if (color === 'primary')
    return primary
  else if (color === 'control')
    return control
  else if (color === 'warning')
    return warning
  else if (color === 'danger')
    return danger
  else if (color === 'success')
    return success
  else return color
}

const IconProvider = (name) => ({
  toReactElement: (props) => MaterialIcon({ name, ...props }),
})

function MaterialIcon({ name, style, fill, fill2 }) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <Icon name={name} height={height} fill={fill ?? tintColor} fill2={fill2} style={iconStyle} />
  )
}