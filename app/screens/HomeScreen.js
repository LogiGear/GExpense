import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { useState, useEffect } from "react";
import * as Storage from "../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import generalStyle from "../styles/generalStyle";
import { Card, ListItem } from "react-native-elements";
import { formatMoney, daysBetween, testProps } from "../utils/common";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/en-US");

  Intl.__disableRegExpRestore(); /*For syntaxerror invalid regular expression unmatched parentheses*/
}
import logo from "../../assets/money.jpg";


const HomeScreen = ({ navigation,route }) => {
  const [expenses, setExpenses] = useState(null);
  const isFocused = useIsFocused();
  const [sectionListData, setSectionListData] = useState(null);
  useEffect(() => {
    Storage.checkTable();

  }, []);
  useEffect(() => {
    Storage.getExpenses({ setExpenses });
  }, [isFocused]);
  useEffect(() => {
    if (expenses != null) {
      setSectionListData(sortExpenses(expenses));
    }
  }, [expenses]);

  // Sorts the data for a <SectionList>
  const sortExpenses = expenses => {
    let sortedExpenses = {};
    for (let x = 0; x < expenses.length; x++) {
      let formattedDate = null;
      let tempDate = new Date(expenses[x].date);
      let days = daysBetween(Date.now(), Date.parse(tempDate));
      // set header for Today
      if (days == 0) formattedDate = "Today";
      // set header for day of the week
      else if (days < 7 && days > 0)
        formattedDate = tempDate.toLocaleString("default", { weekday: "long" });
      // Add next to days next week
      else if (days < -1 && days > -7)
        formattedDate =
          "Next " + tempDate.toLocaleString("default", { weekday: "long" });
      // set month + year for all dates more than a week in the future or past
      else
        formattedDate = tempDate.toLocaleString("default", {
          month: "long",
          year: "numeric"
        });

      if (!sortedExpenses[formattedDate]) sortedExpenses[formattedDate] = [];
      sortedExpenses[formattedDate].push(expenses[x]);
    }
    let sectionListArray = [];
    //format for SectionList
    Object.keys(sortedExpenses).forEach(function(key) {
      sectionListArray.push({ title: key, data: sortedExpenses[key] });
      // key: the name of the object key
      // index: the ordinal position of the key within the object
    });
    return sectionListArray;
  };

  //  Delete an item with the id itemid and refresh the list
  const handleDelete = itemid => {
    Storage.delExpense(itemid);
    Storage.getExpenses({ setExpenses });
  };
// Deletes if row is swiped open
  const onRowDidOpen = (rowKey, rowMap) => {
    handleDelete(rowMap[rowKey].props.id);
    console.log(rowMap[rowKey]);

  };
  if (isFocused)
    return (
      <SafeAreaView style={generalStyle.container} accessible={false}>
        <SwipeListView 
        closeOnScroll={false}
          recalculateHiddenLayout={true}
          useSectionList
          sections={sectionListData}
          extraData={expenses}
          onRowDidOpen={onRowDidOpen}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <SwipeRow id={item.id} 
            disableRightSwipe

              friction={3}
              swipeToOpenPercent={25}
              rightOpenValue={-Dimensions.get("window").width - 40}
            >
              <View>
                <ListItem
                  bottomDivider 
                  leftIcon={<ActivityIndicator  color='black' />}
                  containerStyle={{ backgroundColor: "#fd6d6d" }}
                  rightTitle="Delete"
                  rightIcon={
                    <Ionicons size={25} color="white" name="md-trash" />
                  }
                ></ListItem>
              </View>
              <View>
                <ListItem
                  {...testProps("Expense " + item.id)}
                  title={item.description}
                  titleStyle={{ fontSize: 20 }}
                  titleProps={{ ...testProps(item.description) }}
                  badge={{
                    value: formatMoney.format(item.amount),
                    ...testProps(item.amount),
                    textStyle: { fontSize: 14 }
                  }}
                  bottomDivider
                  onPress={() =>
                    navigation.navigate("EditExpense", { expenseItem: item })
                  }
                  chevron
                />
              </View>
            </SwipeRow>
          )}
          ListEmptyComponent={() => {
            return (
              <Card
                {...testProps("welcome card")}
                containerStyle={{ flex: 0.7, alignSelf: "center" }}
                title="Welcome to G Expenses"
              >
                <Text {...testProps("welcome text")}>
                  {" "}
                  Click the plus button to add an expense
                </Text>
              </Card>
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View style={{ alignSelf: "center" }}>
                <Image source={logo} />
              </View>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <ListItem
              disabled
              titleStyle={{
                color: "grey",
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
              bottomDivider
              title={title}
              titleProps={{ ...testProps(title) }}
            ></ListItem>
          )}
        />
      </SafeAreaView>
    );
  // Keep Appium from seeing this screen when it's not focused
  else return <View accessible={false}></View>;
};

export default HomeScreen;