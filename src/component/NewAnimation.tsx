import * as React from 'react';
import * as RN from 'react-native';
import AnimationList from './AnimationList';

const NewAnimation = ({setMotion}: any) => {
  return (
    <RN.View style={styles.card}>
      <AnimationList setMotion={setMotion} />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  card: {
    flex: 0,
    backgroundColor: 'white',
    padding: 7,
    elevation: 5,
    borderRadius: 7,
    marginHorizontal: 7,
    marginTop: 7,
  },
});

export default NewAnimation;
