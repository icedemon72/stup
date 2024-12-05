import React from 'react';
import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Link, RelativePathString } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RelativeLogo from '@/components/ui/RelativeLogo';

const SurveyCreate = () => {
	const { session } = useSession();

	return (
		<View style={ styles.container }>
			<ThemedView style={ styles.inputContainer }>
				<RelativeLogo />
				<ThemedText style={{ textAlign: 'center', marginBottom: 10 }} type='subtitle'>Napravi novi STUPitnik</ThemedText>
				<ThemedText textColor='muted'>Započećeš proces kreiranja STUPitnika, da li si { session!.gender === 'M' ? 'spreman' : 'spremna' } za to?</ThemedText>
			
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Link asChild href={'/(surveys)/init' as RelativePathString}>
						<TouchableOpacity style={ styles.button }>
							<Text style={{ textAlign: 'center' }}>DA, { session!.gender === 'M' ? 'spreman' : 'spremna' } SAM!</Text>
						</TouchableOpacity>
					</Link>

					<Link asChild href={'/(tabs)' as RelativePathString}>
						<ThemedText textColor='muted' style={{ textAlign: 'center' }}>
							Ne, nisam
						</ThemedText>
					</Link>
				</View>
			</ThemedView>
		</View>	
	);
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