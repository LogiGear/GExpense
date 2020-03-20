import React from 'react';
import { StyleSheet,Platform} from 'react-native'
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
   
      expenseListItemDescription:  {
        backgroundColor: 'transparent',
        ...Platform.select({
          ios: {
            fontSize: 17,
          },
          default: {
            fontSize: 16,
          },
        })},
        expenseListItemRightView:{
          flexDirection: "row",
                      justifyContent: "flex-end",
                      flex:.2,
                      flexGrow:.3,
                      paddingEnd:0,
                    
          
        },expenseListItemLeftView:{
          flex:.7,
          flexDirection: "row",
                      justifyContent: "space-between",
                      
          
        },

        expenseListItemAmount:{
          
          color:'white',
        
        }, expenseListItemAmountContainer:{
          backgroundColor: 'steelblue',
          padding:4,
          borderRadius:15,
          flexDirection:'column',
          alignContent:'center',
          justifyContent:'center',
          borderColor:'white'
        }
     
 
  });
export default generalStyle;