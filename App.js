import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import DashboardScreen from "./app/screens/DashboardScreen";
import ExpenseScreen from "./app/screens/ExpenseScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { testProps } from "./app/utils/common";
import * as Storage from "./app/utils/storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardScreenStack = createStackNavigator();
const Dashboard = () => {
  return (
    <DashboardScreenStack.Navigator>
      <DashboardScreenStack.Screen
        name="Dashboard"
        options={{
          headerTitle: () => (
            <View accessible={true}>
            <Text h4 style={{ color: "steelblue" }} {...testProps("dashboard header title")} accessible={true}>
              Dashboard
            </Text></View>
          ),
          headerTitleAlign: "center"
        }}
        component={DashboardScreen}
      />
    </DashboardScreenStack.Navigator>
  );
};
const Expenses = () => {
  const isFocused= useIsFocused();
  return (
    <Stack.Navigator headerMode="screen" >
      <Stack.Screen
        name="Home"
        
        component={HomeScreen}
        options={({ navigation }) => ({
          
          unmountOnBlur: true,
          headerTitleAlign: "center",
          headerTitle: () => ( <View accessible={true}>
            <Text h4  style={{ color: "steelblue" }} {...testProps("header title")} accessible={true}>
              Expenses
            </Text></View>
          ),
          headerRightContainerStyle: { paddingHorizontal: 22 },
          headerRight: () => {if(isFocused===true) return (
            
            <TouchableOpacity
            onPress={() => navigation.push("EditExpense")}

              accessible={true}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <AntDesign
                accessible={true}
                {...testProps("Add Expense Button")}
                color="steelblue"
                name="plus"
                size={24}
                onPress={() => navigation.push("EditExpense")}
              />
                             
            </TouchableOpacity>
          );else return (<View></View>)}
        })}
      />
      <Stack.Screen
        name="EditExpense"
        options={({ route }) => ({
          headerTitleAlign: "center",
          accessible: true,
          title: "Add Expenses",
          headerTitle: props => (   <View accessible={true}>

            <Text
              h4
              style={{ color: "steelblue" }}
             {...testProps("header title 2")}  accessible={true}    {...route}

            >
              {route.params.expenseItem ? "Edit" : "Add"} Expense
            </Text></View>
          )
        })}
        initialParams={{ expenseItem: null }}
        component={ExpenseScreen}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    Storage.checkTable();
    SplashScreen.hide();
  })
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Dashboard") {
              iconName = "ios-stats";
            }

            // You can return any component that you like here!
            return <Ionicons accessible={true} {...testProps(route.name)} name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          showLabel:false,
          activeTintColor: "steelblue",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="Home" component={Expenses}   />
        <Tab.Screen name="Dashboard" component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
