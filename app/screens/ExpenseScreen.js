import React from "react";

import {
  View,
    SafeAreaView,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { TextInputMask } from "react-native-masked-text";

import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, Foundation } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Expense from "../models/expense";
import PriceTextBox from "../components/PriceTextBox";
import {Input,Icon,Button }  from 'react-native-elements';
import {
  addExpense,
  updateExpense
} from "../utils/storage";
import {testProps} from '../utils/common'
import expensesScreenStyle from "../styles/expensesScreenStyle";
const ExpenseScreen = ({ route, navigation }) => {
  navigation.setOptions({ unmountOnBlur: true });
// Expense data is passed from the Home Screen
  const { expenseItem } = route.params;
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState("1990-02-12");
  const [pickerDate, setPickerDate] = useState(new Date((new Date()).toISOString().split('T')[0]));
  const [showPicker, setShowPicker] = useState(false);
  const [addOrSaveButton,setAddOrSaveButton]= useState("Add")

  // add or update the Expense based on the input
  const submitInput = () => {
    let expense = new Expense(
      amount.replace("$", "").replace(",", ""),
      date,
      description
    );
    if (expenseItem) {
      expense.id = expenseItem.id;
      updateExpense(expense);
    } else addExpense(expense);
    navigation.navigate("Home");
  };
// setup the page for a new or modified expense
  useEffect(() => {
    if (expenseItem) {
      setAmount(expenseItem.amount);
      setDescription(expenseItem.description);
      setDate(expenseItem.date);
      setPickerDate(new Date(expenseItem.date));
      setAddOrSaveButton("Save")
    } else {
      setDate(pickerDate.toISOString().split("T")[0]);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} accessible={false} >
      <View style={expensesScreenStyle.inputView} accessible={false} >
      <Input
      label="Description"
  placeholder='Description'
  placeholderTextColor="#A6A6A6"
  {...testProps("Description")}

  onChangeText={text => setDescription(text)}
  value={description}
/>
       
        <Input
        label="Date:"
        {...testProps("Date")}
          onFocus={() => {
            Keyboard.dismiss(), setShowPicker(true);
          }}
          value={date}
          editable={true}
          rightIcon={<Ionicons name='ios-calendar' size={24}/>}
          leftIconContainerStyle={{alignContent:'flex-start', justifyContent:'flex-start', flexDirection:'column'}}
          onChangeText={(value)=>{ setDate(value);
        }}
        />
       
      <TextInputMask
   {...testProps("Input Price")}

      type={"money"}
      editable={true}
      customTextInput={Input}
          customTextInputProps={{label:"Amount"}}
      options={{
        precision: 2,
        separator: ".",
        delimiter: ",",
        unit: "$",
        suffixUnit: ""
      }}
      value={amount}
      caretHidden={true}
      onChangeText={text => {
        setAmount(text);
      }}
    />
        <View accessible={false}>
          <DateTimePickerModal
             {...testProps("Date Picker")}

            isVisible={showPicker}
            mode={'date'}
            date={pickerDate}
            onCancel={() => {
              setShowPicker(false);
            }}
            onConfirm={date => {
              setShowPicker(false);
              // date might be UTC date?
              // date.setDate(date.getDate()+1);
              
              setDate(date.toISOString().split("T")[0]);
            }}
          />
        </View>
<View accessible={false} style={{paddingVertical:10}}> 
        <Button accessible={true}
            {...testProps("save button")}

          onPress={submitInput}
          type="solid"
          title={addOrSaveButton+" Expense"}
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExpenseScreen;
