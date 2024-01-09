import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Linking, TouchableOpacity, TextInput, ActivityIndicator, Dimensions, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Black_12, Black_18, Black_24, White_b3, Gray_7a, White_e0, LinkColor, Black_00, White_ff, BlackHover_28 } from '../components/Strings';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { CountryPicker } from "react-native-country-codes-picker";
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';
import showToast from '../components/ShowToast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CheckIfPhoneNumberExist from '../components/CheckIfPhoneNumberExist';
import { getAsyncData, storeAsyncData, removeAsyncData } from '../components/CustomAsyncData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../redux/ThemeSlice';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const Login = () => {

  const navigation = useNavigation();

  let [countryCode, setCountryCode] = useState('+91');
  const [countryPickerShow, setCountryPickerShow] = useState(false);

  const [mobileValue, setMobileValue] = useState('');
  const [otpValue, setOtpValue] = useState('');

  const [numLoader, setNumLoader] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);

  let [showScreenLoader, setShowScreenLoader] = useState(false);

  const [screenToggler, setScreenToggler] = useState(null);

  const [storedNumber, setStoredNumber] = useState(null);

  const [resendOtpCount, setResendOtpCount] = useState(120);


  const [showNumberConfirmation, setShowNumberConfirmation] = useState(false);






  let mobileValue_CountryCode = '';
  let newMobileValue = '';





  useEffect(() => {
    const interval = setInterval(() => {
      if (resendOtpCount == 0) {
        clearInterval(interval);
      } else {
        setResendOtpCount(resendOtpCount - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [resendOtpCount]);


  useEffect(() => {
    const b9ijno = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      console.log('back clicked');
    });

    return b9ijno;
  }, [navigation])



  const showNumberConfirmationFunction = async () => {
    newMobileValue = mobileValue.replace(/\D/g, '').slice(-10);
    if (newMobileValue.length < 10) {
      showToast("Please enter correct mobile number");

    } else {
      await removeAsyncData('tempNum');

      setShowNumberConfirmation(true);
      mobileValue_CountryCode = countryCode + newMobileValue;

      await storeAsyncData('tempNum', mobileValue_CountryCode);
    }

    fetchStoredNumber();
  }





  const sendOtpfunction = async () => {
    setShowNumberConfirmation(false);
    setNumLoader(true);
    setShowScreenLoader(true);
    fetchStoredNumber();


    setMobileValue(storedNumber.replace(/\D/g, '').slice(-10));

    const confirmation = await auth().signInWithPhoneNumber(storedNumber);
    setScreenToggler(confirmation);
    // console.log(confirmation);


    setMobileValue('');
    showToast('OTP sent to your mobile number');



    setShowScreenLoader(false)
    setNumLoader(false);
  }



  const fetchStoredNumber = async () => {
    const tempnumber = await getAsyncData('tempNum');
    setStoredNumber(tempnumber);
  };




  const verifyOtpfunction = async () => {
    setOtpLoader(true);
    setShowScreenLoader(true);



    if (otpValue.length != 6) {
      showToast("Please enter valid OTP");
    } else {
      try {
        setOtpValue(otpValue);
        const res = await screenToggler.confirm(otpValue);

        if (res) {
          // console.log(res)
          showToast('Your number verified successfully');
        } else {
          navigation.navigate('Login');
        }

        const isExistNumber = await CheckIfPhoneNumberExist(storedNumber);
        console.log(isExistNumber);

        setOtpValue('');

        if (isExistNumber == "false") {
          navigation.navigate('Signup');
        } else {
          navigation.navigate('ChooseVirtualNumber');
        }

      } catch (error) {
        setOtpValue('');
        showToast('Something went wrong! Try later.');
        console.log("verify error: " + error);
        navigation.navigate('Login');
      }
    }
    setShowScreenLoader(false);
    setOtpLoader(false);
  }



  const THEME = useSelector(state => state.theme);
  const dispatch = useDispatch();


  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: THEME.data === 'DARK' ? Black_12 : White_e0 }}>
          <StatusBar
            backgroundColor={THEME.data === 'DARK' ? Black_12 : White_e0}
            hidden={false}
            barStyle={THEME.data === 'DARK' ? 'light-content' : 'dark-content'}
          />


          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
          }}>
            <>
              <View style={[login_Styling.mainContainer,
              { backgroundColor: THEME.data === 'DARK' ? Black_12 : White_e0 }]}>



                {/* body content */}
                <View style={[login_Styling.bodyContainer, {
                  backgroundColor: THEME.data === 'DARK' ? Black_12 : White_e0
                }]}>
                  <View style={login_Styling.firstSectionBody}>

                    {/* main body section */}
                    <View style={{ height: '100%' }}>


                      {screenToggler == null ? (
                        <>
                          {/* number area */}
                          <View style={{ height: '100%' }}>

                            <View style={login_Styling.themeChangerArea}>
                              {THEME.data === 'DARK' ? (
                                <TouchableOpacity style={[login_Styling.themeChangerButon]} onPress={() => {
                                  dispatch(changeTheme('LIGHT'))
                                }}>
                                  <View style={{ justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', flexDirection: 'row' }}>
                                    <MaterialIcons name="dark-mode" size={moderateScale(15)} color={THEME.data === 'DARK' ? White_ff : Black_00} />
                                    <Text style={{ marginHorizontal: moderateScale(2), color: THEME.data === 'DARK' ? White_ff : Black_00, fontSize: 16, lineHeight: 20 }}>Dark</Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={moderateScale(18)} color={THEME.data === 'DARK' ? White_ff : Black_00} />
                                  </View>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity style={[login_Styling.themeChangerButon]} onPress={() => {
                                  dispatch(changeTheme('DARK'))
                                }}>
                                  <View style={{ justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', flexDirection: 'row' }}>
                                    <MaterialIcons name="light-mode" size={moderateScale(15)} color={THEME.data === 'DARK' ? White_ff : Black_00} />
                                    <Text style={{ marginHorizontal: moderateScale(2), color: THEME.data === 'DARK' ? White_ff : Black_00, fontSize: 16, lineHeight: 20 }}>Light</Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={moderateScale(18)} color={THEME.data === 'DARK' ? White_ff : Black_00} />
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>



                            {/* number area */}
                            <View style={{ height: moderateScale(650), marginTop: verticalScale(50), paddingHorizontal: moderateScale(30), paddingTop: moderateScale(50) }}>
                              <View style={{ width: '100%', height: moderateScale(60), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../images/site-logo/proto-132393-dfmkfjigj-4.png')} style={{ width: moderateScale(50), height: moderateScale(50), alignSelf: 'center' }} />
                              </View>


                              <View style={{ marginTop: verticalScale(30) }}>
                                <Text style={[login_Styling.pageHeader, {
                                  color: THEME.data === 'DARK' ? White_e0 : Black_12
                                }]}>Welcome back!</Text>
                                <Text style={login_Styling.pageParagraph}>Login to continue</Text>
                              </View>


                              {/* number input field */}
                              <View style={login_Styling.inputContainer}>
                                <TouchableOpacity
                                  onPress={() => setCountryPickerShow(true)}
                                  style={[login_Styling.inputBox, login_Styling.countryCodeInputBox, {
                                    color: THEME.data === 'DARK' ? White_e0 : Black_12,
                                    backgroundColor: THEME.data === 'DARK' ? Black_24 : White_b3
                                  }]}
                                >
                                  <Text style={{
                                    color: THEME.data === 'DARK' ? White_e0 : Black_12,
                                    fontSize: 20,
                                    lineHeight: 25,
                                    width: '100%',
                                    textAlign: 'center'
                                  }}>
                                    {countryCode}
                                  </Text>
                                </TouchableOpacity>

                                <CountryPicker
                                  show={countryPickerShow}
                                  // when picker button press you will get the country object with dial code
                                  pickerButtonOnPress={(item) => {
                                    setCountryCode(item.dial_code);
                                    setCountryPickerShow(false);
                                  }}
                                  popularCountries={['en', 'ua', 'pl']}
                                  style={{
                                    modal: {
                                      height: '65%',
                                      paddingBottom: 0,
                                      backgroundColor: THEME.data === 'DARK' ? BlackHover_28 : White_b3,
                                      position: 'absolute',
                                      bottom: 0
                                    },
                                    itemsList: {
                                      color: THEME.data === 'DARK' ? White_b3 : Black_24,
                                      fontSize: moderateScale(15),
                                      fontWeight: '300',
                                      marginTop: moderateScale(5),
                                      height: verticalScale(450),
                                      padding: 0
                                    },
                                    line: {
                                      display: 'none'
                                    },
                                    backdrop: {
                                      backgroundColor: '#00000050',
                                    },
                                    countryButtonStyles: {
                                      backgroundColor: THEME.data === 'DARK' ? Black_18 : Black_24,
                                    },
                                    textInput: {
                                      height: 46,
                                      paddingHorizontal: moderateScale(20),
                                      fontSize: moderateScale(16),
                                      backgroundColor: THEME.data === 'DARK' ? Black_18 : Black_24,
                                      color: White_b3,
                                    },
                                    dialCode: {
                                      color: White_b3,
                                      fontSize: moderateScale(15),
                                      fontWeight: '300'
                                    },
                                    countryName: {
                                      color: White_b3,
                                      fontSize: moderateScale(15),
                                      fontWeight: '300'
                                    }
                                  }}
                                />

                                <TextInput
                                  style={[login_Styling.inputBox, {
                                    backgroundColor: THEME.data === 'DARK' ? Black_24 : White_b3,
                                    color: THEME.data === 'DARK' ? White_e0 : Black_12,
                                    width: moderateScale(240),
                                    paddingHorizontal: 2,
                                    letterSpacing: 1,
                                    borderTopRightRadius: 50,
                                    borderBottomRightRadius: 50,
                                    borderLeftWidth: 0
                                  }]}
                                  onChangeText={txt => {
                                    setMobileValue(txt);
                                  }}
                                  value={mobileValue}
                                  placeholder="Phone Number"
                                  keyboardType={'number-pad'}
                                  maxLength={10}
                                  placeholderTextColor={Gray_7a}
                                  enterKeyHint="next"
                                  onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                    showNumberConfirmationFunction();
                                  }}
                                />
                              </View>


                              {mobileValue.length == 10 ? (
                                <View style={login_Styling.formSubmitBtnContainer}>
                                  <TouchableOpacity style={[login_Styling.formSubmitButton,
                                  { backgroundColor: THEME.data === 'DARK' ? White_e0 : Black_12 }]}
                                    onPress={() => {
                                      Keyboard.dismiss();
                                      showNumberConfirmationFunction();
                                    }}
                                    disabled={mobileValue.length < 10}>
                                    {numLoader ? (
                                      <ActivityIndicator color={Black_12} style={{ marginLeft: 15 }} size={30} />
                                    ) : (
                                      <Text style={[login_Styling.formSubmitBtnText,
                                      { color: THEME.data === 'DARK' ? Black_12 : White_e0 }]}>Send OTP</Text>
                                    )}
                                  </TouchableOpacity>

                                </View>
                              ) : null}

                              {/* 
                              <TouchableOpacity style={login_Styling.tryAnotherWayBtn}
                                onPress={() => {
                                  setBottomSheetVisible(true);
                                }}>
                                <Text style={login_Styling.tryAnotherWayButtonTxt}>Try another way</Text>
                              </TouchableOpacity> */}

                            </View>


                            {showNumberConfirmation && (
                              <>
                                <View style={login_Styling.numberConfirmMainArea}>
                                  <View style={[login_Styling.numberConfirmBoxView, {
                                    backgroundColor: THEME.data === 'DARK' ? BlackHover_28 : White_ff
                                  }]}>
                                    <View style={{ padding: moderateScale(20) }}>
                                      <Text style={[login_Styling.numberConfirmBoxText1, {
                                        color: THEME.data === 'DARK' ? White_b3 : BlackHover_28,
                                      }]}>
                                        You'll be redirected to the verification screen
                                      </Text>
                                      <Text style={[login_Styling.numberConfirmBoxText2NO, {
                                        color: THEME.data === 'DARK' ? White_e0 : Black_12,
                                      }]}>
                                        {storedNumber}
                                      </Text>
                                      <Text style={[login_Styling.numberConfirmBoxText3, {
                                        color: THEME.data === 'DARK' ? White_b3 : BlackHover_28,
                                      }]}>
                                        Are you sure that this number is correct, if not you can edit else continue.
                                      </Text>
                                    </View>

                                    <View style={login_Styling.numberConfirmBoxButtonFlexView}>
                                      <View>
                                        <View style={login_Styling.numberConfirmBoxButtonFlexGrp}>
                                          <TouchableOpacity style={[login_Styling.numberConfirmBoxBtnStyle, { borderColor: THEME.data === 'DARK' ? White_e0 : Black_12 }]}
                                            onPress={() => {
                                              setShowNumberConfirmation(false);
                                            }}>
                                            <Text style={[login_Styling.numberConfirmBoxBtnTextStyle, { color: THEME.data === 'DARK' ? White_e0 : Black_12 }]}>Edit</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={[login_Styling.numberConfirmBoxBtnStyle, { backgroundColor: LinkColor, borderColor: LinkColor, }]}
                                            onPress={() => {
                                              sendOtpfunction();
                                              setNumLoader(true);
                                              fetchStoredNumber();
                                            }}>
                                            <Text style={[login_Styling.numberConfirmBoxBtnTextStyle, { color: White_e0 }]}>Continue</Text>
                                          </TouchableOpacity>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </>
                            )}




                            {/* body 4th section */}
                            <View style={login_Styling.bottomLegalArea}>
                              <Text style={login_Styling.bottomLegalTextBox}>
                                <Text style={login_Styling.bottomLegalText}>
                                  By continuing, I accept
                                  <Text style={login_Styling.linkTextBtn} onPress={() => Linking.openURL('https://shaadow.in/legal/terms.html')}>
                                    {" "}terms of use
                                  </Text>,
                                  <Text style={login_Styling.linkTextBtn} onPress={() => Linking.openURL('https://shaadow.in/legal/privacy-policy.html')}>
                                    {" "}privacy policy
                                  </Text> and
                                  <Text style={login_Styling.linkTextBtn} onPress={() => Linking.openURL('http://shaadow.in/legal/platform-rule')}>
                                    {" "}platform rule
                                  </Text>
                                </Text>
                              </Text>
                            </View>

                          </View>
                        </>





                      ) : (





                        <>
                          {/* otp area */}
                          <View style={{ height: '100%' }}>
                            {/* screen header area - otp area */}
                            <View style={{ height: '100%', marginTop: moderateScale(60), paddingHorizontal: moderateScale(30), paddingTop: moderateScale(50) }}>
                              <View style={{ width: '100%', height: moderateScale(60), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../images/site-logo/proto-132393-dfmkfjigj-4.png')} style={{ width: moderateScale(50), height: moderateScale(50), alignSelf: 'center' }} />
                              </View>

                              <View style={{ marginTop: verticalScale(30) }}>
                                <Text style={[login_Styling.pageHeader, {
                                  color: THEME.data === 'DARK' ? White_e0 : Black_12
                                }]}>Verify your number</Text>
                                <Text style={login_Styling.pageParagraph}>Enter the OTP just sent to{" "}
                                  <Text style={{ color: LinkColor }}>
                                    {storedNumber}
                                  </Text>
                                </Text>
                              </View>


                              {/* otp input field */}
                              <View style={login_Styling.inputContainer}>
                                <TextInput
                                  style={[login_Styling.inputBox, {
                                    backgroundColor: THEME.data === 'DARK' ? Black_24 : White_b3,
                                    color: THEME.data === 'DARK' ? White_e0 : Black_12,
                                    width: moderateScale(300),
                                    paddingHorizontal: 2,
                                    letterSpacing: 1,
                                    borderRadius: 50,
                                    borderLeftWidth: 0,
                                    textAlign: 'center'
                                  }]}
                                  onChangeText={otpText => {
                                    setOtpValue(otpText);
                                  }}
                                  value={otpValue}
                                  keyboardType={'number-pad'}
                                  maxLength={6}
                                  enterKeyHint="next"
                                  autoFocus={true}
                                  onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                    setOtpLoader(true);
                                    verifyOtpfunction();
                                  }}
                                />
                              </View>



                              {/* otp submit button section */}
                              {otpValue.length == 6 ? (
                                <View style={login_Styling.formSubmitBtnContainer}>
                                  <TouchableOpacity style={[login_Styling.formSubmitButton,
                                  { backgroundColor: THEME.data === 'DARK' ? White_e0 : Black_12 }]}
                                    onPress={() => {
                                      Keyboard.dismiss();
                                      setOtpLoader(true);
                                      verifyOtpfunction();
                                    }}
                                    disabled={otpValue.length < 6}>
                                    {otpLoader ? (
                                      <ActivityIndicator color={Black_12} style={{ marginLeft: 15 }} size={30} />
                                    ) : (
                                      <Text style={[login_Styling.formSubmitBtnText,
                                      { color: THEME.data === 'DARK' ? Black_12 : White_e0 }]}>Verify OTP</Text>
                                    )}
                                  </TouchableOpacity>
                                </View>
                              ) : null}

                              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(30) }}>
                                <TouchableOpacity onPress={() => {
                                  setResendOtpCount(120);
                                }}>
                                  {resendOtpCount == 0 ? (
                                    <Text style={{ color: THEME.data === 'DARK' ? White_e0 : Black_12, fontSize: 18 }}>Resend OTP{' '}</Text>
                                  ) : (
                                    <Text style={{ color: Gray_7a, fontSize: 18 }}>Resend OTP{' '}{resendOtpCount + 's'}</Text>
                                  )}
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                    </View>
                  </View>

                </View>


              </View>
            </>
          </TouchableWithoutFeedback>
        </SafeAreaView>

        {/* <DefaultBottomSheet
          bottomSheetVisible={bottomSheetVisible}
          setBottomSheetVisible={setBottomSheetVisible}
          bsHeight={220}
          avoidKeyboard={true}>
          <View>
            <Text style={{ color: THEME.data === 'DARK' ? White_e0 : Black_24, fontSize: 18 }}>You can login to your account using:</Text>

            <View style={{ marginTop: moderateScale(30) }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('You clicked on TrueCaller')
                }}
                style={[login_Styling.otherSigninOpBtnView, { borderColor: '#1180FF', marginTop: 0 }]}>
                <MaterialIcons name="call" size={moderateScale(19)} color={'#1180FF'} />
                <Text style={[login_Styling.otherSigninOpButtonText, { color: '#1180FF' }]}>TrueCaller</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log('You clicked on WhatsApp')
                }}
                style={[login_Styling.otherSigninOpBtnView, { borderColor: '#4fce5d' }]}>
                <Ionicons name="logo-whatsapp" size={moderateScale(19)} color={'#4fce5d'} />
                <Text style={[login_Styling.otherSigninOpButtonText, { color: '#4fce5d' }]}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </DefaultBottomSheet> */}

        {showScreenLoader && <Loader />
        }

      </GestureHandlerRootView>
    </>
  )
}

export default Login;
const login_Styling = StyleSheet.create({

  mainContainer: {
    width: screenWidth,
    height: screenHeight,
  },
  themeChangerArea: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: verticalScale(10),
    left: moderateScale(30)
  },
  themeChangerButon: {
    // width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // backgroundColor: 'blue'
  },
  firstSectionBody: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    width: screenWidth,
    height: screenHeight,
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  pageHeader: {
    fontSize: moderateScale(32),
    width: '100%',
    lineHeight: moderateScale(38),
    letterSpacing: 0.2,
    textAlign: 'center',
    fontWeight: '500',
    alignSelf: 'center',
  },
  pageParagraph: {
    color: Gray_7a,
    textAlign: 'center',
    fontSize: moderateScale(20),
    marginTop: moderateScale(8),
    width: '95%',
    alignSelf: 'center',
    fontWeight: '300'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(30),
    justifyContent: 'center',
    marginTop: moderateScale(60)
  },
  inputBox: {
    height: verticalScale(42),
    paddingHorizontal: moderateScale(10),
    fontSize: scale(18),
    fontWeight: '400',
  },
  countryCodeInputBox: {
    width: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderRightWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: moderateScale(5),
  },
  formSubmitBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(15)
  },
  formSubmitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(300),
    height: verticalScale(42),
    borderRadius: 50,
    flexDirection: 'row',
  },
  formSubmitBtnText: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(24),
  },
  tryAnotherWayBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(30)
  },
  tryAnotherWayButtonTxt: {
    color: LinkColor,
    fontSize: moderateScale(16),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50
  },
  bottomLegalArea: {
    height: verticalScale(50),
    width: '100%',
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20)
  },
  bottomLegalTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: moderateScale(300)
  },
  bottomLegalText: {
    textAlign: 'center',
    maxWidth: moderateScale(300),
    fontSize: moderateScale(14),
    color: Gray_7a,
  },
  linkTextBtn: {
    color: LinkColor
  },
  numberConfirmMainArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000050',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  },
  numberConfirmBoxView: {
    width: moderateScale(350),
    borderRadius: 12,
  },
  numberConfirmBoxText1: {
    fontSize: 19,
    lineHeight: 22,
  },
  numberConfirmBoxText2NO: {
    fontWeight: 500,
    fontSize: 22,
    marginTop: 10,
    lineHeight: 25,
    letterSpacing: 1
  },
  numberConfirmBoxText3: {
    fontSize: 19,
    lineHeight: 22,
    marginTop: 8
  },
  numberConfirmBoxButtonFlexView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: moderateScale(20),
    marginTop: moderateScale(20)
  },
  numberConfirmBoxButtonFlexGrp: {
    flexDirection: 'row',
    width: moderateScale(310),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: moderateScale(35)
  },
  numberConfirmBoxBtnStyle: {
    width: moderateScale(150),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 50,
  },
  numberConfirmBoxBtnTextStyle: {
    fontSize: 22,
    lineHeight: 25
  },
  otherSigninOpBtnView: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: verticalScale(12)
  },
  otherSigninOpButtonText: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: 500,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  }
})