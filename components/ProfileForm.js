import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles                    from '../assets/styles';

const ProfileForm = ({ profile, setProfile, fieldLabels }) => {
	return (
		<>
			{Object.keys(profile).map((key) => (
				<View key={key} style={styles.inputContainer}>
					<Text style={styles.label}>{fieldLabels[key]}</Text>
					<TextInput
						placeholder={`Enter your ${fieldLabels[key].toLowerCase()}`}
						style={styles.input}
						value={profile[key]}
						onChangeText={(value) =>
							setProfile((prev) => ({ ...prev, [key]: value }))
						}
						keyboardType={key === 'weight' || key === 'height' || key === 'age' ? 'numeric' : 'default'}
					/>
				</View>
			))}
		</>
	);
};

export default ProfileForm;
