// Automatically format money when input

import React from "react";
import { TextInputMask } from "react-native-masked-text";
import expenseScreenStyle from '../styles/expensesScreenStyle'
const PriceTextBox = props => {
  const { amount, setAmount, ...args } = props;

  return (
    <TextInputMask
    accessibilityLabel="Input Price"
    testID="Input Price"
    style={expenseScreenStyle.textBox}
      type={"money"}
      editable={true}
      
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
  );
};
export default PriceTextBox;
