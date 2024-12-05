/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#04205d',
    background: '#fff',
		backgroundSecondary: '#E6E6E6',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
		muted: '#171A1C',
    tabIconSelected: tintColorLight,
		globalBackground: '#04205d', // (dark blue)
		primary: '#f36a25', // (orange PRIMARY)
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
		backgroundSecondary: '#212426',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
		muted: '#B2B2B2',
    tabIconSelected: tintColorDark,
		globalBackground: '#000', // (black)
		primary: '#f36a25', // (orange PRIMARY)
  },
};

	// globalBackground: '#04205d', // (dark blue)
	// text: '#04205d',
	// backgroundSecondary: '#f4f5f8', // (white-grayish)
	// primary: '#f36a25', // (orange PRIMARY)
	// muted: '#727272', // (gray)
	// charcoal: '#333333',
	// pink: '#FFC0CB',
	// teal: '#008080',
	// red: '#8B0A1A',
	// deepRed: '#660033',
	// crimson: '#DC143C',