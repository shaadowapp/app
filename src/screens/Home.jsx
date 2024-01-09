import { StatusBar, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Black_00, White_ff, Gray_7a } from '../components/Strings';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../redux/ThemeSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Home = () => {
  const navigation = useNavigation();

  const THEME = useSelector(state => state.theme)
  // console.log(THEME);
  const dispatch = useDispatch();



  const redirectMe = (place) => {
    navigation.navigate(place);
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME.data === 'DARK' ? Black_00 : White_ff, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar
          backgroundColor={THEME.data === 'DARK' ? Black_00 : White_ff}
          hidden={false}
          barStyle={THEME.data === 'DARK' ? 'light-content' : 'dark-content'}
        />


        <Text style={{ fontSize: 30, fontWeight: 500, color: THEME.data === 'DARK' ? White_ff : Black_00 }}>Home Screen</Text>
        <Text style={{ fontSize: 20, color: Gray_7a, marginTop: 20 }}>Current Theme: <Text style={{ fontSize: 24, color: THEME.data === 'DARK' ? White_ff : Black_00, fontWeight: 500 }}>{THEME.data}</Text></Text>

        <View style={{ marginTop: 18 }}>
          {THEME.data === 'DARK' ? (
            <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: White_ff, borderRadius: 50 }}
              onPress={() => {
                dispatch(changeTheme('LIGHT'))
              }}>
              <Text style={{ fontSize: 20, color: Black_00 }}>Turn on light mode</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: Black_00, borderRadius: 50 }}
              onPress={() => {
                dispatch(changeTheme('DARK'))
              }}>
              <Text style={{ fontSize: 20, color: White_ff }}>Turn on dark mode</Text>
            </TouchableOpacity>
          )}
        </View>


        <TouchableOpacity onPress={() => {
          redirectMe('Signup')
        }}>
          <Text style={{ fontSize: 20, color: THEME.data === 'DARK' ? White_ff : Black_00, marginTop: 50 }}>Go to signup screen</Text>
        </TouchableOpacity>


        <Icon name="arrow-back" size={30} color="#900" />



      </SafeAreaView>
    </>
  )
}

export default Home