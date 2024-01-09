import AsyncStorage from '@react-native-async-storage/async-storage';



export let getAsyncData = async (key) => {
    try {
        let currentValue = await AsyncStorage.getItem(key);

        if (currentValue !== null) {
            return currentValue;
        }
    } catch (error) {
        console.log("get data error: " + error);
    }
};



export let storeAsyncData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return value;
    } catch (error) {
        console.log("store data error: " + error);
    }
};



export let removeAsyncData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (error) {
        console.log("store data error: " + error);
        return false;
    }
}

