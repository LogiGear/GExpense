import React from 'react';
import { StyleSheet} from 'react-native'
const generalStyle = StyleSheet.create({
    container: { backgroundColor:'white',
      flex: 1,
      flexDirection:'column'
    },
    headerText:{ fontSize:25, color:'black', textAlign:'center'
  
    },
    headerView:{
      flex:.3,
      backgroundColor:'white',
      justifyContent:'flex-end',
      alignItems:'center',
      flexDirection:'column'
    },
    expenseList:{
      flex:1,
      backgroundColor:'white'
    },
    expenseListView:{
     
    },
    expenseListItemContainer:{
      paddingTop:10,
      flexDirection:'row'  
      },expenseListItemPadding:{
        flex:1
      },
      expenseListItem:{
        padding:3,
        paddingHorizontal:14,
        borderStyle:'solid',
        borderWidth:0,
        borderRadius:40,
        shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.5,
   shadowRadius: 2,
   elevation: 2,
        
        
      flex:3,
      flexDirection: "row",
    
      alignContent: 'space-between',
      justifyContent: "space-between",
      alignItems: "center",
      color:'black'
    },
    expenseListItemText:{
      color:'black'
    },
 
  });
export default generalStyle;