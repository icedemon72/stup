import React from 'react'
import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText';
import InputContainer from '@/components/ui/InputContainer';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { getFirebaseDate } from '@/scripts/getFirebaseDate';
import { ThemedView } from '@/components/themed/ThemedView';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { faculties } from '@/constants/Data';

const UserProfile = () => {
	const { session } = useSession();
	
	return (
		<InputContainer absolute={<RelativeLogo name='person-outline' size={48} />}>
			<View>
				<ThemedText style={styles.title} type='subtitle'>Moj profil</ThemedText>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText><Feather name="mail" size={24} /></ThemedText>
					<ThemedText>{ session!.email }</ThemedText>
				</ThemedView>	

				<TouchableOpacity>
					<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
						<ThemedText><Feather name="lock" size={24} /></ThemedText>
						<ThemedText style={{ flex: 1 }}>••••••</ThemedText>
						<ThemedText><Feather name="edit" size={24} /></ThemedText>
					</ThemedView>	
				</TouchableOpacity>
				
				<TouchableOpacity>
					<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
						<ThemedText>
							{ 
								session!.gender === 'M' ?
								<MaterialCommunityIcons name='face-man-outline' size={24} /> :
								<MaterialCommunityIcons name='face-woman-outline' size={24} />
							}
						</ThemedText>
						<ThemedText style={{ flex: 1 }}>{ session!.name }</ThemedText>
						<ThemedText><Feather name="edit" size={24} /></ThemedText>
					</ThemedView>
				</TouchableOpacity>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText>
						{ 
							session!.gender === 'M' ?
							<Ionicons name='male' size={24} /> :
							<Ionicons name='female' size={24} />
						}
					</ThemedText>
					<ThemedText>{ session!.gender === 'M' ? 'Muški' : 'Ženski' } pol</ThemedText>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
				<ThemedText><Ionicons name='school-outline' size={24} /></ThemedText>
					<ThemedText>
						{/* @ts-ignore */}
						{ faculties[session!.faculty!.value].label }
					</ThemedText>
				</ThemedView>

				<TouchableOpacity>
					<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
						<ThemedText>
							<Feather name="calendar" size={24} />
						</ThemedText>
						<ThemedText style={{ flex: 1 }}>
							{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(getFirebaseDate(session!.dateOfBirth!))}
						</ThemedText>
						<ThemedText><Feather name="edit" size={24} /></ThemedText>
					</ThemedView>
				</TouchableOpacity>


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
	title: {
    textAlign: 'center',
    paddingBottom: 20
  }
});

export default UserProfile;