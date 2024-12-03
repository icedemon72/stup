import { useSession } from '@/components/contexts/AuthContext';
import { ThemedSelectDropdown } from '@/components/themed/ThemedSelectDropdown';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { Colors } from '@/constants/Colors';
import { faculties } from '@/constants/Data';
import { Feather, Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SurveyCreate: React.FC = () => {
	const { session } = useSession();

	return (
		<View style={ styles.container }>
			<ThemedView style={ styles.inputContainer }>
				<RelativeLogo />
				<ThemedText style={{ textAlign: 'center', marginBottom: 10 }} type='subtitle'>Napravi novi STUPitnik</ThemedText>
				<ThemedText textColor='muted'>Započećeš proces kreiranja STUPitnika, da li si { session!.gender === 'M' ? 'spreman' : 'spremna' } za to?</ThemedText>
			
				<TouchableOpacity style={ styles.button }>
					<Text style={{ textAlign: 'center' }}>DA, { session!.gender === 'M' ? 'spreman' : 'spremna' } SAM!</Text>
				</TouchableOpacity>
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
	button: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	}
})

export default SurveyCreate;