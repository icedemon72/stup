import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed/ThemedText';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';import InfoModal from './modals/InfoModal';
import { InfoModalProps } from '@/types/componentTypes';
;

const HelpButton = ({ title, subtitle, text }: InfoModalProps) => {
	const [ isModalOpened, setIsModalOpened ] = useState<boolean>(false);
	
	return (
		<>
			<TouchableOpacity onPress={() => setIsModalOpened(true)} style={{ position: 'absolute', right: 0, top: 0, paddingRight: 30, paddingTop: 20 }}>
				<ThemedText lightColor={Colors.light.muted} darkColor={Colors.dark.muted}>
					<AntDesign name="questioncircleo" size={24} />
				</ThemedText>
			</TouchableOpacity>

			{
				isModalOpened &&
					<InfoModal title={title} subtitle={subtitle} text={text} closeFunc={() => setIsModalOpened(false)}/> 
			}
		</>
	);
}

const styles = StyleSheet.create({

})

export default HelpButton;