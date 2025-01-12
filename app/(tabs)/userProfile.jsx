import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileForm  from '../../components/ProfileForm';
import BMIDisplay from '../../components/BMIDisplay';
import styles     from '../../assets/styles';

const UserProfile = () => {
	const [profile, setProfile] = useState({
											   firstName: '',
											   lastName: '',
											   age: '',
											   nationality: '',
											   weight: '',
											   height: '',
											   address: '',
										   });

	const fieldLabels = {
		firstName: 'First Name',
		lastName: 'Last Name',
		age: 'Age',
		nationality: 'Nationality',
		weight: 'Weight (kg)',
		height: 'Height (m)',
		address: 'Address',
	};

	const calculateBMI = (weight, height) => {
		if (weight && height) {
			const bmi = (weight / (height * height)).toFixed(1);
			let category = '';
			if (bmi < 18.5) category = 'Underweight';
			else if (bmi < 25) category = 'Normal';
			else if (bmi < 30) category = 'Overweight';
			else category = 'Obese';
			return { bmi, category };
		}
		return { bmi: null, category: null };
	};

	const saveProfile = async () => {
		try {
			await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
			alert('Profile saved successfully! 👍');
		} catch (error) {
			alert('Error saving profile. Please try again.');
		}
	};

	const { bmi, category } = calculateBMI(profile.weight, profile.height);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>User Profile</Text>
				<Text style={styles.subtitle}>Please fill in your details</Text>

				<ProfileForm
					profile={profile}
					setProfile={setProfile}
					fieldLabels={fieldLabels}
				/>

				{bmi && <BMIDisplay bmi={bmi} category={category} />}

				<TouchableOpacity
					style={styles.saveButton}
					onPress={saveProfile}
					activeOpacity={0.8}
				>
					<Text style={styles.saveButtonText}>Save Profile</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default UserProfile;
