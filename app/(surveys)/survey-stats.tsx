import React from 'react';
import { View, Text, Dimensions, useColorScheme } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ThemedText } from '@/components/themed/ThemedText';

// Define the expected types
type Question = {
	title: string;
	description?: string;
	type: string;
	isDropdown: boolean;
	required: boolean;
	answers?: string[];
};

type Props = {
	stats: {
		[questionIndex: number]: {
			[answer: string]: number;
		};
	};
	questions: Question[];
};

const SurveyStats = ({ stats, questions }: Props) => {
	const screenWidth = Dimensions.get('window').width;
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';

	const chartConfig = {
		backgroundGradientFrom: isDark ? '#1e1e1e' : '#fff',
		backgroundGradientTo: isDark ? '#1e1e1e' : '#fff',
		decimalPlaces: 0,
		color: (opacity = 1) =>
			isDark ? `rgba(255, 214, 10, ${opacity})` : `rgba(255, 159, 0, ${opacity})`,
		labelColor: () => (isDark ? '#fff' : '#333'),
		propsForBackgroundLines: {
			stroke: isDark ? '#444' : '#eee',
		},

	};

	if (!stats || Object.keys(stats).length === 0) {
		return (
			<ThemedText style={{ marginTop: 24, textAlign: 'center' }}>
				Nema odgovora na anketu.
			</ThemedText>
		);
	}

	return (
		<View>
			{Object.entries(stats).map(([questionIndex, answers]) => {
				const question = questions[+questionIndex];
				const labels = Object.keys(answers).map((a) => {
					const index = parseInt(a, 10);
					if (question?.answers && !isNaN(index)) {
						return question.answers[index] ?? `Odgovor ${index}`;
					}
					return a; // fallback for text input
				});
				const data = Object.values(answers);

				return (
					<View key={questionIndex} style={{ marginVertical: 16, paddingHorizontal: 16 }}>
						<ThemedText
							style={{
								fontWeight: 'bold',
								marginBottom: 10,
								fontSize: 16,
								color: isDark ? '#fff' : '#000',
							}}
						>
							{question?.title ?? `Pitanje #${+questionIndex + 1}`}
						</ThemedText>

						<BarChart
							data={{
								labels,
								datasets: [{ data }],
							}}
							width={screenWidth - 32}
							height={220}
							fromZero
							showValuesOnTopOfBars
							yAxisLabel=""
							yAxisSuffix=""
							chartConfig={chartConfig}
							style={{
								borderRadius: 8,
							}}
						/>
					</View>
				);
			})}
		</View>
	);
};

export default SurveyStats;