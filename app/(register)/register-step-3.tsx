import React, { useState } from 'react';
import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/themed/ThemedView';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterStepThree = () => {
	const router = useRouter();
	const { gender, step, setStep, dateOfBirth, setDateOfBirth, name, setName } = useRegisterContext();

	const [ hasDateChanged, setHasDateChanged ] = useState<boolean>(false);
	const [ showDatePicker, setShowDatePicker ] = useState<boolean>(false);

	const handleNext = () => {
		setStep(4);
		router.navigate('/(register)/register-step-4' as RelativePathString);
	}

	const handlePrevious = () => {
		router.replace('/(register)/register-step-2' as RelativePathString);
	}

	const handleDateChange = (e: any, selectedDate: any) => {
		if(e.type === 'set') {
			setHasDateChanged(true);
			setDateOfBirth(selectedDate);
		}

		setShowDatePicker(false); 
	};

	return (
		<View style={ styles.container }>
				<ThemedView style={ styles.inputContainer }>
					<RelativeLogo />
					
					<ThemedText style={{ textAlign: 'center' }} type='subtitle'>Ime i datum rodjenja</ThemedText>
					<ThemedText style={{ marginTop: 20, }}>Skoro smo gotovi! Potrebno je da uneseš svoje ime i prezime, kao i datum rodjenja!</ThemedText>
					
					<ThemedView
						style={styles.inputField}
						lightColor={Colors.light.backgroundSecondary}
						darkColor={Colors.dark.backgroundSecondary}
					>
						<ThemedText>
							<MaterialCommunityIcons name={gender === 'M' ? 'face-man-outline' : 'face-woman-outline' } size={24} />
						</ThemedText>
						<ThemedTextInput
							placeholder='Ime i prezime'
							autoCapitalize='words'
							style={{ flex: 1 }}
							onChangeText={setName}
							value={name}
							lightColor={Colors.light.backgroundSecondary}
							darkColor={Colors.dark.backgroundSecondary}
						/>

					</ThemedView>
					
					<TouchableOpacity
							onPress={() => setShowDatePicker(true)}
					>
						<ThemedView 
							style={ styles.inputField }
							lightColor={Colors.light.backgroundSecondary} 
							darkColor={Colors.dark.backgroundSecondary}
						>
							<ThemedText>
								<Feather name="calendar" size={24} />
							</ThemedText>
							{
								dateOfBirth ? 
								<>
									<ThemedText style={{ flex: 1 }}>
										{ new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(dateOfBirth) }
									</ThemedText>
									<ThemedText onPress={() => setHasDateChanged(false)}>
										<Feather name="x" size={24} />
									</ThemedText>
								</>
								:
								<ThemedText lightColor={Colors.light.muted} darkColor={Colors.dark.muted}>
									Izaberite datum rodjenja
								</ThemedText> 
							}
								
						</ThemedView>

					</TouchableOpacity>

					{
						showDatePicker && 
						<DateTimePicker
							value={new Date()}
							mode="date"
							display="spinner"
							onChange={handleDateChange}
						/>
					}

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
});

export default RegisterStepThree;