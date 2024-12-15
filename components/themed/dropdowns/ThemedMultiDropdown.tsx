import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { MultiSelectProps } from 'react-native-element-dropdown/lib/typescript/components/MultiSelect/model';

type ThemedMultiDropdownType = {
	data: any;
	backgroundKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
	textKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
	toReturnValue?: boolean;
	icon?: React.ReactElement;

	value: any;
	setValue: any;
	valueField?: string;
	labelField?: string;
	search?: MultiSelectProps<any>['search'];
	mode?: MultiSelectProps<any>['mode'];
	placeholder?: MultiSelectProps<any>['placeholder'];
	searchPlaceholder?: MultiSelectProps<any>['searchPlaceholder'];
	maxHeight?: MultiSelectProps<any>['maxHeight'];
	disable?: boolean;
}

// TODO: NAPRAVI OVO!

const ThemedMultiDropdown = ({ 
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
	icon,
	disable = false
}: ThemedMultiDropdownType) => {
	const globalBackgroundColor = useThemeColor({light: undefined, dark: undefined }, 'globalBackground');
	const backgroundColor = useThemeColor({ light: undefined, dark: undefined }, backgroundKey);
	const placeholderText = useThemeColor({ light: undefined, dark: undefined }, 'muted');
	const textColor = useThemeColor({ light: undefined, dark: undefined }, textKey);

	return (
		<View style={{ flex: 1 }}>
			<MultiSelect
				containerStyle={[styles.container, { backgroundColor }]}
				style={[styles.dropdown, { backgroundColor }]}
				placeholderStyle={[ styles.placeholderStyle, { color: placeholderText } ]}
				selectedTextStyle={[ styles.selectedTextStyle, { color: textColor } ]}
				inputSearchStyle={[ styles.inputSearchStyle, { color: textColor } ]}
				iconStyle={styles.iconStyle}
				itemTextStyle={{ color: textColor }}
				activeColor={ globalBackgroundColor }
				itemContainerStyle={{ borderRadius: 10 }}
				data={data}
				search={search}
				mode={mode}
				maxHeight={maxHeight}				
				labelField={labelField}
				valueField={valueField}
				placeholder={placeholder}
				searchPlaceholder={searchPlaceholder}
				value={value}
				disable={disable}
				onChange={item => {
					setValue(item);
				}}
				renderLeftIcon={() => (
					icon
				)}
				selectedStyle={styles.selectedStyle}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderRadius: 10,
		borderWidth: 0
	},
	dropdown: {
		height: 50,
		width: '100%',
		paddingHorizontal: 8,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 14,
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
	icon: {
		marginRight: 5,
	},
	selectedStyle: {
		borderRadius: 12,
	},
});

export default ThemedMultiDropdown;

