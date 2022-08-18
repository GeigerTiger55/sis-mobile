import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login';
import SisApi from './api';
import Home from './screens/Home';
import ItemsByType from './screens/ItemsByType';
import ItemDetail from './screens/ItemDetail';
import { COLORS } from './vocabs';
import LogoTitle from './components/LogoTitle';
import HamburgerDrawer from './components/HamburgerDrawer';


// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


/**SIS application
 *
 * state: token
 *
 * App -> {Login, Home}
 */
export default function App() {
  const [token, setToken] = useState('');
  const [cohortItems, setCohortItems] = useState([]);

  /** Login function makes API call
   *
   *  Takes:
   *  - form data from LoginForm
   *
   *  Sets
   *  - token
   *
   */
  async function loginUser(userData) {
    console.log('loginUser');
    const token = await SisApi.logIn(userData);
    setToken(token);
    fetchCohortItems();
  }

  /** Logout function set token to none */
  function logoutUser() {
    setToken(null);
    SisApi.token = null;
  }
  
  /**Calls SisApi to get all cohort items and update state  */
  async function fetchCohortItems() {
    console.log("fetchCohortItems");
    let apiCohortItems = await SisApi.getCohortItems();
    apiCohortItems = apiCohortItems.filter(i => i.status === "published");
    setCohortItems(apiCohortItems);
  };

  /**displays list of cohort items */
  return (
    <NavigationContainer>
      {token
        ? (<Drawer.Navigator
          userLegacyImplementation
          drawerType='front'
          initialRouteName='Home'
          drawerContent={(props) => <HamburgerDrawer {...props} />}
          screenOptions={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            // drawerPosition: "right"
            // ,
            // headerLeft: () => (
            //   <Button onPress={() => navigation.goBack()} title="<" />
            // )
          }} >
          {/* <Stack.Screen
            name="HamburgerDrawer"
            component={HamburgerDrawer}
            options={{ headerShown: true }}
          /> */}
          <Drawer.Screen name='Home'>
            {(props) => <Home {...props} cohortItems={cohortItems} />}
          </Drawer.Screen>
          <Drawer.Screen name='ItemsByType'>
            {(props) => <ItemsByType {...props} cohortItems={cohortItems} />}
          </Drawer.Screen>
          <Drawer.Screen
            name='ItemDetail'
            component={ItemDetail}
          />
        </Drawer.Navigator>)
        : (<Drawer.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }} >
          <Drawer.Screen name='Login'>
            {(props) => <Login {...props} loginUser={loginUser} />}
          </Drawer.Screen>
        </Drawer.Navigator>)
      }
    </NavigationContainer >
  );
}

