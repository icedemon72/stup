import React from 'react';
import { ThemedText } from '@/components/themed/ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Survey } from '@/types';
import { ThemedView } from '@/components/themed/ThemedView';
import { Entypo, Feather } from '@expo/vector-icons';
import { Router } from 'expo-router';

type SurveyItemProps = {
	item: Survey;
	router?: Router;
	inReseni?: boolean;
}

const SurveyItem = ({ item, router, inReseni = false }: SurveyItemProps) => {
	const handleNavigate = () => {
		if(router) {
			router.navigate({
				pathname: '/(surveys)/survey-info',
				params: { surveyId: item.id }
			});
		}
	}
	
	return (
		<ThemedView backgroundKey='globalBackground' style={styles.container}>
			<View style={styles.content}>
				<View style={{ flex: 1 }}>
					<ThemedText type='subtitle'>{ item.title }</ThemedText>
					<ThemedText textColor='muted'>{ item.description }</ThemedText>
				</View>
				<TouchableOpacity style={{ marginTop: 10 }}>
					<ThemedText textColor='muted'>
						<Entypo name="dots-three-vertical" size={18} />
					</ThemedText>
				</TouchableOpacity>
			</View>
			
			<View style={styles.bottomContainer}>
				{
					!inReseni && (
						<TouchableOpacity 
							style={styles.button} 
							onPress={handleNavigate}
						>
							<ThemedText style={{ textAlign: 'center', }}>Otvori STUPitnik</ThemedText>
						</TouchableOpacity>
					)
				}
				<View style={styles.info}>
					<ThemedText style={styles.users} type='defaultSemiBold' textColor='muted'>
						<Feather name="user-check" size={24} />
						{ item.answeredBy!.length }
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
		marginBottom: 20,
		position: 'relative',
	},
	completed: {
		position: 'absolute',
		top: 10,
		left: 20,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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