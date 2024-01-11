import * as React from 'react';
import * as RN from 'react-native';

const {height, width} = RN.Dimensions.get('window');

const Sprit = ({spritName, xValue, yValue}: any) => {
  return (
    <RN.View style={styles.card}>
      <RN.View style={styles.container}>
        <RN.View style={styles.spritContainer}>
          <RN.Text style={styles.spritLabel}>Sprit</RN.Text>
          <RN.View style={styles.spritView}>
            <RN.Text style={styles.spritText}>{spritName}</RN.Text>
          </RN.View>
        </RN.View>

        <RN.View style={styles.spritContainer}>
          <RN.Text style={styles.spritLabel}>X</RN.Text>
          <RN.View style={styles.spritView}>
            <RN.Text style={styles.spritText}>{xValue}</RN.Text>
          </RN.View>
        </RN.View>

        <RN.View style={styles.spritContainer}>
          <RN.Text style={styles.spritLabel}>Y</RN.Text>
          <RN.View style={styles.spritView}>
            <RN.Text style={styles.spritText}>{yValue}</RN.Text>
          </RN.View>
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  card: {
    flex: 0,
    backgroundColor: 'white',
    paddingHorizontal: 7,
    paddingVertical: 7 * 2,
    elevation: 5,
    borderRadius: 7,
    marginHorizontal: 7,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spritContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spritLabel: {
    marginRight: 3.5,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '500',
    bottom: 1,
    color: 'black',
  },
  spritView: {
    paddingVertical: 3.5,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 7,
    minWidth: width / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spritText: {
    fontSize: 10,
    color: 'black',
    alignSelf: 'center',
  },
});

export default Sprit;
