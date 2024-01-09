import { StyleSheet } from "react-native";
import { Black_00, Black_12, Black_18, Black_24, White_ff, White_b3, Gray_7a, White_e0, LinkColor } from '../components/Strings';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const loginSignupStyling = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Black_00,
        alignItems: 'center',
        position: 'relative'
    },
    bodyContainer: {
        backgroundColor: Black_00,
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: verticalScale(60),
        paddingBottom: verticalScale(15),
        paddingHorizontal: moderateScale(30),
        zIndex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
    },
    pageHeader: {
        fontSize: moderateScale(28),
        color: White_e0,
        width: '100%',
        lineHeight: moderateScale(28),
        letterSpacing: 0.2,
        textAlign: 'center',
        fontWeight: '400',
        alignSelf: 'center',
    },
    pageParagraph: {
        color: Gray_7a,
        textAlign: 'center',
        fontSize: moderateScale(17),
        marginTop: moderateScale(2),
        width: '100%',
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
        height: verticalScale(40),
        paddingHorizontal: moderateScale(10),
        fontSize: scale(18),
        fontWeight: '400',
        color: White_e0,
        backgroundColor: Black_24
    },
    countryCodePicker: {
        modal: {
            height: verticalScale(400),
            backgroundColor: Black_18,
            paddingBottom: 0
        },
        itemsList: {
            color: White_b3,
            fontSize: moderateScale(15),
            fontWeight: '300',
            marginTop: moderateScale(5),
            height: verticalScale(400),
            padding: 0
        },
        line: {
            display: 'none'
        },
        backdrop: {
            // backgroundColor: Black_24,
        },
        countryButtonStyles: {
            backgroundColor: Black_24,
        },
        textInput: {
            height: 46,
            paddingHorizontal: moderateScale(20),
            fontSize: moderateScale(16),
            backgroundColor: Black_24,
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
        },
    },
    formSubmitBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    formSubmitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(320),
        height: moderateScale(50),
        borderRadius: 50,
        flexDirection: 'row',
    },
    formSubmitBtnText: {
        fontSize: moderateScale(24),
        lineHeight: moderateScale(24),
    },
    bottomLegalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    bottomLegalText: {
        textAlign: 'center',
        maxWidth: moderateScale(320),
        fontSize: moderateScale(14),
        color: Gray_7a,
    },
    linkTextBtn: {
        color: LinkColor
    }
});

export default loginSignupStyling;