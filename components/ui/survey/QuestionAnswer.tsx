import React, { useState } from 'react';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import EditModal from '../modals/EditModal';

type QuestionAnswerProps = {
	text: string;
	index: number;
	editable?: boolean;
	onDelete?: any;
	deletable?: boolean;
	edit?: any;
}

// TODO: napraviti odgovor za mapiranje 

const QuestionAnswer = ({ 
	text, 
	index, 
	editable = false, 
	edit,
	deletable = true,
	onDelete
}: QuestionAnswerProps) => {
	const [ isEditModalOpen, setIsEditModalOpen ] = useState<boolean>(false);

	return (
		<>
			{
				isEditModalOpen && (
					<EditModal
						title={`Uredi ${index + 1}. pitanje`}
						value={text} 
						index={index} 
						saveFunc={edit} 
						closeFunc={() => setIsEditModalOpen(false)} 
					/>
				)
			}
			<ThemedView backgroundKey='backgroundSecondary' style={styles.container}>
				<View style={styles.content}>
					<ThemedText style={{ flex: 1 }}>{ index + 1 }. { text }</ThemedText>
					{
						(editable || deletable) &&
						<View style={styles.actions}>
							{ editable && 
								<TouchableOpacity onPress={() => setIsEditModalOpen(true)}>
									<ThemedText textColor='muted'><Feather name="edit" size={24} /></ThemedText>
								</TouchableOpacity>
							}
							{ deletable && 
								<TouchableOpacity onPress={onDelete}>
									<ThemedText textColor='muted'><Feather name="x-circle" size={24} /></ThemedText>
								</TouchableOpacity>
							}
						</View>
					}
				</View>
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		marginVertical: 5,
		borderRadius: 10
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	actions: {
		flexDirection: 'row',
		gap: 20
	}
});

export default QuestionAnswer;