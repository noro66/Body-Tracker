import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
									 container: {
										 flex: 1,
										 backgroundColor: '#f5f5f5',
									 },
									 content: {
										 padding: 20,
									 },
									 title: {
										 fontSize: 28,
										 fontWeight: 'bold',
										 color: '#333',
										 marginBottom: 8,
									 },
									 subtitle: {
										 fontSize: 16,
										 color: '#666',
										 marginBottom: 24,
									 },
									 inputContainer: {
										 marginBottom: 16,
									 },
									 label: {
										 fontSize: 14,
										 color: '#555',
										 marginBottom: 6,
										 fontWeight: '500',
									 },
									 input: {
										 backgroundColor: '#fff',
										 borderRadius: 8,
										 padding: 12,
										 fontSize: 16,
										 borderWidth: 1,
										 borderColor: '#ddd',
										 color: '#333',
									 },
									 bmiContainer: {
										 backgroundColor: '#fff',
										 borderRadius: 12,
										 padding: 20,
										 marginVertical: 20,
										 alignItems: 'center',
										 shadowColor: '#000',
										 shadowOffset: {
											 width: 0,
											 height: 2,
										 },
										 shadowOpacity: 0.1,
										 shadowRadius: 4,
										 elevation: 3,
									 },
									 bmiTitle: {
										 fontSize: 18,
										 fontWeight: '600',
										 color: '#333',
										 marginBottom: 12,
									 },
									 bmiValue: {
										 fontSize: 36,
										 fontWeight: 'bold',
										 color: '#c900ff',
										 marginBottom: 8,
									 },
									 bmiCategory: {
										 fontSize: 16,
										 color: '#666',
									 },
									 saveButton: {
										 backgroundColor: '#c900ff',
										 borderRadius: 8,
										 padding: 16,
										 alignItems: 'center',
										 marginTop: 8,
									 },
									 saveButtonText: {
										 color: '#fff',
										 fontSize: 16,
										 fontWeight: '600',
									 },
								 });

export default styles;
