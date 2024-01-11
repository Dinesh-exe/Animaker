import * as React from 'react';
import * as RN from 'react-native';
import Sprit from '../../component/Sprit';
import NewAnimation from '../../component/NewAnimation';
import AnimationBoard from '../../component/AnimationBoard';

const Home = (props: any) => {
  const [axis, setAxis] = React.useState({x: 0, y: 0});
  const [motion, setMotion] = React.useState([]);

  return (
    <RN.View style={styles.container}>
      <AnimationBoard axis={(e: any) => setAxis(e)} motions={motion} />
      <Sprit spritName={'Cat'} xValue={axis.x} yValue={axis.y} />
      <NewAnimation setMotion={setMotion} />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  animationBoard: {
    flex: 0.7,
    backgroundColor: 'white',
    padding: 7,
    margin: 7,
    elevation: 5,
    borderRadius: 7,
  },
});

export default Home;
