import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
	lightColor?: string;
	darkColor?: string;
	backgroundKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export function ThemedTouchableOpacity({ style, lightColor, darkColor, backgroundKey = 'backgroundSecondary', ...otherProps }: ThemedTouchableOpacityProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, backgroundKey);

	return <TouchableOpacity style={[{ backgroundColor }, style]} { ...otherProps }>

	</TouchableOpacity>
}