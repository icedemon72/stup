import { TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
	placeholderTextColor?: string;
};

export function ThemedTextInput({ style, lightColor, darkColor, placeholderTextColor, ...otherProps }: ThemedTextInputProps) {
	const customStyles = {
		backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, 'background'),
		color: useThemeColor({ light: undefined, dark: undefined }, 'text')
	}

	const placeholderColor = placeholderTextColor = useThemeColor({ light: undefined, dark: undefined }, 'muted');
	
	return <TextInput 
		style={[customStyles, style]} 
		placeholderTextColor={placeholderColor}
		{...otherProps} 
	/>
}