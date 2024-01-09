import firestore from '@react-native-firebase/firestore';

const CheckIfPhoneNumberExist = async (fieldCheckData) => {
    const snapshot = await firestore()
        .collection('Users_79k80')
        .where('userPersonalPhoneNumber', '==', fieldCheckData)
        .get();

    for (const doc of snapshot.docs) {
        if (doc.exists && doc.data().userPersonalPhoneNumber === fieldCheckData) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

export default CheckIfPhoneNumberExist