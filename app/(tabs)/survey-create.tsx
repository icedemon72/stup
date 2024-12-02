import { ThemedSelectDropdown } from '@/components/themed/ThemedSelectDropdown';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import { Colors } from '@/constants/Colors';
import { faculties } from '@/constants/Data';
import { Feather, Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const SurveyCreate: React.FC = () => {
	const [ questionNumber, setQuestionNumber ] = useState<number>();
	const [ selectedFaculties, setSelectedFaculties ] = useState<string | number[]>('any');
	const [ selectedGender, setSelectedGender ] = useState<string>('any');
	const [ selectedAgeSpan, setSelectedAgeSpan ] = useState<number[]>([-1, -1]);


	
	return (
		<View style={ styles.container }>
			<ThemedView style={ styles.inputContainer }>
				<ThemedText style={{ textAlign: 'center', marginBottom: 10 }} type='subtitle'>Napravi novi STUPitnik</ThemedText>
			
				<ThemedView 
					style={ styles.inputField }
					lightColor={Colors.light.backgroundSecondary} 
					darkColor={Colors.dark.backgroundSecondary}
				>
					<ThemedText>
						<MaterialIcons name="numbers" size={24} />
					</ThemedText>
					<ThemedTextInput
						placeholder='Broj pitanja u STUPitniku'
						inputMode='numeric'
						onChangeText={(text) => setQuestionNumber(parseInt(text))}
						autoFocus
						autoCapitalize='none'
						lightColor={Colors.light.backgroundSecondary} 
						darkColor={Colors.dark.backgroundSecondary}
						style={{ flex: 1 }}
					/>
				</ThemedView>
			

			</ThemedView>
		</View>	
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center'
	},
	inputContainer: {
		padding: 15,
		paddingTop: 80,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		height: '75%'
	},
	inputField: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		marginBottom: 10,
		gap: 5,
		paddingHorizontal: 10,
		borderRadius: 10
	},


	dropdownButtonStyle: {
		height: 50,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		gap: 5,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontWeight: '500',
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500'
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
})

export default SurveyCreate;