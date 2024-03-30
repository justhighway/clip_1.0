import { StyleSheet, Text, View, Pressable, Platform } from 'react-native'

export default function CustomButton({ onPress, title, hasMarginBtm, theme }) {
  const isPrimary = theme === 'primary'

  return (
    <View style={[styles.overflow, hasMarginBtm && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && { opacity: 0.5 },
        ]}
        android_ripple={{
          color: isPrimary ? '#ffffff' : '#845EC2',
        }}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  )
}

CustomButton.defaultProps = {
  theme: 'primary',
}

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryWrapper: {
    backgroundColor: '#845EC2',
  },
  text: {
    fontSize: 18,
  },
  primaryText: {
    fontWeight: 'bold',
    color: 'white',
  },
  secondaryText: {
    color: '#9A89B4',
  },
  margin: {
    marginBottom: 8,
  },
})
