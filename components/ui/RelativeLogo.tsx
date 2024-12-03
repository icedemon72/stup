import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type RelativeLogoProps = {
	name?: keyof typeof Ionicons.glyphMap;
	size?: number;
}

const screenWidth = Dimensions.get('window').width;

const RelativeLogo = ({ name = 'aperture-outline', size = 72 }: RelativeLogoProps ) => {
	const { colors } = useTheme();
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
	
	return (
		<View style={{ ...styles.circleContainer, backgroundColor: colors.background }}>
			<View style={{ ...styles.logoContainer, backgroundColor }}>
				<Ionicons name={name} size={size}  color={ colors.text } />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	circleContainer: {
		width: 120,
		height: 120,
		borderRadius: 100,
		position: 'absolute',
		top: -60,
		right: (screenWidth / 2) - 60,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10
	},
	logoContainer: {
		width: 100, 
		height: 100, 
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default RelativeLogo;