import * as React from 'react';
import * as RN from 'react-native';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import {ActionContext} from '../../navigation/MyTabs';

const Motion = () => {
  const motion: any = React.useContext(ActionContext);
  const draggableData = [
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
    },
    {
      id: 6,
      name: 'Say Hello',
    },
    {
      id: 7,
      name: 'Say Hello for 1 sec',
    },
    {
      id: 8,
      name: 'Increas size',
    },
    {
      id: 9,
      name: 'Decrease size',
    },
    {
      id: 10,
      name: 'Repeat',
    },
  ];

  const [dragableData, setDragableData] = React.useState(draggableData);
  const [dropData, setDropData] = React.useState([]);

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

  const ReceivingZoneUIComponent = React.useCallback(({item, index}: any) => {
    return (
      <RN.View style={styles.draggableBox}>
        <RN.Text style={styles.textStyle}>{item?.name}</RN.Text>
      </RN.View>
    );
  }, []);

  const FlatListItemSeparator = () => {
    return <RN.View style={styles.itemSeparator} />;
  };

  const keyExtractor = React.useCallback(
    (item: any, index: any) => item?.id?.toString(),
    [],
  );

  const dropZone = () => (
    <DraxView
      style={styles.receivingZone}
      removeClippedSubviews
      onReceiveDragDrop={event => {
        let selected_item = dragableData[event.dragged.payload];
        let newReceivingItemList: any = [...dropData];
        newReceivingItemList.push(selected_item);
        setDropData(newReceivingItemList);
        motion.setMotion(newReceivingItemList); // setMotions through context
        let newDragItemMiddleList = dragableData.filter(
          (item: any) => item?.id !== selected_item?.id,
        );
        setDragableData(newDragItemMiddleList);
      }}>
      <RN.FlatList
        data={dropData}
        keyExtractor={keyExtractor}
        renderItem={ReceivingZoneUIComponent}
        ItemSeparatorComponent={FlatListItemSeparator}
        removeClippedSubviews
      />
    </DraxView>
  );

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
        <RN.View style={styles.receivingContainer}>{dropZone()}</RN.View>
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
  receivingZone: {
    flex: 1,
    borderRadius: 7,
  },
  draggableBox: {
    borderRadius: 7,
    padding: 7,
    backgroundColor: 'blue',
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
