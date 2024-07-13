import LinearGradient from 'react-native-linear-gradient';
import React, {ReactNode} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
  } from 'react-native';

  interface BottomBarProps {
    children: ReactNode;
  }

  const BottomBar: React.FC<BottomBarProps> = ({children}) => {

  const screenWidth = Dimensions.get('window').width;
    return (
        <View style={[{width: screenWidth, marginTop: 20}, styles.bottom]}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.05)']}
          style={[styles.shadowGradient, {width: screenWidth}]}
        />
        <View style={styles.bottomBar}>
          {children}
        </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    shadowGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 20,
        zIndex: 0, // Ensure gradient is behind the content
      },
      bottomBar: {
        height: 52,
        marginTop: 30,
        marginLeft: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
      },
      bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 92,
      },
  })

  export default BottomBar;