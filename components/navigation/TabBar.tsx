import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from "@/hooks/useThemeColor";

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
	const insets = useSafeAreaInsets();
	const backgroundColor = useThemeColor({}, "defaultBackground");
	const textColor = useThemeColor({}, "text");
	const activeTextColor = useThemeColor({}, "tint");

	const animations = useRef(state.routes.map(() => new Animated.Value(1))).current;

	useEffect(() => {
		// state.routes.forEach((_, index) => {
		// 	Animated.timing(animations[index], {
		// 		toValue: state.index === index ? 1.5 : 1,
		// 		duration: 200,
		// 		useNativeDriver: false,
		// 	}).start();
		// });
	}, [state.index]);

	return (
		<View style={[styles.tabBar, { backgroundColor }]}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label = options.tabBarLabel ?? options.title ?? route.name;
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				return (
					<View>
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							onPress={onPress}
							style={[
								styles.tab,
								isFocused ? { } : {},
							]}
						>
							{options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? '#FFF' : textColor, size: 24 })}

							{/*{isFocused && (*/}
							{/*	<Text style={[styles.label, { color: '#FFF' }]}>{typeof label === 'string' ? label : route.name}</Text>*/}
							{/*)}*/}
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginHorizontal: 10,
		marginBottom: 20,
		padding: 10,
	},
	animatedTab: {
		marginHorizontal: 5,
	},
	tab: {
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		borderRadius: 15,
		flexDirection: 'row',
	},
	label: {
		fontWeight: 'bold',
	},
});

export default TabBar;