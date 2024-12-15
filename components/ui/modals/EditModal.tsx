import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type EditModalProps = {
	title?: string;
	value?: any;
	index?: number
	saveFunc: any;
	closeFunc: () => void;
}

const EditModal = ({
	title,
	value,
	index,
	saveFunc,
	closeFunc
}: EditModalProps) => {

	const [ currentValue, setCurrentValue ] = useState<any>(value);

	const handleSave = () => {
		saveFunc(currentValue, index);
		closeFunc();
	}
	
	return (
		<Modal
			animationType='fade'
			visible
			transparent
			onRequestClose={closeFunc}
			statusBarTranslucent
		>
			<View style={styles.container}>
				<ThemedView style={styles.card}>
					<ScrollView keyboardShouldPersistTaps='handled'>
						<View style={styles.cardContent}>
							<ThemedText type='subtitle' textColor='muted' style={styles.title}>{ title }</ThemedText>
							<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
								<ThemedTextInput
									placeholder='Odgovor'
									inputMode='text'
									autoCapitalize='sentences'
									style={{ flex: 1 }}
									value={currentValue}
									onChangeText={setCurrentValue}
									backgroundKey='backgroundSecondary'
								/>
							</ThemedView>
							<View style={styles.actions}>
								<TouchableOpacity style={styles.button}  onPress={closeFunc}>
									<ThemedText style={{ textAlign: 'center' }}>
										<Feather name="x" size={24} />
									</ThemedText>
								</TouchableOpacity>
								{/* TODO: CHANGE ORANGE */}
								<TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={handleSave}>
									<ThemedText style={{ textAlign: 'center' }}>
										<Ionicons name="checkmark-sharp" size={24} />
									</ThemedText>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</ThemedView>
			</View>

		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.9)'
	},
	card: {
		position: 'relative',
		borderRadius: 20,
		maxHeight: '80%',
		width: '90%',
	},
	cardContent: {
		paddingVertical: 50,
		paddingHorizontal: 25
	},
	title: {
		textAlign: 'center',
		paddingBottom: 30,
	},
	inputField: {
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 50,
		marginBottom: 10,
		gap: 5,
		paddingHorizontal: 10,
		borderRadius: 10
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20
	},
	button: {
		width: 70, 
		height: 70,
		borderRadius: 1000,
		justifyContent: 'center', 
		alignItems: 'center'
	},
});

export default EditModal;