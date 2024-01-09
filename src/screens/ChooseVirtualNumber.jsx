import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { Black_00, White_ff, White_b3, White_e0, Black_12, Black_24, Gray_7a, LinkColor, Black_18, White_a8 } from '../components/Strings';
import { useSelector, useDispatch } from 'react-redux';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { getAsyncData } from '../components/CustomAsyncData';


const ChooseVirtualNumber = () => {
    const [numbers, setNumbers] = useState([]);
    const THEME = useSelector(state => state.theme);
    let [checkNumber, setCheckNumber] = useState('');
    let [numberResPopup, setNumberResPopup] = useState(false);
    const [storedUserId, setStoredUserId] = useState(null);




    // Function to generate 10 random numbers
    const generateNumbers = () => {
        const newNumbers = [];
        for (let i = 0; i < 5; i++) {
            const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Random 10-digit numbers
            newNumbers.push(randomNumber);
        }
        setNumbers(newNumbers);
    };

    const fetchStoredUserSerialNo = async () => {
        const userId = await getAsyncData('__currentUserId');
        // console.log("userId: ", userId)
        setStoredUserId(userId);
    };


    useEffect(() => {
        generateNumbers();
        fetchStoredUserSerialNo();
    }, []);

    const CheckVirtualPhoneNumberExist = async (fieldCheckData) => {
        const snapshot = await firestore()
            .collection('Users_79k80')
            .where('userChosenVirtualNumber', '==', fieldCheckData)
            .get();

        for (const doc of snapshot.docs) {
            if (doc.exists && doc.data().userChosenVirtualNumber === fieldCheckData) {
                return 'true';
            } else {
                return 'false';
            }
        }

        return 'false';
    }


    // Function to handle number selection
    const handleNumberClick = async (number, index) => {
        setNumberResPopup(true);
        // You can perform any actions you want with the selected number here
        console.log('Chosen Number:', number, ' index:', index);

        const isExistVirtualNumber = await CheckVirtualPhoneNumberExist(number);
        // console.log(isExistVirtualNumber);


        if (isExistVirtualNumber == "true") {
            console.log("existed number - " + number)
        } else {
            console.log("not existed - " + number)
        }
    };



    const getTheNumber = async (number) => {
        const isExistVirtualNumber = await CheckVirtualPhoneNumberExist(number);
        // console.log(isExistVirtualNumber);


        if (isExistVirtualNumber == "true") {
            console.log("existed number - " + number)
        } else {
            console.log("not existed - " + number)
            console.log("userid - " + storedUserId)




            firestore()
                .collection('Users_79k80')
                .doc(storedUserId)
                .update({
                    'userChosenVirtualNumber': number,
                })
                .then(() => {
                    console.log('User updated!');
                });
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


                <View style={[cvnStyling.mainContainer, {
                    backgroundColor: THEME.data === 'DARK' ? Black_00 : White_ff,
                }]}>


                    <View style={{ width: '100%', position: 'absolute', right: 0, left: 0, top: verticalScale(50), height: verticalScale(25), }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginHorizontal: moderateScale(30) }}
                            onPress={() => { }}>
                            <Text style={{ fontSize: scale(14), color: Gray_7a }}>Skip to home screen »</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={[cvnStyling.subMainContainer, { backgroundColor: THEME.data === 'DARK' ? Black_24 : White_e0 }]}>

                        <View style={{ padding: moderateScale(20), paddingBottom: 0 }}>
                            <Text style={[cvnStyling.pageHeading, { color: THEME.data === 'DARK' ? White_e0 : Black_12 }]}>Choose a virtual number</Text>
                            <Text style={cvnStyling.pageParag}>Click the number which you want to use on Shaadow as your virtual number.</Text>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', }}><Text style={{ fontWeight: 500, color: Gray_7a, fontSize: scale(14) }}>Note:</Text><Text style={{ color: Gray_7a, fontSize: scale(14) }}>You cannot change it in the future.</Text></View>
                        </View>


                        <View style={cvnStyling.numberListBodyContainer}>
                            {numbers.map((number, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        handleNumberClick(number, index);
                                        setCheckNumber(number);
                                    }}
                                >
                                    <View style={cvnStyling.numberPeerView}>
                                        <Text style={cvnStyling.numberPeerText}>{number}</Text>
                                        <View style={{ paddingHorizontal: moderateScale(12), paddingVertical: moderateScale(4), backgroundColor: THEME.data === 'DARK' ? Black_18 : White_a8, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                                            <Text style={{ fontSize: scale(13) }}>Check availability</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={cvnStyling.containerFooter}>
                            <View style={cvnStyling.cfButtonView}>
                                <TouchableOpacity style={cvnStyling.cfBtnStyle} onPress={generateNumbers}>
                                    <Text style={cvnStyling.cfBtnText}>Regenerate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {numberResPopup && (
                    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%', height: '100%' }}>
                            <Text style={{ fontSize: 28, color: Black_12, padding: 15, backgroundColor: White_e0 }}>{checkNumber}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 25, color: '#fff', padding: 15, backgroundColor: 'red' }}
                                    onPress={() => {
                                        setNumberResPopup(false)
                                    }}>Cancle</Text>
                                <Text style={{ fontSize: 25, color: '#fff', padding: 15, backgroundColor: 'blue' }}
                                    onPress={() => {
                                        getTheNumber(checkNumber)
                                    }}>get it</Text>
                            </View>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </>
    );
};

export default ChooseVirtualNumber;
const cvnStyling = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subMainContainer: {
        width: moderateScale(340),
        height: verticalScale(480),
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        overflow: 'hidden'
    },
    pageHeading: {
        fontSize: scale(22),
        lineHeight: scale(26),
        textAlign: 'center',
        marginBottom: moderateScale(8)
    },
    pageParag: {
        color: Gray_7a,
        lineHeight: scale(16),
        fontSize: scale(14),
        textAlign: 'center',
        // backgroundColor:'red'
    },
    numberListBodyContainer: {
        marginTop: moderateScale(15),
        width: '100%',
        height: verticalScale(400),
        paddingHorizontal: moderateScale(18)
    },
    numberPeerView: {
        borderWidth: 1,
        borderColor: Gray_7a,
        width: '100%',
        height: verticalScale(55),
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: moderateScale(8),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    numberPeerText: {
        color: LinkColor,
        fontSize: scale(22),
        lineHeight: scale(26),
        letterSpacing: moderateScale(2),
        // backgroundColor:'red'
    },
    containerFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: verticalScale(60),
        // backgroundColor: 'red',
        padding: moderateScale(18)
    },
    cfButtonView: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cfBtnStyle: {
        width: '100%',
        height: verticalScale(35),
        borderWidth: 1,
        borderColor: Gray_7a,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cfBtnText: {
        fontSize: scale(16),
        color: Gray_7a,
    }
})