import { StatusBar, SafeAreaView, View, Image, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Black_00, White_ff } from '../components/Strings';
import { useSelector } from 'react-redux';


const Splash = () => {
  const THEME = useSelector(state => state.theme);

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Test_gh');
    }, 1000);
  }, []);


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

  
  return (
    <SafeAreaView
      style={
        { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: White_ff }
      }>
      <StatusBar
        backgroundColor={White_ff}
        hidden={true}
      />
      <View style={{ width: 150, height: 150 }}>
        <Image
          source={require('./../images/site-logo/shaadow-app-logo-83rjjdejj83r.png')}
          style={{ width: '98%', height: '98%', alignSelf: 'center' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
