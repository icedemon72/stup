import React from 'react';
import { ThemedText } from '@/components/themed/ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Survey } from '@/types';
import { ThemedView } from '@/components/themed/ThemedView';
import { Feather } from '@expo/vector-icons';
import { Router } from 'expo-router';

type SurveyItemProps = {
	item: Survey;
	router: Router;
}


const SurveyItem = ({ item, router }: SurveyItemProps) => {
	return (
		<ThemedView backgroundKey='globalBackground' style={styles.container}>
			<ThemedText type='subtitle'>{ item.title }</ThemedText>
			<ThemedText textColor='muted'>{ item.description }</ThemedText>
			
			<View style={styles.bottomContainer}>
				<TouchableOpacity 
					style={styles.button} 
					onPress={() => router.navigate({
						pathname: '/(surveys)/survey-info',
						params: { surveyId: item.id }
					})}
				>
					<ThemedText style={{ textAlign: 'center', }}>Otvori STUPitnik</ThemedText>
				</TouchableOpacity>
				<View style={styles.info}>
					<ThemedText style={styles.users} type='defaultSemiBold' textColor='muted'>
						<Feather name="user-check" size={24} />
						0
					</ThemedText>
					{/* <ThemedText textColor='muted'>
						<Ionicons name='school-outline' size={24} />
						{ item.createdBy.faculty.name }
					</ThemedText> */}
				</View>
			</View>

		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 20
	},
	bottomContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	button: {
		flex: 1,
		marginVertical: 20,
		padding: 10,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		flex: 1
	},
	users: {
		borderRadius: 10,
		borderWidth: 1,
		padding: 5,
		flexDirection: 'row', 
		gap: 10
	}
});

export default SurveyItem;