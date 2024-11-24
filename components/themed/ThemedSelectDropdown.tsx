import SelectDropdown from "react-native-select-dropdown";
import type { SelectDropdownProps } from "react-native-select-dropdown";
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedSelectDropdownProps = SelectDropdownProps & {
	dropdownStyle?: any;
	lightColor?: string;
	darkColor?: string;
}

export function ThemedSelectDropdown({ dropdownStyle, lightColor, darkColor, ...otherProps }: ThemedSelectDropdownProps) {
	const custyomStyles = {
		backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, 'background'),
	}

	return <SelectDropdown dropdownStyle={{ ...custyomStyles, ...dropdownStyle } }  { ...otherProps } />
}


