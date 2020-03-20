import React from "react";
import { TouchableOpacity, View, AccessibilityInfo } from "react-native";
import { Text } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import ExpenseScreen from "./app/screens/ExpenseScreen";
import DashboardScreen from "./app/screens/DashboardScreen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { testProps } from "./app/utils/common";

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
            <Text h4 style={{ color: "steelblue" }} {...testProps("header title")} accessible={true}>
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
  return (
    <Stack.Navigator>
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
          headerRight: () => (
            <TouchableOpacity
              accessible={true}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => navigation.push("EditExpense")}
            >
              <AntDesign
                accessible={true}
                {...testProps("Add Expense Button")}
                color="steelblue"
                name="plus"
                size={24}
              />
            </TouchableOpacity>
          )
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
