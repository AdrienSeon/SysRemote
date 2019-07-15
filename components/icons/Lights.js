import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Lights = props => (
  <Svg width={props.size} height={props.size} fill="none" {...props}>
    <Path
      d="M15.5 27C10 27 10 22 10 22h11s0 5-5.5 5zM14.5 4a1 1 0 1 1 2 0v7h-2V4z"
      fill={props.color}
      fillOpacity={0.5}
    />
    <Path d="M27 21H4s.523-11 11.5-11S27 21 27 21z" fill={props.color} />
  </Svg>
)

export default Lights
