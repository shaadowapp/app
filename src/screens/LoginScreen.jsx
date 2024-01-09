import { StatusBar, SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Black_00, White_ff, White_b3, White_e0, Black_12, Black_24, Gray_7a } from '../components/Strings';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, clearAllUsers } from '../redux/userSlice';
import { changeTheme } from '../redux/ThemeSlice';
import { getAsyncData, storeAsyncData, removeAsyncData } from '../components/CustomAsyncData';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import CheckIfEmailExist from '../components/CheckIfEmailExist';
import firestore from '@react-native-firebase/firestore';
import { CurrentUserBatchCode } from '../components/Strings';


const LoginScreen = () => {
  const navigation = useNavigation();

  const THEME = useSelector(state => state.theme)
  const dataq = useSelector((state) => {
    return state.users;
  })
  // console.log("theme:--", THEME)
  const dispatch = useDispatch();

  // dispatch(changeTheme("DARK"))

  const addNewUser = (token) => {
    console.log(token)
    dispatch(addUser(token))
  }


  const deleteSingleUser = (id) => {
    dispatch(removeUser(id))
    // console.log(id)
  }


  const deleteAllUsers = () => {
    dispatch(clearAllUsers())
  }

  useEffect(() => {
    // console.log(dataq);

  }, [])


  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      return 'SignOut';
    } catch (error) {
      console.log(error);
    }
  };


  const redirectMe = (place) => {
    navigation.navigate(place);
  }

  //------------------------------------------------------------------------------------------------

  // Function to get the latest user ID from Firestore as a string or 'no_user'
  async function getLatestUserID() {
    try {
      const querySnapshot = await firestore()
        .collection('Users_79k80')
        .orderBy('userSerialNumber', 'desc')
        .limit(1)
        .get();

      if (!querySnapshot.empty) {
        const latestUserID = querySnapshot.docs[0].data().userSerialNumber.slice(-4);
        return latestUserID.toString();
      } else {
        return '1000';
      }
    } catch (error) {
      // Handle any errors if they occur
      console.error('Error getting the latest user ID:', error);
      return 'error';
    }
  }





  function generateUniqueUserID(latestUserID, userBatchNumber) {
    // console.log(latestUserID)
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2, '0'); // Extract the last two digits of the year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit format
    const date = (currentDate.getDate()).toString().padStart(2, '0'); // Ensure two-digit format
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Ensure two-digit format
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format

    const uniqueUserNumber = latestUserID;
    const uniqueNumber = parseInt(uniqueUserNumber) + 1; // Increment the latest user ID

    const userID = `${userBatchNumber}${year}${month}${date}${hours}${minutes}${uniqueNumber}`;
    return userID;
  }





  const generateDeviceToken = () => {
    // Generate four random 5-digit numbers.
    const numbers = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 99999) + 1);
    }

    // Join the four numbers into a single string, separated by hyphens.
    return numbers.join('-');
  };



  useEffect(() => {
    const b9ijno = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      console.log('back clicked');
    });

    return b9ijno;
  }, [navigation])



  const registDev = async () => {
    const deviceRegCode = generateDeviceToken(); // create new device token
    const deviceToken = await getAsyncData('__deviceToken_sdw_main'); //get current device code
    let currentDeviceToken = "";

    if (deviceToken === '' || deviceToken === null) {
      // if device token is null then store new device token
      await storeAsyncData('__deviceToken_sdw_main', deviceRegCode);
      currentDeviceToken = deviceRegCode;
    } else {
      // if device token is not null then get current device token
      currentDeviceToken = deviceToken;
    }

    // return device token
    return currentDeviceToken;
  }


  function generateUsername(serialno, fullname) {
    let fullname1 = fullname.toLowerCase();
    let handle = serialno + "-" + fullname1;

    return handle;
  }







  const onGoogleButtonPress = async () => {
    GoogleSignin.configure();
    // fetchStoredNumber();

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(storedNumber);


      const GOOGLE_PROFILE = userInfo.user;




      const latestUserID = await getLatestUserID();
      // console.log(latestUserID)
      const uniqueUserID = generateUniqueUserID(latestUserID, CurrentUserBatchCode);


      const isExistEmail = await CheckIfEmailExist(GOOGLE_PROFILE.email);
      const generatedUserHandle = generateUsername(uniqueUserID, GOOGLE_PROFILE.name).replaceAll(" ", "");



      let curDevRegCode = await registDev();

      if (isExistEmail == "false") {
        firestore()
          .collection('Users_79k80')
          .doc("sh_" + uniqueUserID)
          .set({
            userPublicName: GOOGLE_PROFILE.name,
            userPersonalEmail: GOOGLE_PROFILE.email,
            userHandle: generatedUserHandle,
            userProfilePic: '',
            userWorkContactInfo: firestore.FieldValue.arrayUnion({
              RealPhoneNumber: '',
              RealEmailAdd: '',
            }),
            userSerialNumber: uniqueUserID,
            isUserLoggedIn: 'true',
            userShortBio: 'Hey, I\'m busy with my Shaadow, and You? 😁',
            userProfessionTitle: '',
            userChosenVirtualNumber: '',
            registeredDeviceToken: curDevRegCode,
            userJoinedOn: firestore.FieldValue.serverTimestamp()
          })
          .then(async () => {
            console.log('User added!');
            handleSignOut();
            addNewUser(uniqueUserID);

            const curUserId = await getAsyncData('_swd-c-user'); //get current user id

            if (curUserId === '' || curUserId === null) {
              // if user id is null then store new user id
              await storeAsyncData('_swd-c-user', uniqueUserID);
            } else {
              // if user id is not null then get current user id
              await removeAsyncData('_swd-c-user');
            }

            // redirectMe('ChooseVirtualNumber');

          });

      } else {
        handleSignOut();
      }




      // console.log(storedNumber)


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error)
        handleSignOut();
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error)
        handleSignOut();

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error)
        handleSignOut();

      } else {
        // some other error happened
        console.log(error)
        handleSignOut();

      }
    }

  }



  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME.data === 'DARK' ? Black_00 : White_ff, alignItems: 'center' }}>
        <StatusBar
          backgroundColor={THEME.data === 'DARK' ? Black_00 : White_ff}
          hidden={false}
          barStyle={THEME.data === 'DARK' ? 'light-content' : 'dark-content'}
        />


        <View style={LoginScreen_Styling.mainContainer}>
          <View style={LoginScreen_Styling.subMainContainer}>
            <View style={LoginScreen_Styling.headerCont}>
              <View style={{ width: '100%', height: moderateScale(60), justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../images/site-logo/proto-132393-dfmkfjigj-4.png')} style={{ width: moderateScale(50), height: moderateScale(50), alignSelf: 'center' }} />
              </View>

              <View style={LoginScreen_Styling.headerTextView}>
                <Text style={[LoginScreen_Styling.headerTxt, { color: THEME.data === "DARK" ? White_ff : Black_00, fontSize: scale(28) }]}>Welcome to Shaadow</Text>
                <Text style={[LoginScreen_Styling.headerTxt, { color: White_b3, fontSize: scale(16) }]}>Choose your Account</Text>
                <TouchableOpacity style={[LoginScreen_Styling.headerTxt, { color: White_b3, fontSize: scale(18), padding: 5 }]} onPress={() => { addNewUser('1123110617301002') }}>
                  <Text>add</Text></TouchableOpacity>
                <TouchableOpacity style={[LoginScreen_Styling.headerTxt, { color: White_b3, fontSize: scale(18), padding: 5 }]} onPress={() => { deleteAllUsers() }}>
                  <Text>clear all</Text></TouchableOpacity>

                {dataq.map((user, id) => {
                  return <View key={id} style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#333', marginVertical: 5 }}>
                    <Text>{user}</Text>

                    <TouchableOpacity onPress={() => deleteSingleUser(id)}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                })}
              </View>
            </View>

            <View style={LoginScreen_Styling.identityProviderCont}>
              <View style={[LoginScreen_Styling.providerView, { marginTop: 0 }]}>
                <TouchableOpacity
                  style={{ width: '100%', height: '100%' }}
                  onPress={() => {
                    onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
                  }}>
                  <View style={[LoginScreen_Styling.providerIconView, {}]}>
                    <Image source={require('../images/signup/google_g_u9093nfef.png')} style={LoginScreen_Styling.providerIconImg} />
                  </View>
                  <View style={LoginScreen_Styling.providerTextView}>
                    <Text style={LoginScreen_Styling.providerTxt}>Continue with Google</Text>
                  </View>
                </TouchableOpacity>
              </View>


              <Text style={{ marginTop: moderateScale(30), color: Gray_7a, textAlign: 'center', fontSize: scale(14), fontWeight: 400 }}>
                <Text style={{ fontWeight: 500 }}>Note:{' '}</Text>
                On upcoming updates we will add more options to complete the signup process, stay updated.</Text>
            </View>
          </View>
        </View>



      </SafeAreaView>
    </>
  )
}

export default LoginScreen;
const LoginScreen_Styling = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subMainContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    paddingTop: verticalScale(100)
  },
  headerCont: {
    paddingHorizontal: moderateScale(20)
  },
  headerTextView: {
    textAlign: 'center',
    width: '100%',
    paddingVertical: verticalScale(20)
  },
  headerTxt: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  identityProviderCont: {
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: verticalScale(200),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Black_24,
    padding: moderateScale(30),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  providerView: {
    width: moderateScale(320),
    height: moderateScale(40),
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: White_e0,
    marginTop: moderateScale(12),
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    // padding: moderateScale(5)
  },
  providerIconView: {
    position: 'absolute',
    left: moderateScale(20),
    top: 0,
    bottom: 0,
    width: moderateScale(35),
    height: '100%',
    // backgroundColor: 'red',
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // zIndex:1
  },
  providerIconImg: {
    width: moderateScale(25),
    height: moderateScale(25),
    // backgroundColor: 'green',

  },
  providerTextView: {
    // width: '100%',
    height: '100%',
    // backgroundColor: 'green',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerTxt: {
    fontSize: scale(18),
    color: Black_12,
    lineHeight: scale(20),
    // backgroundColor: 'green',

  }
})