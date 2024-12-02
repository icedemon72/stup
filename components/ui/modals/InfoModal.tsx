import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { InfoModalProps } from '@/types/componentTypes';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface InfoModalExtendedProps extends InfoModalProps {
	closeFunc: () => void,
}

const InfoModal = ({ title = 'Info', subtitle, text = '', closeFunc }: InfoModalExtendedProps) => {
	return (
		<Modal
			animationType="fade"
			visible={true}
			transparent={true}
			onRequestClose={() => closeFunc()}
		>
			<View style={styles.container}>
				<ThemedView style={styles.card}>
					<ScrollView >
						<View style={styles.infoIcon}>
							<ThemedText style={{ textAlign: 'center' }} textColor='muted'>
								<Feather name="info" size={24} />
							</ThemedText>
						</View>

						<View style={styles.cardContent}>
							<ThemedText style={{ textAlign: 'center' }} type='title'>{ title }</ThemedText>
						
							{ 
								subtitle && 
								<ThemedText style={{ textAlign: 'center', marginTop: 20 }} type='subtitle'>{ subtitle }</ThemedText>
							}

							<ThemedText style={{ textAlign: 'justify', marginTop: 20, fontSize: 14 }}>{ text }</ThemedText>
							
							<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
								<TouchableOpacity style={styles.button} onPress={closeFunc}>
									<ThemedText style={{ textAlign: 'center' }}>
										<Feather name="check" size={24} />
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
	infoIcon: {
		position: 'absolute',
		right: 25,
		top: 25
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.9)'
	},
	card: {
		position: 'relative',
		borderRadius: 50,
		maxHeight: '80%',
		width: '90%',
	},
	cardContent: {
		paddingVertical: 50,
		paddingHorizontal: 25
	},
	button: {
		width: 70,
		height: 70,
		borderRadius: 100,
		justifyContent: 'center',
		backgroundColor: 'orange' // change this
	}
});

export default InfoModal;