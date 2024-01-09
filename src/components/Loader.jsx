import { View, ActivityIndicator, SafeAreaView, Dimensions, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { Black_00, Black_18, Black_24, LinkColor, White_a7, White_ff } from './Strings';
import { useSelector } from 'react-redux';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

let deviceScreenWidth = Dimensions.get('window').width;
let deviceScreenHeight = Dimensions.get('window').height;

const Loader = () => {
    const THEME = useSelector(state => state.theme);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: THEME.data === 'DARK' ? Black_18 : White_a7, height: deviceScreenHeight, width: deviceScreenWidth, position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 1004, backgroundColor: 'transparent' }}>
                <View style={{ height: '100%',width:'100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <>
                        <View>
                            <View
                                style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: scale(200), height: scale(150), backgroundColor: THEME.data === 'DARK' ? Black_18 : White_a7, borderRadius: moderateScale(18) }}>
                                <ActivityIndicator size={50} color={LinkColor} />
                                <Text style={{ fontSize: moderateScale(18), color: THEME.data === 'DARK' ? White_ff : Black_00, marginTop: moderateScale(15) }}>Loading...</Text>
                            </View>
                        </View>
                    </>
                </View>

            </SafeAreaView>
        </>
    )
}

export default Loader;