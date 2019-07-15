import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Back = props => (
  <Svg width={props.size} height={props.size} fill="none" {...props}>
    <Path
      d="M20.75 5L10 15.75 20.75 26.5"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default Back
