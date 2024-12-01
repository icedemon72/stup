import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedText } from '../themed/ThemedText';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const HelpButton = () => {
	return (
		<TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, paddingRight: 30, paddingTop: 20 }}>
			<ThemedText lightColor={Colors.light.muted} darkColor={Colors.dark.muted}>
				<AntDesign name="questioncircleo" size={24} />
			</ThemedText>
		</TouchableOpacity>
	)
}

export default HelpButton;