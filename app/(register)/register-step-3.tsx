import React, { useEffect, useState } from 'react';
import { useRegisterContext } from '@/components/contexts/RegisterContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { Feather } from '@expo/vector-icons';
import { RelativePathString, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/themed/ThemedView';
import { StepThree } from '@/constants/Validators';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import DateTimePicker from '@react-native-community/datetimepicker';
import HelpButton from '@/components/ui/HelpButton';
import { InfoTexts } from '@/constants/Texts';

const RegisterStepThree = () => {
	const router = useRouter();
	const { gender, step, setStep, dateOfBirth, setDateOfBirth, name, setName } = useRegisterContext();

	const [ showDatePicker, setShowDatePicker ] = useState<boolean>(false);
	const [ nextDisabled, setNextDisabled ] = useState<boolean>(true);

	const handleNext = () => {
		setStep(4);
		router.navigate('/(register)/register-step-4' as RelativePathString);
	}

	const handlePrevious = () => {
		router.replace('/(register)/register-step-2' as RelativePathString);
	}

	const handleDateChange = (e: any, selectedDate: any) => {
		if(e.type === 'set') {
			setDateOfBirth(selectedDate);
		}

		setShowDatePicker(false); 
	};

	const validateForm = () => {
		const success: boolean = StepThree.safeParse({ name, dateOfBirth }).success;

		setNextDisabled(!success || dateOfBirth === null);
	}

	useEffect(() => {
		validateForm();
	}, [ name, dateOfBirth ])

	return (
		<View style={ styles.container }>
				<ThemedView style={ styles.inputContainer }>
					<RelativeLogo />
					<HelpButton title='Pomoć' text={InfoTexts.nameAndDate} />

					<View style={styles.inputContent}>
						<View>
							<View>
								<ThemedText style={{ textAlign: 'center' }} type='subtitle'>
									Ime i datum rodjenja
								</ThemedText>
								<ThemedText style={{ marginVertical: 20, textAlign: 'justify' }} textColor='muted'>
									Skoro smo gotovi! Sada je potrebno da uneseš svoje ime i prezime, kao i datum rodjenja!
								</ThemedText>

							</View>

							<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
								<ThemedText>
									{ 
										gender === 'M' 
										? <MaterialCommunityIcons name='face-man-outline' size={24} />
										: <MaterialCommunityIcons name='face-woman-outline' size={24} />
									}
								</ThemedText>
								<ThemedTextInput
									placeholder='Ime i prezime'
									autoCapitalize='words'
									style={{ flex: 1 }}
									onChangeText={setName}
									value={name}
									backgroundKey='backgroundSecondary'
								/>

							</ThemedView>

							<TouchableOpacity
								onPress={() => setShowDatePicker(true)}
							>
								<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
									<ThemedText>
										<Feather name="calendar" size={24} />
									</ThemedText>
									{
										dateOfBirth ?
											<>
												<ThemedText style={{ flex: 1 }}>
													{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(dateOfBirth)}
												</ThemedText>
												<ThemedText onPress={() =>  setDateOfBirth(null)}>
													<Feather name="x" size={24} />
												</ThemedText>
											</>
											:
											<ThemedText textColor='muted'>
												Izaberite datum rodjenja
											</ThemedText>
									}

								</ThemedView>

							</TouchableOpacity>
						</View>
						
						<View>
							<NavigationArrows nextDisabled={nextDisabled} handleNext={handleNext} handlePrevious={handlePrevious} />
						</View>
					</View>

					{
						showDatePicker && 
						<DateTimePicker
							value={dateOfBirth || new Date()}
							mode="date"
							display="spinner"
							onChange={handleDateChange}
						/>
					}
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
	inputContent: {
		justifyContent: 'space-between',
		flex: 1
	}
});

export default RegisterStepThree;