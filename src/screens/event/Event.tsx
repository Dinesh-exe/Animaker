import * as React from 'react';
import * as RN from 'react-native';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import DropZone from './component/DropZone';
import {AppContext} from '../../../App';

const Event = () => {
  const appData: any = React.useContext(AppContext);
  let draggableData = [
    {
      id: 0,
      name: 'When * clicked',
      actionId: '*Clicked',
      actionValue: 1,
    },
    {
      id: 1,
      name: 'When space key pressed',
      actionId: 'space',
      actionValue: 1,
    },
    {
      id: 2,
      name: 'When this sprite clicked',
      actionId: 'sprite',
      actionValue: 1,
    },
    {
      id: 3,
      name: 'When backdrop switches to backdrop1',
      actionId: 'backdropSwitch',
      actionValue: 1,
    },
    {
      id: 4,
      name: 'When loudness > 10',
      actionId: 'loudness',
      actionValue: 10,
    },
    {
      id: 5,
      name: 'When i receive message1',
      actionId: 'messageReceive',
      actionValue: 1,
    },
    {
      id: 6,
      name: 'Broadcast message1',
      actionId: 'broadcast',
      actionValue: 1,
    },
    {
      id: 7,
      name: 'Broadcast message1 and wait',
      actionId: 'broadcast',
      actionValue: 1,
    },
  ];

  const [dragableData, setDragableData] = React.useState(draggableData);

  React.useEffect(() => {
    setMotionData();
  }, []);

  const setMotionData = () => {
    let data: any = draggableData;
    appData?.event?.map((item: any) => {
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

  const renderBtn = ({item}: any) => {
    return (
      <RN.TouchableOpacity
        onPress={() => {
          let selectedAnimation = appData?.event?.map((e: any) => {
            if (e?.id === item?.id) {
              return {...e, selected: true};
            } else {
              return {...e, selected: false};
            }
          });
          appData?.setEvent(selectedAnimation);
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
  };

  const renderTabs = () => {
    if (appData?.event?.length !== 0)
      return (
        <RN.View style={{flex: 1}}>
          <RN.View>
            <RN.FlatList
              data={appData?.event}
              keyExtractor={(item: any) => item?.id}
              horizontal
              renderItem={renderBtn}
            />
          </RN.View>
          <RN.View style={{flex: 1}}>
            <RN.FlatList
              data={appData?.event}
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

export default Event;
