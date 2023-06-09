import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SvgDarkIcon from '../../../assets/images/DarkIcon';
import SvgLightIcon from '../../../assets/images/LightIcon';
import {getTheme, setTheme, toggleTheme} from '../../../redux/theme/ThemeSlice';
import {AppDispatch, RootState} from '../../../redux';
import SvgLogOut from '../../../assets/images/LogOut';
import { setLoggedIn } from '../../../redux/login/LoginSlice';

const SettingScreen = () => {
  const themeMode = useSelector<RootState, any>(state => state.theme.themeMode);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
    if (themeMode === 'dark') {
      return dispatch(setTheme('light'));
    }
    return dispatch(setTheme('dark'));
  };

  const strokeStyle = themeMode === 'dark' ? '#000' : '#fff';

  const buttonBackColor: any = {
    backgroundColor: themeMode === 'dark' ? '#fff' : '#000',
    borderWidth: 2,
    borderColor: themeMode === 'dark' ? '#fff' : '#000',
  };

  const buttonTextColor: any = {
    color: themeMode === 'dark' ? '#000' : '#fff',
  };

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
    alignItems: 'center',
  };

  const textStyle: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const logOutButtonStyle: any = {
    position: 'absolute',
    bottom: 35,
    backgroundColor: themeMode === 'dark' ? '#fff' : '#000',
    paddingVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 50,
    flexDirection: 'row',
  };

  const handleLogOut = () => {
    dispatch(setLoggedIn({loggedIn: 'false', token: 'null'}));
  };

  return (
    <View style={[containerStyle]}>
      <View style={{flex: 1}}>
        <Text style={[styles.headerText, textStyle]}>Settings</Text>
      </View>
      <View style={{flex: 1.2, alignItems: 'center'}}>
        {themeMode === 'dark' ? <SvgDarkIcon /> : <SvgLightIcon />}
        <TouchableOpacity
          style={[styles.button, buttonBackColor]}
          onPress={() => handleToggleTheme()}>
          <Text style={[styles.buttonText, buttonTextColor]}>Change Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={logOutButtonStyle}
          onPress={() => handleLogOut()}>
          <SvgLogOut stroke={strokeStyle} />
          <Text style={[styles.buttonText, buttonTextColor]}> Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  buttonText: {
    color: '#e3e3e3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#80669d',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 50,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  logOut: {
    position: 'absolute',
    bottom: 15,
  },
});
