import {useState, useEffect, useCallback } from 'react';
import {doc, getDoc, query, where, getDocs, QueryConstraint } from 'firebase/firestore';
import { db } from '@/constants/Firebase';

interface UseFetchCollectionResult<T> {
	data: T[];
	isLoading: boolean;
	error: Error | null;
}

interface UseFetchDocumentResult<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
}

const useFetchDocument = <T,>(collectionName: string, documentId: string): UseFetchDocumentResult<T> => {
	const [ data, setData ] = useState<T | null>(null);
	const [ isLoading, setIsLoading ] = useState<boolean>(true);
	const [ error, setError ] = useState<Error | null>(null);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		const docRef = doc(db, collectionName, documentId);

		try {
			const docSnap = await getDoc(docRef);
			(docSnap.exists()) 
				? setData({ id: docSnap.id, ...docSnap.data() } as T)
				: setData(null);
		} catch (err) {
			console.error('Error fetching document:', err);
			setError(err as Error);
		} finally {
			setIsLoading(false);
		}
	}, [ collectionName, documentId ]);

	useEffect(() => {
		fetchData();
		console.log("Runs");
	}, [ fetchData ]);

	return { data, isLoading, error };
};

export { useFetchDocument };