import React, { useEffect, useState } from 'react';
import { useSurveyContext } from '@/components/contexts/SurveyContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { RelativePathString, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { faculties, genderRules } from '@/constants/Data';
import { ThemedView } from '@/components/themed/ThemedView';
import ThemedDropdown from '@/components/themed/dropdowns/ThemedDropdown';
import ThemedMultiDropdown from '@/components/themed/dropdowns/ThemedMultiDropdown';
import InputContainer from '@/components/ui/InputContainer';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import Checkbox from 'expo-checkbox';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { QuestionRulesValidator } from '@/constants/Validators';

const Rules = () => {
	const router = useRouter();
	const { rules, setRules } = useSurveyContext();

	const [ isAgeChecked, setIsAgeChecked ] = useState<boolean>(true);
	const [ isFacultiesChecked, setIsFacultiesChecked ] = useState<boolean>(true);
	const [ ageLimit, setAgeLimit ] = useState<any[]>(rules.ageLimit ?? [-1, -1]);
	const [ nextDisabled, setNextDisabled ] = useState<boolean>(true);

	const handleNext = () => {
		setRules(prev => ({ ...prev, ageLimit: isAgeChecked ? ageLimit : [-1, 1] }));
		
		router.navigate('/(surveys)/question-add' as RelativePathString);
	}

	const handlePrevious = () => {
		router.navigate('/(surveys)/init' as RelativePathString);
	}

	const handleGenderChange = (selectedGender: any) => {
		setRules(prev => ({ ...prev, gender: selectedGender }));
	}

	const handleFacultiesChange = (selectedFaculties: any) => {
		setIsFacultiesChecked(selectedFaculties.length === 0);
		setRules(prev => ({ ...prev, faculties: selectedFaculties }));
	}

	const handleFacultiesCheckbox = (checked: boolean) => {
		if(!rules.faculties.length) {
			setIsFacultiesChecked(true);
		} else {
			setIsFacultiesChecked(checked);
			if(checked) {
				setRules(prev => ({ ...prev, faculties: [] }));
			}
		}
	}

	const handleAgeChange = (age: any, index: 1 | 0) => {
		const otherIndex = index === 0 ? 1 : 0;
		
		let currentAges = [];
		currentAges[index] = parseInt(age) || -1;
		currentAges[otherIndex] = parseInt(ageLimit[otherIndex]);

		setAgeLimit(currentAges);
	}

	const handleAgeCheckbox = (checked: boolean) => {
		setIsAgeChecked(checked);
	}

	const validateForm = () => {
		const success: boolean = QuestionRulesValidator.safeParse({ gender: rules.gender, ageLimit: isAgeChecked ? [-1, -1] : ageLimit }).success;
		setNextDisabled(!success);
	}
	
	useEffect(() => {
		validateForm();
	}, [ rules.gender, rules.faculties, ageLimit, isAgeChecked ])

	return (
		<InputContainer absolute={<RelativeLogo name='filter' size={54} />}>
			<View>
				<ThemedText type='subtitle' style={{ textAlign: 'center' }}>Filtriraj korisnike</ThemedText>
				<ThemedText textColor='muted' style={{ paddingVertical: 20 }}>Podesi ko može da odgovori na tvoju anketu. Možeš da limitiraš korisnike po polu, fakultetu i godinama.</ThemedText>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedDropdown 
						placeholder='Izaberi tip pitanja'
						data={genderRules} value={rules.gender}
						setValue={handleGenderChange}
						toReturnValue
					/>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<Pressable style={styles.checkboxContainer} onPress={() => handleFacultiesCheckbox(!isFacultiesChecked)}>
						<Checkbox value={isFacultiesChecked} onValueChange={handleFacultiesCheckbox}/>
						<ThemedText>Svi fakulteti</ThemedText>
					</Pressable>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedMultiDropdown 
						placeholder='Izaberi fakultete'
						data={faculties} value={rules.faculties}
						setValue={handleFacultiesChange}
					/>
				</ThemedView>	

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<Pressable style={styles.checkboxContainer} onPress={() => handleAgeCheckbox(!isAgeChecked)}>
						<Checkbox value={isAgeChecked} onValueChange={handleAgeCheckbox} disabled={!faculties.length}  />
						<ThemedText>Bez starosnih granica</ThemedText>
					</Pressable>
				</ThemedView>
				{
					!isAgeChecked &&
					<View style={{ flexDirection: 'row', gap: 5 }}>
						<ThemedView style={[styles.inputField, { flex: 1 }]} backgroundKey='backgroundSecondary'>
							<ThemedTextInput
								placeholder='Od'
								inputMode='numeric'
								style={{ flex: 1 }}
								backgroundKey='backgroundSecondary'
								value={ageLimit[0] === -1 ? '' : ageLimit[0].toString()}
								onChangeText={(text) => handleAgeChange(text.replace(/[^0-9]+$/, ''), 0)}
								maxLength={2}
							/>
						</ThemedView>
						<ThemedView style={[styles.inputField, { flex: 1 }]} backgroundKey='backgroundSecondary'>
							<ThemedTextInput
									placeholder='Do'
									inputMode='numeric'
									style={{ flex: 1 }}
									backgroundKey='backgroundSecondary'
									value={ageLimit[1] === -1 ? '' : ageLimit[1].toString()}
									onChangeText={(text) => handleAgeChange(text.replace(/[^0-9]+$/, ''), 1)}
									maxLength={2}
								/>
						</ThemedView>
					</View>
				}
			</View>

			<View>
				<NavigationArrows handleNext={handleNext} handlePrevious={handlePrevious} nextDisabled={nextDisabled} />
			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	inputField: {
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 50,
		marginBottom: 10,
		gap: 5,
		paddingHorizontal: 10,
		borderRadius: 10
	},
	checkboxContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	}
});
export default Rules;