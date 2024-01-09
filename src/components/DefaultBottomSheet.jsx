import React from 'react';
import Modal from "react-native-modal";
import { White_e0, Gray_7a, Black_24 } from '../components/Strings';
import { View, Dimensions, StyleSheet } from 'react-native'
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../redux/ThemeSlice';


const screenHeight = Dimensions.get('window').height;

const DefaultBottomSheet = ({ bottomSheetVisible, setBottomSheetVisible, children, bsHeight, avoidKeyboard }) => {
    if (!bottomSheetVisible) {
        return null; // Don't render anything if not visible
    }


    const THEME = useSelector(state => state.theme);
    return (
        <>
            <Modal
                isVisible={bottomSheetVisible}
                style={{ width: '100%', height: screenHeight, margin: 0 }}
                onBackButtonPress={() => {
                    setBottomSheetVisible(false);
                }}
                onBackdropPress={() => {
                    setBottomSheetVisible(false);
                }}
                avoidKeyboard={avoidKeyboard}>
                <View style={[bottomSheetStyling.bsContainer, { height: verticalScale(bsHeight), backgroundColor: THEME.data === 'DARK' ? Black_24 : White_e0 }]}>
                    <View style={bottomSheetStyling.bsLine} />
                    <View style={[bottomSheetStyling.bsChildren, {backgroundColor: THEME.data === 'DARK' ? Black_24 : White_e0}]}>
                        {children}
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default DefaultBottomSheet;




const bottomSheetStyling = StyleSheet.create({
    bsContainer: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    bsLine: {
        width: 75,
        height: 4,
        backgroundColor: Gray_7a,
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 50
    },
    bsChildren: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 5
    }
});