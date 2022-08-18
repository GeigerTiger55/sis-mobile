import * as React from "react";
import { View, Button } from "react-native";
import { createDrawerNavigator, DrawerContent, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { COLORS } from '../vocabs';
import ItemDetail from '../screens/ItemDetail';
import Home from '../screens/Home';
import ItemsByType from '../screens/ItemsByType';

const Drawer = createDrawerNavigator();

export default function HamburgerDrawer(props) {

  return (
    <DrawerContent>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContent>
  );

}