import { type TouchableOpacityProps } from 'react-native';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({ style, lightColor, darkColor, ...otherProps }: ThemedButtonProps ) {
	
}