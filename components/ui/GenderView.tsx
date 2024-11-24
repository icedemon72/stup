import { Feather } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TouchableOpacityProps } from 'react-native-gesture-handler'

type GenderViewProps = TouchableOpacityProps & {
	gender: string;
	selectedGender: string;

}

const GenderView: React.FC<GenderViewProps> = ({ gender, selectedGender, onPress, ...props }) => {
	const isSelected: boolean = selectedGender === gender;
	
	return (
		<TouchableOpacity
			style={{ 
				backgroundColor: gender === 'M' ? '#77889A' : '#d0dae6', 
				filter: isSelected ? 'none' : 'grayscale(1)',  
				...styles.genderItem,
				padding: isSelected ? 60 : 55,
				borderWidth: isSelected ? 5 : 0,
			}}
			onPress={onPress}
		>
			<View style={ styles.genderField }>
				<Text>
					<Feather name={isSelected ? "check-circle" : "circle"} size={18} /> 
				</Text>
				<Text style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>{ gender === 'M' ? 'Muški' : 'Ženski'} </Text>
			</View>
			<Image
					style={{ 
						...styles.genderImage,
						height: isSelected ? 90 : 80, 
						width: isSelected ? 90 : 80
					}}
					source={gender === 'M' ? require(`@/assets/images/students/male-min.png`) : require(`@/assets/images/students/female-min.png`)}
				/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	genderItem: {
		borderRadius: 10,
		position: 'relative',
		borderColor: '#ff9f00'
	},
	genderField: { 
		flex: 1,
		gap: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		position: 'absolute',
		top: 3,
		left: 3
	},
	genderImage: {
		position: 'absolute', bottom: 0, right: 0
	}
});

export default GenderView


// Original component:
// <TouchableOpacity 
// 	style={{ backgroundColor: '#77889A', filter: gender === 'M' ? 'none' : 'grayscale(1)', ...styles.genderItem }}
// 	onPress={() => setGender('M')}
// >
// 	<View style={ styles.genderField }>
// 		<Text>
// 			<Feather name={gender === 'M' ? "check-circle" : "circle"} size={18} /> 
// 		</Text>
// 		<Text style={{ fontWeight: gender !== 'M' ? 'normal' : 'bold' }}>Muški</Text>
// 	</View>
// 		<Image
// 			style={{ position: 'absolute', bottom: 0, right: 0, height: 90, width: 90 }}
// 			source={require("@/assets/images/students/male-min.png")}
// 		/>
// </TouchableOpacity>