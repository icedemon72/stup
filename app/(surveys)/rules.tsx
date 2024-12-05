import InputContainer from '@/components/ui/InputContainer';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { RelativePathString, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const Rules = () => {
	const router = useRouter();
	
	const handleNext = () => {
		router.navigate('/(surveys)/question-add' as RelativePathString);
	}

	
	const handlePrevious = () => {
		router.navigate('/(surveys)/init' as RelativePathString);
	}

	return (
		<InputContainer absolute={<RelativeLogo name='filter' size={54} />}>
			<View></View>
			<View>
				<NavigationArrows handleNext={handleNext} handlePrevious={handlePrevious} />
			</View>
		</InputContainer>
	);
}

export default Rules;