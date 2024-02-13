import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./src/navigation/Screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const AppContext = React.createContext({});

function App() {
  const [selectedMotion, setSelectedMotion] = React.useState([
    {
      id: 1,
      name: "action 1",
      image: require("./src/assets/dog.png"),
      selected: true,
      shouldPerform: true,
      data: [],
    },
  ]);
  const [look, setLook] = React.useState([
    {
      id: 1,
      name: "action 1",
      image: require("./src/assets/dog.png"),
      selected: true,
      shouldPerform: true,
      data: [],
    },
  ]);
  const [control, setControl] = React.useState([
    {
      id: 1,
      name: "action 1",
      image: require("./src/assets/dog.png"),
      selected: true,
      shouldPerform: true,
      data: [],
    },
  ]);
  const [event, setEvent] = React.useState([
    {
      id: 1,
      name: "action 1",
      image: require("./src/assets/dog.png"),
      selected: true,
      shouldPerform: true,
      data: [],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        selectedMotion,
        look,
        control,
        event,
        setSelectedMotion,
        setLook,
        setControl,
        setEvent,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}

export default App;
