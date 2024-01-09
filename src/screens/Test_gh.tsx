import { View, Text, BackHandler, } from 'react-native';
import { OtplessModule } from 'otpless-react-native';
import { useNavigation } from '@react-navigation/native';
import { encryptNumber, decryptNumber } from '../components/EncDecNo';
import { useEffect, useState } from 'react';
import { getAsyncData, storeAsyncData, removeAsyncData } from '../components/CustomAsyncData';
import showToast from '../components/ShowToast';
import firestore from '@react-native-firebase/firestore';
import CheckIfPhoneNumberExist from '../components/CheckIfPhoneNumberExist';

const Test_gh = () => {
	const navigation = useNavigation();

	const [verifiedPhNum, setVerifiedPhNum] = useState('');
	const [isNumExist, setIsNumExist] = useState(false);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			handleBackPress
		);

		return () => {
			backHandler.remove();
		};
	}, []);

	const handleBackPress = () => {
		// Add your exit logic here
		// For example, you can use BackHandler.exitApp() to exit the application
		BackHandler.exitApp();
		return true; // Returning true prevents default back button behavior (going back in navigation stack)
	};


	const module = new OtplessModule();
	const extra = {
		method: 'get',
		params: {
			cid: '649fz4aa',
			crossButtonHidden: 'true'
		},
	};
	
	module.showLoginPage(async (data) => {
		let message: string = '';
		if (data.data === null || data.data === undefined) {
			console.log(data.errorMessage);
			if (data.errorMessage != null || data.errorMessage != '') {
				showToast('Something went wrong try after some time!');
			}
		} else {
			console.log('====================================');
			console.log(JSON.stringify(data.data));
			console.log('====================================');

			showToast('Verification successful');

			setVerifiedPhNum(data.data.waNumber);

			const isPhoneNumberExist = await CheckIfPhoneNumberExist(verifiedPhNum);
			setIsNumExist(isPhoneNumberExist);

			console.log('====================================');
			console.log('Current phone number: ' + verifiedPhNum);
			console.log('====================================');


			// if (isPhoneNumberExist === 'phone_not_exist') {
			// 	// console
			// 	setIsNumExist('false');
			// } else if (isPhoneNumberExist === 'phone_exist') {
			// 	setIsNumExist('true');
			// }


			console.log("is ph num exist:" + isNumExist);

		}
	}, extra);
	// module.onSignInCompleted();


	return (
		<View>
			<Text style={{ color: '#000' }}>Welcome!</Text>
		</View>
	);
}

export default Test_gh;