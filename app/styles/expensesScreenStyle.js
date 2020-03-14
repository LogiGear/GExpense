import React from 'react';
import { StyleSheet} from 'react-native'
const expenseScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerText:{ fontSize:25,
  
    },
    headerView:{
      flex:1,
      backgroundColor:'skyblue',
      justifyContent:"center",
      alignContent:"center"
  
    },

    inputView:{
      backgroundColor:'white',
      
        padding:5,
        paddingTop:10,
        paddingHorizontal:30,
        flex:1,
        justifyContent:'flex-start',
        
        alignContent:'center'
    }
  });
export default expenseScreenStyle;