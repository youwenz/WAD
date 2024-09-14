import { StyleSheet } from "react-native";
import { PRIMARY, SECONDARY } from "../Style/Color";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    heading: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      color: PRIMARY,
      alignSelf: 'flex-start',
      marginLeft: 30,
      marginTop: 10,
    },
    list: {
      marginVertical: 10,
    },
    coverImage: {
      top: 0,
      left: 0,
      right: 0,
      width: 420,
      height: 300,
      resizeMode: 'cover',
    },
    mainHeading: {
      position: 'absolute',
      width: 300,
      top: 80,
      left: 30,
      fontFamily: 'Poppins-Bold',
      color: 'white',
      fontSize: 36,
    },
    searchContainer: {
      position: 'absolute',
      top: 200,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 15,
      paddingHorizontal: 10,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    input: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      color: PRIMARY,
      fontFamily: 'Poppins-Medium',
    },
    icon: {
      marginRight: 10,
    },
    filterList: {
      marginTop: 20,
      height: 50,
    },
    filter: {
      height: 36,
      width: 110,
      borderWidth: 1,
      borderColor: SECONDARY,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    filterText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: PRIMARY,
    },
    seeAll: {
      fontFamily: 'poppins-light',
      fontSize: 16,
      color: PRIMARY,
      textDecorationLine: 'underline',
      textDecorationColor: PRIMARY,
      marginRight: 30,
      marginTop: 14,
    },
    searchResult: {
      height: 100,
      width: 300,
      flexDirection: 'row',
      margin: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: PRIMARY,
    },
  });
  