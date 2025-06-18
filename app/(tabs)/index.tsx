import React, { useEffect, useState } from 'react'
import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText'
import { db } from '@/constants/Firebase';
import { Survey } from '@/types';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import InputContainer from '@/components/ui/InputContainer';
import SurveyItem from '@/components/ui/survey/SurveyItem';
import InputField from '@/components/ui/InputField';
import FilterContainer from '@/components/ui/survey/FilterContainer';
import SurveyNotFound from '@/components/ui/survey/SurveyNotFound';

const Index = () => {
	const { session } = useSession();
	const router = useRouter();
	const [ surveys, setSurveys ] = useState<Survey[]>([]); 
	const [ isFiltersOpen, setIsFiltersOpen ] = useState<boolean>(false);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState('');

	const fetchSurveys = async () =>  { 
		try {
			setIsLoading(true);
			const surveysRef = collection(db, 'surveys');
			const q = query(surveysRef, 
				where('rules.gender', 'in', ['ANY', session?.gender])
			);

			const querySnapshot = await getDocs(q);
			const surveys: Survey[] = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			} as Survey));

			setSurveys(surveys);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	const filteredSurveys = surveys.filter(survey => 
		survey.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		fetchSurveys(); 
	}, []);

	return (
	<InputContainer>
		<View>
			<View style={styles.searchContainer}>
				<InputField 
					placeholder='Pretraži...'
					value={searchTerm}
  					onChangeText={setSearchTerm}
					leftIcon={
					<TouchableOpacity onPress={() => setIsFiltersOpen(!isFiltersOpen)}>
						<ThemedText 
							textColor={isFiltersOpen ? 'text' : 'muted'} 
							// style={(isFiltersOpen && { backgroundColor: 'red', borderRadius: 5 })}
						>
							<Feather name="sliders" size={24}/> 
						</ThemedText>
					</TouchableOpacity>
				}
					rightIcon={<ThemedText textColor='muted'><Feather name="search" size={24} /></ThemedText>}
				/>
				{ isFiltersOpen && <FilterContainer filterList={[]} />}
			</View>
			<FlatList
				data={filteredSurveys}
				scrollEnabled={false}
				renderItem={({ item }) => <SurveyItem item={item} router={router} />} 
				keyExtractor={(item) => item.id}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					isLoading ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : null
				}
			/>
			{
				(!isLoading && !filteredSurveys.length) && 
				<SurveyNotFound />
			}
		</View>
	</InputContainer> 
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		paddingBottom: 20,
	},
	inputField: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		marginBottom: 10,
		gap: 5,
		paddingHorizontal: 10,
		borderRadius: 10
	}
});

export default Index