import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../App";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AnimationList = () => {
  const appData: any = React.useContext(AppContext);
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => {
    return (
      <RN.TouchableOpacity
        onPress={() => {
          navigation.navigate("Action");
          let selectedAnimation = appData?.selectedMotion?.map((e: any) => {
            if (e?.id === item?.id) {
              return { ...e, selected: true, shouldPerform: true };
            } else {
              return { ...e, selected: false, shouldPerform: false };
            }
          });
          appData?.setSelectedMotion(selectedAnimation);
        }}
      >
        <RN.View style={styles.card}>
          {renderDeleteBtn(item)}
          <RN.Image source={item?.image} style={styles.image} />
          <RN.View
            style={[
              styles.createBtnContainer,
              { backgroundColor: item?.shouldPerform ? "blue" : "red" },
            ]}
          >
            <RN.Text style={styles.createBtnText}>
              {item?.shouldPerform
                ? `${item?.data.length} actions`
                : "Add Actions"}
            </RN.Text>
          </RN.View>
        </RN.View>
      </RN.TouchableOpacity>
    );
  };

  const renderDeleteBtn = (item: any) => {
    let isRemovable = appData?.selectedMotion?.length > 1;
    return (
      <RN.TouchableOpacity
        onPress={() => {
          let data = appData?.selectedMotion?.filter(
            (node: any) => node?.id !== item?.id
          );
          appData?.setSelectedMotion(data);
        }}
        style={{
          backgroundColor: item?.shouldPerform ? "blue" : "red",
          padding: 7 / 2,
          borderRadius: 7 * 7,
          position: "absolute",
          top: 7 / 2,
          right: 7 / 2,
          display: isRemovable ? "flex" : "none",
        }}
      >
        <Icon name="delete" color={"white"} size={15} />
      </RN.TouchableOpacity>
    );
  };

  const keyExtractor = React.useCallback(
    (item: any, index: any) => item?.id?.toString(),
    []
  );

  const addElementToArray = (item: any, array: Array<any>) => {
    if (array.includes(item)) {
      return array.filter((original) => item !== original);
    } else {
      return [...array, item];
    }
  };

  const renderAddButton = () => {
    return (
      <RN.TouchableOpacity
        onPress={() => {
          let selectedAnimation = appData?.selectedMotion;
          let newPosition = selectedAnimation.length + 1;
          let newData = {
            id: newPosition,
            name: `action ${newPosition}`,
            image: require("../assets/dog.png"),
            selected: false,
            shouldPerform: false,
            data: [],
          };
          let arr = addElementToArray(newData, appData?.selectedMotion);
          appData?.setSelectedMotion(arr);
          appData?.setLook(arr);
          appData?.setControl(arr);
          appData?.setEvent(arr);
        }}
        style={{ flex: 1 }}
      >
        <RN.View style={styles.newCard}>
          <RN.Text
            style={{ alignSelf: "center", color: "black", fontSize: 20 }}
          >
            +
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    );
  };

  return (
    <RN.View style={styles.container}>
      <RN.FlatList
        data={appData?.selectedMotion}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        ListFooterComponent={renderAddButton}
        contentContainerStyle={{
          flex: appData?.selectedMotion?.length > 2 ? 0 : 1,
        }}
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
    padding: 7,
    elevation: 5,
    borderRadius: 7,
    marginHorizontal: 7,
  },
  card: {
    flex: 0,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 7,
    margin: 7,
    minWidth: 80,
    paddingTop: 7,
  },
  image: { height: 50, width: 50, alignSelf: "center", marginVertical: 7 },
  createBtnContainer: {
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    padding: 7,
  },
  createBtnText: {
    fontSize: 7,
    color: "white",
    alignSelf: "center",
  },
  newCard: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 7,
    margin: 7,
    minWidth: 80,
  },
});

export default React.memo(AnimationList);
