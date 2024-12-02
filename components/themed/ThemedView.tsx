import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
	backgroundKey?:  keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedView({ style, lightColor, darkColor, backgroundKey = 'background', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, backgroundKey);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
