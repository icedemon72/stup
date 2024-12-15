import React from 'react'
import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText';
import InputContainer from '@/components/ui/InputContainer';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { StyleSheet, View } from 'react-native';
import { getFirebaseDate } from '@/scripts/getFirebaseDate';
import { ThemedView } from '@/components/themed/ThemedView';
import { Feather } from '@expo/vector-icons';

const UserProfile = () => {
	const { session } = useSession();
	
	return (
		<InputContainer absolute={<RelativeLogo name='person-outline' size={48} />}>
			<View>
				<ThemedText>{ session!.name }</ThemedText>
				<ThemedText>{ session!.gender }</ThemedText>
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText>
						<Feather name="calendar" size={24} />
					</ThemedText>
						<ThemedText style={{ flex: 1 }}>
							{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(getFirebaseDate(session!.dateOfBirth!))}
						</ThemedText>
				</ThemedView>

				<ThemedText>{ session!.faculty?.value }</ThemedText>
				<ThemedText>{ session!.email }</ThemedText>
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
});

export default UserProfile;