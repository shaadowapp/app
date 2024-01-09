import { ToastAndroid } from "react-native";

const showToast = (toastText) => {
    ToastAndroid.show(toastText,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER);
};

export default showToast;