import React, { useState } from 'react'
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet,  Text,  TouchableOpacity,  View } from 'react-native';
import { faculties } from '@/constants/Data';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedSelectDropdown } from '@/components/themed/ThemedSelectDropdown';

import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import GenderView from '@/components/ui/GenderView'

const Register: React.FC = () => {
	const [ gender, setGender ] = useState<string>('M');
	const [ faculty, setFaculty ] = useState<string>(''); // This should be interface with name and id
	const [ passwordShown, setPasswordShown ] = useState<boolean>(false);
	const [ dateOfBirth, setDateOfBirth ] = useState(new Date());

	const [ hasDateChanged, setHasDateChanged ] = useState<boolean>(false);
	const [ showDatePicker, setShowDatePicker ] = useState<boolean>(false);

	const handleDateChange = (e: any, selectedDate: any) => {
		if(e.type === 'set') {
			setHasDateChanged(true);
			setDateOfBirth(selectedDate);
		}

		setShowDatePicker(false); 
	};

	return (
		<View style={ styles.container }>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
				<ScrollView>
					<ThemedView style={ styles.inputContainer }>
						<ThemedText style={{ textAlign: 'center' }} type='subtitle'>Registracija</ThemedText>
						
						<ThemedView style={styles.genderContainer}>
							<GenderView gender='M' selectedGender={gender} onPress={() => setGender('M')} />
							<GenderView gender='F' selectedGender={gender} onPress={() => setGender('F')} />
						</ThemedView>
						<ThemedText style={{ textAlign: 'center', marginBottom: 10 }} textColor='muted'>Pol</ThemedText>

						{/* E-mail */}
						<ThemedView 
							style={ styles.inputField }
							lightColor={Colors.light.backgroundSecondary} 
							darkColor={Colors.dark.backgroundSecondary}
						>
							<ThemedText>
								<Feather name="mail" size={24} />
							</ThemedText>
							<ThemedTextInput
								placeholder='E-adresa'
								autoComplete='email'
								inputMode='email'
								autoCapitalize='none'
								style={{ flex: 1 }}
								lightColor={Colors.light.backgroundSecondary} 
								darkColor={Colors.dark.backgroundSecondary}
							/>

						</ThemedView>

						{/* Password */}
						<ThemedView 
							style={ styles.inputField } 
							lightColor={Colors.light.backgroundSecondary} 
							darkColor={Colors.dark.backgroundSecondary}
						>
							<ThemedText>
								<Feather name="lock" size={24} />
							</ThemedText>

							<ThemedTextInput
								placeholder='Lozinka'
								autoComplete='password'
								inputMode='text'
								secureTextEntry={ !passwordShown }
								autoCapitalize='none'
								lightColor={Colors.light.backgroundSecondary} 
								darkColor={Colors.dark.backgroundSecondary}
								style={{ flex: 1 }}
							/>

							<ThemedText onPress={() => setPasswordShown((prev) => !prev)}>
								{ !passwordShown ? <Feather name="eye" size={24}  /> : <Feather name="eye-off" size={24} /> }
							</ThemedText>
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
										hasDateChanged ? 
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
								value={dateOfBirth}
								mode="date"
								display="spinner"
								onChange={handleDateChange}
							/>
						}

						{/* Faculty dropdown */}
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

						<TouchableOpacity style={ styles.registerButton }>
							<Text style={{ textAlign: 'center' }}>Registruj se!</Text>
						</TouchableOpacity>

						<View style={{ flexDirection: 'row', display: 'flex', gap: 4, justifyContent: 'center' }}>
							<ThemedText style={{ fontSize: 14 }}>Imaš nalog?</ThemedText>
							<ThemedText style={{ textDecorationLine: 'underline', fontSize: 14 }}>Prijavi se!</ThemedText>
						</View>

						
					</ThemedView>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center'
	},
	
	// GENDER
	genderContainer: {
		marginTop: 20,
		paddingHorizontal: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',	
		alignItems: 'center',
		gap: 10,
	},
	genderItem: {
		padding: 60,
		borderRadius: 10,
		position: 'relative'
	},
	genderField: { 
		flex: 1,
		gap: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		position: 'absolute',
		top: 3,
		left: 3
	},

	// INPUT
	inputContainer: {
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

	// BUTTON
	registerButton: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
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


export default Register;