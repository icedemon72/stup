import { TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
	placeholderTextColor?: string;
	backgroundKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
	textKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedTextInput({ style, lightColor, darkColor, placeholderTextColor, backgroundKey = 'background', textKey = 'text', ...otherProps }: ThemedTextInputProps) {
	const customStyles = {
		backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, backgroundKey),
		color: useThemeColor({ light: undefined, dark: undefined }, textKey)
	}

	const placeholderColor = placeholderTextColor = useThemeColor({ light: undefined, dark: undefined }, 'muted');
	
	return <TextInput 
		style={[customStyles, style]} 
		placeholderTextColor={placeholderColor}
		{...otherProps} 
	/>
}