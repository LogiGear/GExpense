import React from "react";
import { TouchableOpacity } from "react-native";
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
            <Text h4 style={{ color: "steelblue" }} {...testProps("header title")} accessible={true}>
              Dashboard
            </Text>
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
          headerTitle: () => (
            <Text h4 style={{ color: "steelblue" }} {...testProps("header title")} accessible={true}>
              Expenses
            </Text>
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
          headerTitle: props => (
            <Text
              {...props}
              h4
              style={{ color: "steelblue" }}
              accessible={true} {...testProps("header title")}
            >
              {route.params.expenseItem ? "Edit" : "Add"} Expense
            </Text>
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
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "steelblue",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen name="Home" component={Expenses} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
