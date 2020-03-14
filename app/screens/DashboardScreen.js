import React from "react";
import { SafeAreaView, View } from "react-native";
import { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { getMonthSpending } from "../utils/storage";
import { Card } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { formatMoney, daysSinceFirst, testProps } from "../utils/common";

const Dashboard = () => {
  const [currentMonthSum, setCurrentMonthSum] = useState("0");
  const [lastMonthSum, setLastMonthSum] = useState("0");
  const isFocused = useIsFocused();
  const currentDate = new Date();

  useEffect(() => {
    // get the Monthly spending totals 
    getMonthSpending({ setCurrentMonthSum, setLastMonthSum });
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "space-evenly",
          alignContent: "space-between"
        }}
      >
        <Card color="#4f9deb" title="This Month's Total">
          <Text {...testProps("This Months Total")}>
            {formatMoney.format(currentMonthSum)}
          </Text>
        </Card>
        <Card color="#4f9deb" title="This Month's Daily Average">
          <Text {...testProps("This Month's Daily Average")}>
            {formatMoney.format(
              currentMonthSum / (daysSinceFirst(Date.now()) + 1)
            )}
          </Text>
        </Card>

        <Card color="#4f9deb" title="Last Month's Total">
          <Text {...testProps("Last Month's Total")}>
            {formatMoney.format(lastMonthSum)}
          </Text>
        </Card>
        <Card color="#4f9deb" title="Last Month's Daily Average">
          <Text {...testProps("Last's Months Daily Average")}>

            {
            //get last months average
            formatMoney.format(
              lastMonthSum /
                daysSinceFirst(
                  new Date(currentDate.getFullYear(), currentDate.getMonth()) -
                    1
                )
            )}
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};
export default Dashboard;
const dashboardStyle = StyleSheet.create({
  card: { flexDirection: "row", alignSelf: "center", alignContent: "center" },
  wrapper: { alignContent: "center" }
});
