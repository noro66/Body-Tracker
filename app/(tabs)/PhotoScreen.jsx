import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PhotoScreen = () => {
	const [photo, setPhoto] = useState(null);
	const [hasPermission, setHasPermission] = useState(null);

	useEffect(() => {
		requestPermissions();
	}, []);

	const requestPermissions = async () => {
		try {
			if (Platform.OS === 'android') {
				const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
				const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

				setHasPermission(
					cameraPermission.status === 'granted' &&
					mediaPermission.status === 'granted'
				);
			} else {
				const { status } = await ImagePicker.requestCameraPermissionsAsync();
				setHasPermission(status === 'granted');
			}
		} catch (error) {
			console.error('Permission error:', error);
			setHasPermission(false);
		}
	};

	const takePhoto = async () => {
		if (!hasPermission) {
			Alert.alert(
				'Permission Required',
				Platform.OS === 'android'
				? 'Camera and media library permissions are required.'
				: 'Camera permission is required.',
				[
					{ text: 'Cancel', style: 'cancel' },
					{ text: 'Settings', onPress: requestPermissions }
				]
			);
			return;
		}

		try {
			const result = await ImagePicker.launchCameraAsync({
																   mediaTypes: ImagePicker.MediaTypeOptions.Images,
																   quality: 1,
																   allowsEditing: true,
																   aspect: [1, 1],
																   exif: false,
																   androidCameraPermissionOptions: {
																	   title: 'Permission to use camera',
																	   message: 'We need your permission to use your camera',
																	   buttonPositive: 'Ok',
																	   buttonNegative: 'Cancel',
																   }
															   });

			if (!result.canceled && result.assets && result.assets.length > 0) {
				setPhoto(result.assets[0].uri);
			}
		} catch (error) {
			console.error('Camera error:', error);
			Alert.alert(
				'Error',
				'Failed to take photo. Please try again.',
				[{ text: 'OK' }]
			);
		}
	};

	const retakePhoto = () => {
		setPhoto(null);
	};

	const renderContent = () => {
		if (hasPermission === null) {
			return <Text style={styles.message}>Requesting permissions...</Text>;
		}

		if (hasPermission === false) {
			return (
				<>
					<Text style={styles.message}>Permission denied</Text>
					<Text style={styles.submessage}>
						{Platform.OS === 'android'
						 ? 'Please enable camera and storage permissions in your device settings'
						 : 'Please enable camera access in your device settings'}
					</Text>
					<TouchableOpacity
						style={[styles.button, styles.permissionButton]}
						onPress={requestPermissions}
					>
						<Text style={styles.buttonText}>Request Permissions</Text>
					</TouchableOpacity>
				</>
			);
		}

		return (
			<>
				<View style={styles.photoContainer}>
					{photo ? (
						<>
							<Image
								source={{ uri: photo }}
								style={styles.photo}
								resizeMode="cover"
							/>
							<TouchableOpacity
								style={styles.retakeButton}
								onPress={retakePhoto}
							>
								<Text style={styles.retakeButtonText}>Retake Photo</Text>
							</TouchableOpacity>
						</>
					) : (
						 <View style={styles.placeholderContainer}>
							 <View style={styles.cameraIcon}>
								 <View style={styles.cameraBody} />
								 <View style={styles.cameraLens} />
							 </View>
							 <Text style={styles.placeholderText}>No photo taken</Text>
						 </View>
					 )}
				</View>

				<TouchableOpacity
					style={[styles.button, photo ? styles.buttonDisabled : null]}
					onPress={takePhoto}
					disabled={!!photo}
				>
					<Text style={styles.buttonText}>
						{photo ? 'Photo Taken' : 'Take Photo'}
					</Text>
				</TouchableOpacity>
			</>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Take Photo</Text>
			{renderContent()}
		</View>
	);
};

const styles = StyleSheet.create({
									 container: {
										 flex: 1,
										 padding: 20,
										 backgroundColor: '#f5f5f5',
										 alignItems: 'center',
									 },
									 title: {
										 fontSize: 24,
										 fontWeight: 'bold',
										 color: '#333',
										 marginBottom: 20,
									 },
									 photoContainer: {
										 width: '100%',
										 aspectRatio: 1,
										 backgroundColor: '#fff',
										 borderRadius: 12,
										 overflow: 'hidden',
										 marginBottom: 20,
										 ...Platform.select({
																ios: {
																	shadowColor: '#000',
																	shadowOffset: {
																		width: 0,
																		height: 2,
																	},
																	shadowOpacity: 0.1,
																	shadowRadius: 4,
																},
																android: {
																	elevation: 4,
																},
															}),
									 },
									 photo: {
										 width: '100%',
										 height: '100%',
									 },
									 placeholderContainer: {
										 flex: 1,
										 justifyContent: 'center',
										 alignItems: 'center',
										 backgroundColor: '#f9f9f9',
									 },
									 cameraIcon: {
										 width: 60,
										 height: 48,
										 justifyContent: 'center',
										 alignItems: 'center',
									 },
									 cameraBody: {
										 width: 48,
										 height: 36,
										 backgroundColor: '#666',
										 borderRadius: 8,
									 },
									 cameraLens: {
										 position: 'absolute',
										 width: 20,
										 height: 20,
										 backgroundColor: '#444',
										 borderRadius: 10,
										 borderWidth: 3,
										 borderColor: '#555',
									 },
									 placeholderText: {
										 marginTop: 12,
										 fontSize: 16,
										 color: '#666',
									 },
									 button: {
										 backgroundColor: '#2196F3',
										 paddingHorizontal: 32,
										 paddingVertical: 16,
										 borderRadius: 8,
										 width: '100%',
										 elevation: Platform.OS === 'android' ? 2 : 0,
									 },
									 permissionButton: {
										 marginTop: 16,
										 backgroundColor: '#4CAF50',
									 },
									 buttonDisabled: {
										 backgroundColor: '#ccc',
									 },
									 buttonText: {
										 color: '#fff',
										 fontSize: 16,
										 fontWeight: '600',
										 textAlign: 'center',
									 },
									 retakeButton: {
										 position: 'absolute',
										 bottom: 16,
										 right: 16,
										 backgroundColor: 'rgba(0, 0, 0, 0.5)',
										 paddingHorizontal: 16,
										 paddingVertical: 8,
										 borderRadius: 20,
									 },
									 retakeButtonText: {
										 color: '#fff',
										 fontSize: 14,
										 fontWeight: '500',
									 },
									 message: {
										 fontSize: 18,
										 color: '#333',
										 textAlign: 'center',
										 marginTop: 20,
									 },
									 submessage: {
										 fontSize: 14,
										 color: '#666',
										 textAlign: 'center',
										 marginTop: 8,
										 marginBottom: 16,
									 },
								 });

export default PhotoScreen;