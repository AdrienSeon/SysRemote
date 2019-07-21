import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path } from 'react-native-svg'

class Temperature extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} viewBox="0 0 32 32" fill="none">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8.5 3c2.053.042 3.186 1.856 3.25 3.028.064 1.172 0 13.117 0 13.117s2.436 1.345 2.5 4.54c.065 3.196-2.75 5.109-5.5 5.046C6 28.666 3.02 26.796 3 23.684c-.02-3.11 2.25-4.54 2.25-4.54s.02-11.678 0-13.117C5.23 4.588 6.448 2.96 8.5 3z"
						stroke={this.props.color}
						strokeWidth={2}
						strokeLinecap="round"
					/>
					<Path
						d="M8 16a1 1 0 0 1 1-1h2v2H9a1 1 0 0 1-1-1zM8 12a1 1 0 0 1 1-1h2v2H9a1 1 0 0 1-1-1zM8 8a1 1 0 0 1 1-1h2v2H9a1 1 0 0 1-1-1z"
						fill={this.props.color}
						fillOpacity={0.5}
					/>
					<Path
						d="M22 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
						stroke={this.props.color}
						strokeWidth={2}
					/>
					<Path
						d="M16 15.505c-.552-.003-1-.453-1-1.005v-.844a.995.995 0 0 1 1-.996l1.8.008v2.845l-1.8-.008zM18.71 19.296a1.006 1.006 0 0 1-1.417-.003l-.597-.597a.995.995 0 0 1 .003-1.411l1.279-1.268 2.011 2.012-1.279 1.267zM28 12.495c.552.003 1 .453 1 1.005v.845a.995.995 0 0 1-1 .995l-1.8-.008v-2.845l1.8.008zM25.29 8.704a1.005 1.005 0 0 1 1.417.003l.597.597a.995.995 0 0 1-.003 1.411l-1.279 1.268-2.011-2.012 1.279-1.267zM27.296 17.29a1.005 1.005 0 0 1-.003 1.417l-.597.597a.995.995 0 0 1-1.411-.003l-1.268-1.279 2.012-2.011 1.267 1.279zM16.704 10.713a1.006 1.006 0 0 1 .003-1.418l.597-.597a.995.995 0 0 1 1.411.003l1.268 1.28-2.012 2.01-1.267-1.278zM23.505 20c-.003.552-.453 1-1.005 1h-.845a.995.995 0 0 1-.995-1l.008-1.8h2.845l-.009 1.8zM20.495 8c.003-.552.453-1 1.005-1h.845c.552 0 .998.448.995 1l-.008 1.8h-2.845l.009-1.8z"
						fill={this.props.color}
						fillOpacity={0.5}
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default Temperature
