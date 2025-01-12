import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BodyFatCalculator = () => {
	const [measurements, setMeasurements] = useState({
														 waist: '',
														 neck: '',
														 height: '',
														 hip: '',
														 gender: 'male',
													 });

	const inputFields = {
		waist: 'Waist Circumference',
		neck: 'Neck Circumference',
		height: 'Height',
		hip: 'Hip Circumference',
	};

	const calculateBodyFat = (waist, neck, height, hip, gender) => {
		if (!waist || !neck || !height || (gender === 'female' && !hip)) return null;

		const bodyFat = gender === 'male'
						? (86.010 * Math.log10(parseFloat(waist) - parseFloat(neck)) -
						   70.041 * Math.log10(parseFloat(height)) + 36.76).toFixed(1)
						: (163.205 * Math.log10(parseFloat(waist) + parseFloat(hip) - parseFloat(neck)) -
						   97.684 * Math.log10(parseFloat(height)) - 78.387).toFixed(1);

		let category = '';
		if (gender === 'male') {
			if (bodyFat < 6) category = 'Essential Fat';
			else if (bodyFat < 14) category = 'Athletes';
			else if (bodyFat < 18) category = 'Fitness';
			else if (bodyFat < 25) category = 'Average';
			else category = 'Obese';
		} else {
			if (bodyFat < 14) category = 'Essential Fat';
			else if (bodyFat < 21) category = 'Athletes';
			else if (bodyFat < 25) category = 'Fitness';
			else if (bodyFat < 32) category = 'Average';
			else category = 'Obese';
		}

		return { percentage: bodyFat, category };
	};

	const saveResult = async () => {
		try {
			const existingData = JSON.parse(
				await AsyncStorage.getItem('bodyFatResults')
			) || [];
			const updatedData = [
				...existingData,
				{ ...measurements, date: new Date().toISOString() }
			];
			await AsyncStorage.setItem('bodyFatResults', JSON.stringify(updatedData));
			alert('Result saved successfully! 📊');
		} catch (error) {
			alert('Error saving result. Please try again.');
		}
	};

	const result = calculateBodyFat(
		measurements.waist,
		measurements.neck,
		measurements.height,
		measurements.hip,
		measurements.gender
	);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Body Fat Calculator</Text>
				<Text style={styles.subtitle}>Enter your measurements in centimeters</Text>

				<View style={styles.genderContainer}>
					{['male', 'female'].map((gender) => (
						<TouchableOpacity
							key={gender}
							style={[
								styles.genderButton,
								measurements.gender === gender && styles.genderButtonActive
							]}
							onPress={() => setMeasurements(prev => ({ ...prev, gender }))}
						>
							<Text style={[
								styles.genderButtonText,
								measurements.gender === gender && styles.genderButtonTextActive
							]}>
								{gender.charAt(0).toUpperCase() + gender.slice(1)}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{Object.entries(inputFields).map(([key, label]) => (
					<View key={key} style={styles.inputContainer}>
						<Text style={styles.label}>{label} (cm)</Text>
						<TextInput
							placeholder={`Enter ${label.toLowerCase()}`}
							style={styles.input}
							value={measurements[key]}
							onChangeText={(value) =>
								setMeasurements((prev) => ({ ...prev, [key]: value }))
							}
							keyboardType="numeric"
						/>
					</View>
				))}

				{result && (
					<View style={styles.resultContainer}>
						<Text style={styles.resultTitle}>Body Fat Analysis</Text>
						<Text style={styles.resultValue}>{result.percentage}%</Text>
						<Text style={styles.resultCategory}>{result.category}</Text>
					</View>
				)}

				<TouchableOpacity
					style={styles.saveButton}
					onPress={saveResult}
					activeOpacity={0.8}
				>
					<Text style={styles.saveButtonText}>Save Result</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

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
									 genderContainer: {
										 flexDirection: 'row',
										 marginBottom: 20,
										 backgroundColor: '#E8E8E8',
										 borderRadius: 8,
										 padding: 4,
									 },
									 genderButton: {
										 flex: 1,
										 paddingVertical: 12,
										 alignItems: 'center',
										 borderRadius: 6,
									 },
									 genderButtonActive: {
										 backgroundColor: '#fff',
										 shadowColor: '#000',
										 shadowOffset: {
											 width: 0,
											 height: 2,
										 },
										 shadowOpacity: 0.1,
										 shadowRadius: 2,
										 elevation: 2,
									 },
									 genderButtonText: {
										 color: '#666',
										 fontSize: 16,
										 fontWeight: '500',
									 },
									 genderButtonTextActive: {
										 color: '#c900ff',
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
									 resultContainer: {
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
									 resultTitle: {
										 fontSize: 18,
										 fontWeight: '600',
										 color: '#333',
										 marginBottom: 12,
									 },
									 resultValue: {
										 fontSize: 36,
										 fontWeight: 'bold',
										 color: '##c900ff',
										 marginBottom: 8,
									 },
									 resultCategory: {
										 fontSize: 16,
										 color: '#666',
										 fontWeight: '500',
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

export default BodyFatCalculator;