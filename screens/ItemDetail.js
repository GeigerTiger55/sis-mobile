import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from "react-native";
import { Card, Title, Paragraph, Avatar, ActivityIndicator } from 'react-native-paper';

import SisApi from "../api";
import { TYPES, COLORS } from "../vocabs";


/**Displays detailed information for one item in a cohort,
 * makes api call to get photo for staff
 *
 * props:
 *  cohort item:
 * {description,
 * id,
 * staff_terse,
 * start_at,
 * start_date,
 * status,
 * title,
 * type,
 * week_group}
 *
 * Item -> ItemDetail
 */
export default function ItemDetail({ route, navigation }) {
  const { session } = route.params;
  const [staffInfo, setStaffInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('ItemDetail', session);

  /**Calls SisApi to get all staff info */
  async function fetchStaffInfo() {
    console.log("fetchStaffInfo");
    const apiStaffInfo = [];
    for (let staff of session.staff_ids) {
      apiStaffInfo.push(await SisApi.getStaffInfo(staff));
    }

    console.log('apiStaffInfo', apiStaffInfo);
    return apiStaffInfo;
  }

  /** Calls fetchStaffInfo to get staff info and update state*/
  useEffect(
    function fetchStaffInfoOnMount() {
      async function getStaffInfo(){
        const apiStaffInfo = await fetchStaffInfo();
        setStaffInfo(apiStaffInfo);
        setIsLoading(false);
      }

      getStaffInfo();
    },
    []
  );

  const startDate = new Date(session.start_at)
    .toLocaleDateString(undefined,
      {
        weekday: 'short',
        month: 'numeric',
        day: "numeric",
      }
    );

  const startTime = new Date(session.start_at)
    .toLocaleTimeString([],
      {
        hour: 'numeric',
        minute: '2-digit',
      }
    );

  const itemType = TYPES[session.type];

  /**Shows loading page while data is being fetched from api */
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          size={200}
          color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <Card>
      <Title style={[styles.titleContainer]}>
        <Text style={[styles.cardTitle]}>{session.title}</Text>
        <Text style={[styles.cardType]} > ({itemType})</Text>
      </Title>
      <Text style={[styles.cardSubtitle]}>{`${startDate} ${startTime}`}</Text>
      <Card.Content>
        <Paragraph style={[styles.cardParagraph]}>{session.description}</Paragraph>
        <View style={styles.staffImages}>
        {staffInfo.map(s =>
          <Avatar.Image
          size={70}
          source={{ uri: s.photo }}
          style={styles.staffIcon}
          key={s.username}/>
        )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardCell: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: COLORS.title,
  },
  cardType: {
    color: COLORS.mediumGrey,
  },
  cardParagraph: {
    fontSize: 16,
  },
  staffImages: {
    flexDirection: 'row',
  },
  staffIcon: {
    margin: 10,
  },
  titleContainer:{
    marginHorizontal: 15
  },
  cardSubtitle:{
    color: COLORS.mediumGrey,
    marginHorizontal: 15,
    marginVertical: 6,
  }

});