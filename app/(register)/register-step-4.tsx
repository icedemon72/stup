import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedSelectDropdown } from '@/components/themed/ThemedSelectDropdown';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { Colors } from '@/constants/Colors';
import { faculties } from '@/constants/Data';
import { Feather, Ionicons } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const RegisterStepFour = () => {
	const { gender, step, setStep, faculty, setFaculty } = useRegisterContext();
	const router = useRouter();

	const handleNext = () => {
		setStep(5);
		router.navigate('/(register)/register-step-5' as RelativePathString);
	}

	const handlePrevious = () => {
		router.replace('/(register)/register-step-3' as RelativePathString);
	}

	return (
		<View style={ styles.container }>
				<ThemedView style={ styles.inputContainer }>
					<RelativeLogo />
					
					<ThemedText style={{ textAlign: 'center' }} type='subtitle'>Ime i datum rodjenja</ThemedText>
					<ThemedText style={{ marginTop: 20, }}>Još samo ovo, na kom fakultetu studiraš?</ThemedText>
					
					<ThemedView 
						lightColor={Colors.light.backgroundSecondary} 
						darkColor={Colors.dark.backgroundSecondary}
						style={{ height: 50, borderRadius: 10 }}
					>
						<ThemedSelectDropdown
							data={faculties}
							onSelect={(selectedItem) => setFaculty(selectedItem)}
							search={true}
							searchPlaceHolder='Pretražite fakultete...'
							renderButton={(selectedItem, isOpened) => {
								return (
									<ThemedView style={styles.dropdownButtonStyle}>
										<ThemedText><Ionicons name="school-outline" size={24} /></ThemedText>
										<ThemedText style={styles.dropdownButtonTxtStyle}>
											{(selectedItem && selectedItem.name) || 'Izaberite fakultet...'}
										</ThemedText>
										<ThemedText><Feather name="chevron-down" size={24} /></ThemedText>
										{/* Fix the chevron... */}
										
									</ThemedView>
								);
							}}
							renderItem={(item, index, isSelected) => {
								return (
									<ThemedView 
										style={{ ...styles.dropdownItemStyle }}
										darkColor={isSelected ? '#D2D9DF' : undefined}
									>
										<ThemedText style={styles.dropdownItemTxtStyle} darkColor={isSelected ? '#D2D9DF' : undefined}>{item.name}</ThemedText>
									</ThemedView>
								);
							}}
							showsVerticalScrollIndicator={true}
							dropdownStyle={styles.dropdownMenuStyle}
						/>
					</ThemedView>
					
					<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
						<NavigationArrows handleNext={handleNext} handlePrevious={handlePrevious} />
					</View>
				</ThemedView>
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center',
	},

	// INPUT
	inputContainer: {
		position: 'relative',
		padding: 15,
		paddingTop: 80,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		minHeight: '75%'
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

	// DROPDOWN
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
});


export default RegisterStepFour;