import React from "react";
import Expense from "../models/expense";
import { AsyncStorage } from "react-native";
import * as SQLite from "expo-sqlite";
import { databaseVersion } from "./constants";

const db = SQLite.openDatabase("gexpenses2.db");
//Check if tables has been created
const tableIsCreated = async () => {
  const value = await AsyncStorage.getItem("isCreated");
  return JSON.parse(value);
};
// save to async storage that table was created
const setTableIsCreated = async () => {
  await AsyncStorage.setItem("isCreated", JSON.stringify(true));
};
// Create a table if needed
export const checkTable = async () => {
  let res = await tableIsCreated()
  if (!res) {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            "create table if not exists expenses (id integer primary key not null, amount text, description text, date text);"
          );
        },
        e => {
          console.log("check table error" + e);
          reject(e);
        },
        async () => {
          console.log("added table ");
          resolve(await setTableIsCreated());
        }
      );
    });
  } else console.log("table is created");
};
// add an expense
export const addExpense = async (expense) => {
  return new Promise((resolve, reject) => {
    db.transaction(
        tx => {
          tx.executeSql(
            "insert into expenses (amount, description, date) values (?,?,?)",
            [expense.amount, expense.description, expense.date]
          );
        },
        e => {
          console.log("error" + e);
          reject(e);
        },
        e => {
          console.log("added expenses" + e);
          resolve(e);
        }
      );
    }
  )
};
// update an expense
export const updateExpense = async (expense) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "update expenses set amount=?, description=?, date=? where id=?",
          [expense.amount, expense.description, expense.date, expense.id]
        );
      },
      e => {
        console.log("error" + e);
        reject(e);
      },
      e => {
        console.log("updated expenses");
        resolve(e);
      }
    );
  });
};

// delete an expense
export const delExpense = id => {
  console.log(id);
  try {
    db.transaction(tx => {
      tx.executeSql(
        "delete from expenses where id = ?",
        [id],
        r => console.log("deleted"),
        e => {
          console.log("failed to delete " + e);
        }
      );
    });
  } catch (e) {
    console.log("db error " + e);
  }
};
// get all expenses
export const getExpenses = ({ setExpenses }) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        "select * from expenses order by date(date) desc",
        [],
        (_, { rows: { _array } }) => {
          setExpenses(_array);
        },
        e => {
          console.log(e);
        }
      );
    });
  } catch (e) {
    console.log("error getting expenses" + e);
  }
};
// get an expense
export const getExpense = (id, { setExpense }) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        "select * from expenses where id = ?",
        [id],
        (_, { rows: { _array } }) => {
          setExpense(_array[0]);
        },
        e => console.log(e)
      );
    });
  } catch (e) {
    throw Error("failed to get Expense " + e);
  }
};
//Get the monthly total spending for this and last month
export const getMonthSpending = ({ setCurrentMonthSum, setLastMonthSum }) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        "select sum(amount) as sum from expenses where date(date) >= date('now','start of month') and date(date) < date('now','start of month','+1 month')",
        [],
        (_, { rows: { _array } }) => {
          setCurrentMonthSum(_array[0].sum);
        },
        e => console.log(e)
      );
      tx.executeSql(
        "select sum(amount) as sum from expenses where date(date) >= date('now','start of month','-1 month') and date(date) < date('now','start of month')",
        [],
        (_, { rows: { _array } }) => {
          setLastMonthSum(_array[0].sum);
        },
        e => console.log(e)
      );
    });
  } catch (e) {
    console.log("db error");
  }
};
