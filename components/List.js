import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet
} from 'react-native';

import Item from "./Item";
import { COLORS } from "../vocabs";


/** Show list of items for a cohort
 *
 * props:
 * - cohortItems [
 * {description,
 * id,
 * staff_terse,
 * start_at,
 * start_date,
 * status,
 * title,
 * type,
 * week_group
 * }, ...]
 * - navigation
 *
 * Home -> List -> Item
 */

export default function List({ cohortItems, navigation }) {

  function renderItem({ item }) {
    return (
      <View >
        <Item style={[styles.item]} session={item} navigation={navigation} />
      </View>
    );
  }

  function itemDivider() {
    return (
      <View
        style={[styles.itemDivider]}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container]}>

      <View style={[styles.listHeader]}>
        <Text style={[styles.listCell]}>Date</Text>
        <Text style={[styles.listCell]}>Start Time</Text>
        <Text style={[styles.listCellTitle]}>Title</Text>
      </View>
      <View
        style={[styles.tableDivider]}
      />
      <FlatList
        data={cohortItems}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}-${item.type}`}
        ItemSeparatorComponent={itemDivider}
      />

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  listCell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  listCellTitle: {
    flex: 2,
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemDivider: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGrey
  },
  tableDivider: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.darkGrey
  }
});