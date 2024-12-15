import React, { useEffect, useState } from 'react'
import { useSession } from '@/components/contexts/AuthContext';
import { ThemedText } from '@/components/themed/ThemedText'
import { ThemedView } from '@/components/themed/ThemedView';
import { db } from '@/constants/Firebase';
import { Survey } from '@/types';
import { useRouter } from 'expo-router';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { ActivityIndicator, FlatList } from 'react-native';
import InputContainer from '@/components/ui/InputContainer';
import SurveyItem from '@/components/ui/survey/SurveyItem';

const Index = () => {
	const { session } = useSession();
	const router = useRouter();
	const [ surveys, setSurveys ] = useState<Survey[]>([]); 
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

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

	useEffect(() => {
		fetchSurveys(); 
	}, []);

	return (
		<InputContainer>
			<FlatList
				data={surveys}
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
		</InputContainer> 
	);
}

export default Index