import * as SQLite from "expo-sqlite";
import { AsyncStorage } from "react-native";
import { DBIsCreated } from "./constants";

const db = SQLite.openDatabase("gexpenses2.db");

async function executeSqlAsync(query, ...params) {
  console.log(`[executeSqlAsync] query[${query}] params[${params}]`);
  if (await checkTable())
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => tx.executeSql(query, params,
          (_, { rows: { _array: result } }) => {
            //console.log(`\t\t[executeSqlAsync]executeSql resolve: ${JSON.stringify(result)}`);
            resolve(result);
          },
          (_, err) => {
            console.log(`\t\t[executeSqlAsync]executeSql reject: ${JSON.stringify(err)}`);
            reject(err);
          }
        ),
        (err) => {
          console.log(`\t[executeSqlAsync]transaction reject: ${JSON.stringify(err)}`);
          reject(err);
        },
        () => {} //console.log("\t[executeSqlAsync]transaction success")
      );
    });
  else throw new Error("DB is not initialized");
}

// Create a table if needed
export async function checkTable() {
  if (!await AsyncStorage.getItem(DBIsCreated)) {
    try {
      let result = await new Promise((resolve, reject) => {
        db.transaction(
          tx => tx.executeSql("create table if not exists expenses (id integer primary key not null, amount text, description text, date text);"),
          err => reject(err),
          result => resolve(result)
        );
      });
      await AsyncStorage.setItem(DBIsCreated, DBIsCreated);
      console.log(`New table is created: ${JSON.stringify(result)}`);
    } catch (error) {
      console.log(`Table creation failed: ${JSON.stringify(error)}`);
      return false;
    }
  } //else console.log("table is created already");
  return true;
}

// add an expense
export async function addExpense(expense) {
  try {
    await executeSqlAsync("insert into expenses (amount, description, date) values (?,?,?)",
      expense.amount, expense.description, expense.date);
    console.log("Expense is added");
  } catch (error) {
    console.log(`Unable to add new expense [${JSON.stringify(expense)}]: ${JSON.stringify(error)}`);
  }
}

// update an expense
export async function updateExpense(expense) {
  try {
    let result = await executeSqlAsync("update expenses set amount=?, description=?, date=? where id=?",
      expense.amount, expense.description, expense.date, expense.id);
    console.log(`Expense is updated: ${JSON.stringify(result)}`);
  } catch (error) {
    console.log(`Unable to update expense [${JSON.stringify(expense)}]: ${JSON.stringify(error)}`);
  }
};

// delete an expense
export async function delExpense(id) {
  try {
    let result = await executeSqlAsync("delete from expenses where id = ?", [id]);
    console.log(`Expense is deleted: ${JSON.stringify(result)}`);
  } catch (error) {
    console.log(`Unable to delete expense [${JSON.stringify(id)}]: ${JSON.stringify(error)}`);
  }
}

// get all expenses
export async function getExpenses() {
  try {
    let result = await executeSqlAsync("select * from expenses order by date(date) desc");
    //console.log(`getExpense result: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    console.log(`Unable to get expenses: ${JSON.stringify(error)}`);
  }
  return [];
}

//Get the monthly total spending for this and last month
export async function getMonthSpending(setCurrentMonthSum, setLastMonthSum) {
  try {
    let result = await executeSqlAsync("select sum(amount) as sum from expenses where date(date) >= date('now','start of month') and date(date) < date('now','start of month','+1 month')");
    setCurrentMonthSum(result[0].sum);

    result = await executeSqlAsync("select sum(amount) as sum from expenses where date(date) >= date('now','start of month','-1 month') and date(date) < date('now','start of month')");
    setLastMonthSum(result[0].sum);
  } catch (error) {
    console.log(`Unable to delete expense [${JSON.stringify(id)}]: ${JSON.stringify(error)}`);
  }
}
