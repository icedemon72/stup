import React from 'react';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

type RelativeLogoProps = {
	name?: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap | keyof typeof FontAwesome.glyphMap;
	size?: number;
	iconPack?: 'Ionicons' | 'MaterialIcons' | 'FontAwesome';
}

const screenWidth = Dimensions.get('window').width;

const RelativeLogo = ({ name = 'aperture-outline', size = 72, iconPack = 'Ionicons' }: RelativeLogoProps) => {
	const { colors } = useTheme();
	const outerBackgroundColor = useThemeColor({ light: undefined, dark: undefined }, 'globalBackground');
	const innerBackgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	const iconMap = {
		'Ionicons': <Ionicons name={name as keyof typeof Ionicons.glyphMap} size={size} color={colors.text}/>,
		'MaterialIcons': <MaterialIcons name={name as keyof typeof MaterialIcons.glyphMap} size={size} color={colors.text} />,
		'FontAwesome': <FontAwesome name={name as keyof typeof FontAwesome.glyphMap} size={size} color={colors.text} />
	}

	return (
		<View style={{ ...styles.circleContainer, backgroundColor: outerBackgroundColor }}>
			<View style={{ ...styles.logoContainer, backgroundColor: innerBackgroundColor }}>
				{ iconMap[iconPack] }
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