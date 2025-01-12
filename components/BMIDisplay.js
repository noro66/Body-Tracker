import React from 'react';
import { View, Text } from 'react-native';
import styles         from '../assets/styles';

const BMIDisplay = ({ bmi, category }) => {
	return (
		<View style={styles.bmiContainer}>
			<Text style={styles.bmiTitle}>BMI Results</Text>
			<Text style={styles.bmiValue}>{bmi}</Text>
			<Text style={styles.bmiCategory}>{category}</Text>
		</View>
	);
};

export default BMIDisplay;
