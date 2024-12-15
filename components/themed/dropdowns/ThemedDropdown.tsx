import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

type ThemedDropdownType = {
	data: any;
	backgroundKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
	textKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
	toReturnValue?: boolean;
	icon?: React.ReactElement;

	value: any;
	setValue: any;
	valueField?: DropdownProps<any>['valueField'];
	labelField?: DropdownProps<any>['labelField'];
	search?: DropdownProps<any>['search'];
	mode?: DropdownProps<any>['mode'];
	placeholder?: DropdownProps<any>['placeholder'];
	searchPlaceholder?: DropdownProps<any>['searchPlaceholder'];
	maxHeight?: DropdownProps<any>['maxHeight'];
}


const ThemedDropdown = ({ 
	data, 
	backgroundKey = 'backgroundSecondary', 
	textKey = 'text', 
	value, 
	setValue, 
	valueField = 'value', 
	labelField = 'label',
	mode = 'modal', 
	search = true, 
	placeholder, 
	maxHeight = 300,
	searchPlaceholder = 'Pretraži...', 
	toReturnValue = false, 
	icon
}: ThemedDropdownType) => {
	const [ isFocused, setIsFocused ] = useState<boolean>(false);

	const globalBackgroundColor = useThemeColor({light: undefined, dark: undefined }, 'globalBackground');
	const backgroundColor = useThemeColor({ light: undefined, dark: undefined }, backgroundKey);
	const placeholderText = useThemeColor({ light: undefined, dark: undefined }, 'muted');
	const textColor = useThemeColor({ light: undefined, dark: undefined }, textKey);


	return (
		<Dropdown
			style={[styles.dropdown, /*isFocused && { borderColor: 'blue' }*/, { backgroundColor }]}
			containerStyle={[ styles.container, { backgroundColor } ]}
			placeholderStyle={[ styles.placeholderStyle, { color: placeholderText } ]}
			selectedTextStyle={[ styles.selectedTextStyle, { color: textColor } ]}
			inputSearchStyle={[ styles.inputSearchStyle, { color: textColor } ]}
			itemTextStyle={{ color: textColor }}
			iconStyle={styles.iconStyle}
			activeColor={ globalBackgroundColor }
			itemContainerStyle={{ borderRadius: 10 }}
			data={data}
			search={search}
			mode={mode}
			maxHeight={maxHeight}
			labelField={labelField}
			valueField={valueField}
			placeholder={!isFocused ? placeholder : '...'}
			searchPlaceholder={searchPlaceholder}
			value={typeof value !== 'object' ? value : value?.value ?? null}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			onChange={item => {
				(toReturnValue) 
					? setValue(item[valueField])
					: setValue(item)
				
				setIsFocused(false);
			}}
			renderLeftIcon={() => icon}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 10,
		borderWidth: 0
	},
	dropdown: {
		height: 50,
		width: '100%',
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 50,
		borderRadius: 10,
		paddingHorizontal: 10
	},
});

export default ThemedDropdown;