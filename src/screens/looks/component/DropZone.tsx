import * as React from 'react';
import * as RN from 'react-native';
import {DraxView} from 'react-native-drax';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppContext} from '../../../../App';

const DropZone = ({data, dragableData, setDragableData}: any) => {
  const appData: any = React.useContext(AppContext);

  const ReceivingZoneUIComponent = React.useCallback(
    ({item, index}: any) => {
      return (
        <RN.View style={styles.draggableBox}>
          <RN.Text style={styles.textStyle}>{item?.name}</RN.Text>
          <RN.TouchableOpacity
            onPress={() => {
              let newReceivingItemList: any = [...dragableData];
              newReceivingItemList.push(item);
              setDragableData(newReceivingItemList);
              let allData = appData?.look?.map((e: any) => {
                if (e?.id === data?.id) {
                  return {
                    ...e,
                    data: data?.data?.filter((f: any) => f?.id !== item?.id),
                  };
                } else {
                  return e;
                }
              });
              appData?.setLook(allData);
            }}>
            <Icon name="delete" size={15} color={'white'} />
          </RN.TouchableOpacity>
        </RN.View>
      );
    },
    [dragableData, appData?.look],
  );

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
        let newReceivingItemList: any = data?.data;
        newReceivingItemList.push(selected_item);
        let allData = appData?.look?.map((e: any) => {
          if (e?.id === data?.id) {
            return {
              ...e,
              data: newReceivingItemList,
            };
          } else {
            return e;
          }
        });
        appData?.setLook(allData);
        let newDragItemMiddleList = dragableData.filter(
          (data: any) => data?.id !== selected_item?.id,
        );
        setDragableData(newDragItemMiddleList);
      }}>
      <RN.FlatList
        data={data?.data}
        keyExtractor={keyExtractor}
        renderItem={ReceivingZoneUIComponent}
        ItemSeparatorComponent={FlatListItemSeparator}
        removeClippedSubviews
        style={{marginTop: 7}}
      />
    </DraxView>
  );

  return <RN.View style={styles.receivingContainer}>{dropZone()}</RN.View>;
};

const styles = RN.StyleSheet.create({
  receivingZone: {
    flex: 1,
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
    flex: 1,
    backgroundColor: 'white',
    height: RN.Dimensions.get('screen').height / 1.4,
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

export default React.memo(DropZone);
