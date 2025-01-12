import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from './userProfile'; // Import your UserProfile screen
import BodyFatCalculator from './bodyFatCalculator';
import PhotoScreen from "./PhotoScreen"; // Import your BodyFatCalculator screen

const Stack = createStackNavigator();

const Index = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="UserProfile"
				component={UserProfile}
				options={{ title: 'User Profile' }}
			/>
			<Stack.Screen
				name="BodyFatCalculator"
				component={BodyFatCalculator}
				options={{ title: 'Body Fat Calculator' }}
			/>
			<Stack.Screen
				name="PhotoScrean"
				component={PhotoScreen}
				options={{ title: 'photo screen' }}
			/>
		</Stack.Navigator>
	);
};

export default Index;
