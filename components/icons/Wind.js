import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Wind = props => (
  <Svg width={props.size} height={props.size} fill="none" {...props}>
    <path
      d="M4 19h10.371c3.629 0 5.4 3.311 3.629 5.983-1.771 2.672-5.326 1.747-6.315 0M4 12.658h5.371c3.629 0 5.4-3.311 3.629-5.983-1.771-2.672-5.326-1.747-6.315 0"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 15.636h17.601c4.533 0 6.746-3.892 4.533-7.032s-6.654-2.053-7.889 0"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default Wind
