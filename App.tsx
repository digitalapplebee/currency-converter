import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConversionScreen from "./src/features/conversion/ConversionScreen";
import SelectCurrencyScreen from "./src/features/conversion/SelectCurrencyScreen";

export type RootStackParamList = {
  Conversion: undefined;
  SelectCurrency: { callbackId: string; selected: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Conversion"
          component={ConversionScreen}
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="SelectCurrency"
          component={SelectCurrencyScreen}
          options={{
            title: "Currency Select",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
