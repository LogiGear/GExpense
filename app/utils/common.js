if (Platform.OS === 'android') {
    require('intl');
    require('intl/locale-data/jsonp/en-US');
    
    Intl.__disableRegExpRestore();/*For syntaxerror invalid regular expression unmatched parentheses*/
  }
// Format money for display
  export const formatMoney= new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  // Add accessibilityLabel for android and testID for iOS so Appium can access elements
  export const testProps= (id)=> {
    return {testID: id, accessibilityLabel: id};
    }

  //Calculate days between two dates, returns a negative the the 2nd date is in the future
  export const daysBetween = (one, another) => {
    return Math.round((+one - +another) / 8.64e7);
  };

  //Calculate the days since the first of the month
  export const daysSinceFirst=(currentDate)=>{
    let date = new Date(currentDate);
 let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
return daysBetween(date,firstDay);
  };