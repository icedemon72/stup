import React from 'react';
import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Link, RelativePathString, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RelativeLogo from '@/components/ui/RelativeLogo';
import InputContainer from '@/components/ui/InputContainer';

const SurveyCreate = () => {
	const { session } = useSession();
	const router = useRouter();

	return (
		<InputContainer absolute={<RelativeLogo />}>
			<ThemedText style={{ textAlign: 'center', marginBottom: 10 }} type='subtitle'>Napravi novi STUPitnik</ThemedText>
			<ThemedText textColor='muted'>Započećeš proces kreiranja STUPitnika, da li si { session!.gender === 'M' ? 'spreman' : 'spremna' } za to?</ThemedText>
		
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<TouchableOpacity style={ styles.button } onPress={() => router.navigate('/(surveys)/init')}>
					<Text style={{ textAlign: 'center' }}>DA, { session!.gender === 'M' ? 'spreman' : 'spremna' } SAM!</Text>
				</TouchableOpacity>

				<Link href={'/(tabs)' as RelativePathString}>
					<ThemedText textColor='muted' style={{ textAlign: 'center' }}>
						Ne, nisam
					</ThemedText>
				</Link>
			</View>
			
		</InputContainer>
	);
}

const styles = StyleSheet.create({
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