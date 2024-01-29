import * as React from 'react';
import * as RN from 'react-native';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import DropZone from './component/DropZone';
import {AppContext} from '../../../App';

const Motion = () => {
  const appData: any = React.useContext(AppContext);
  let draggableData = [
    {
      id: 0,
      name: 'Move X by 50',
      actionId: 'x',
      actionValue: 50,
    },
    {
      id: 1,
      name: 'Move Y by 50',
      actionId: 'y',
      actionValue: 50,
    },
    {
      id: 2,
      name: 'Rotate 360',
      actionId: 'rotate',
      actionValue: '360deg',
    },
    {
      id: 3,
      name: 'Go to (0,0)',
      actionId: 'xy',
      xActionValue: 0,
      yActionValue: 0,
    },
    {
      id: 4,
      name: 'Move X=50,Y=50',
      actionId: 'xy',
      xActionValue: 50,
      yActionValue: 50,
    },
    {
      id: 5,
      name: 'Go to random position',
      actionId: 'random',
      xActionValue: Math.random() * 100,
      yActionValue: Math.random() * 100,
    },
    {
      id: 6,
      name: 'Say Hello',
      actionId: 'hello',
      actionValue: 10000,
    },
    {
      id: 7,
      name: 'Say Hello for 1 sec',
      actionId: 'hello',
      actionValue: 1000,
    },
    {
      id: 8,
      name: 'Increas size',
      actionId: 'increaseSize',
      actionValue: 150,
    },
    {
      id: 9,
      name: 'Decrease size',
      actionId: 'decreaseSize',
      actionValue: 20,
    },
    {
      id: 10,
      name: 'Repeat',
      actionId: 'repeat',
      actionValue: 0,
    },
  ];

  const [dragableData, setDragableData] = React.useState(draggableData);

  React.useEffect(() => {
    setMotionData();
  }, []);

  const setMotionData = () => {
    let data: any = draggableData;
    appData?.selectedMotion?.map((item: any) => {
      if (!item?.selected)
        data = draggableData.filter((objFromA: any) => {
          return !item?.data.find((objFromB: any) => {
            return objFromA?.id === objFromB?.id;
          });
        });
    });
    setDragableData(data);
  };

  const DragUIComponent = React.useCallback(({item, index}: any) => {
    return (
      <DraxView
        style={styles.draggableBox}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}>
        <RN.Text style={styles.textStyle}>{item.name}</RN.Text>
      </DraxView>
    );
  }, []);

  const FlatListItemSeparator = () => {
    return <RN.View style={styles.itemSeparator} />;
  };

  const keyExtractor = React.useCallback(
    (item: any, index: any) => item?.id?.toString(),
    [],
  );

  const renderBtn = React.useCallback(({item}: any) => {
    return (
      <RN.TouchableOpacity
        onPress={() => {
          let selectedAnimation = appData?.selectedMotion?.map((e: any) => {
            if (e?.id === item?.id) {
              return {...e, selected: true};
            } else {
              return {...e, selected: false};
            }
          });
          appData?.setSelectedMotion(selectedAnimation);
          setMotionData();
        }}>
        <RN.View
          style={{
            flex: 0,
            backgroundColor: 'blue',
            height: 7 * 6,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: item?.selected ? 'white' : 'blue',
            borderBottomWidth: 2,
            paddingHorizontal: 7 * 2,
          }}>
          <RN.Text style={{color: 'white', fontSize: 9}}>{item?.name}</RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    );
  }, []);

  const renderTabs = () => {
    if (appData?.selectedMotion?.length !== 0)
      return (
        <RN.View style={{flex: 1}}>
          <RN.View>
            <RN.FlatList
              data={appData?.selectedMotion}
              keyExtractor={(item: any) => item?.id}
              horizontal
              renderItem={renderBtn}
            />
          </RN.View>
          <RN.View style={{flex: 1}}>
            <RN.FlatList
              data={appData?.selectedMotion}
              keyExtractor={(item: any) => item?.id}
              renderItem={({item}: any) => {
                if (item?.selected) {
                  return (
                    <DropZone
                      data={item}
                      dragableData={dragableData}
                      setDragableData={setDragableData}
                    />
                  );
                } else {
                  return <></>;
                }
              }}
            />
          </RN.View>
        </RN.View>
      );
  };

  return (
    <DraxProvider>
      <RN.View style={styles.container}>
        <RN.View style={styles.draxListContainer}>
          <DraxList
            data={dragableData}
            renderItemContent={DragUIComponent}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={FlatListItemSeparator}
            removeClippedSubviews
          />
        </RN.View>
        <RN.View style={styles.receivingContainer}>{renderTabs()}</RN.View>
      </RN.View>
    </DraxProvider>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  draggableBox: {
    borderRadius: 7,
    padding: 7 * 2,
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    paddingHorizontal: 7,
    paddingVertical: 7,
    elevation: 5,
    borderRadius: 7,
  },
  itemSeparator: {
    height: 7,
  },
  draxListContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    paddingHorizontal: 7,
    paddingVertical: 7,
    elevation: 5,
    borderRadius: 7,
    marginRight: 7,
  },
  textStyle: {
    fontSize: 12,
    color: 'white',
  },
});

export default Motion;
