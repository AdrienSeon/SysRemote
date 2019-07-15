import React from 'react'
import Svg, { Rect } from 'react-native-svg'

const Menu = props => (
  <Svg width={props.size} height={props.size} fill="none" {...props}>
    <Rect x={3} y={4} width={15} height={2.573} rx={1} fill={props.color} />
    <Rect x={3} y={14.937} width={25} height={2.573} rx={1} fill={props.color} />
    <Rect x={3} y={25.873} width={21.25} height={2.573} rx={1} fill={props.color} />
  </Svg>
)

export default Menu
