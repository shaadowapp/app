import firestore from '@react-native-firebase/firestore';

const CheckIfEmailExist = async (fieldCheckData) => {
    const snapshot = await firestore()
        .collection('Users_79k80')
        .where('userPersonalEmail', '==', fieldCheckData)
        .get();

    for (const doc of snapshot.docs) {
        if (doc.exists && doc.data().userPersonalEmail === fieldCheckData) {
            return 'true';
        } else {
            return 'false';
        }
    }

    return 'false';
}

export default CheckIfEmailExist