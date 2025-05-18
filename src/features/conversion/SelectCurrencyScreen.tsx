import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { invokeCallback } from "../../shared/utils/callbackMap";
import { getAvailableCurrencies } from "../../shared/constants/getAvailableCurrencies";
import { useExchangeRates } from "../../shared/hooks/useExchangeRates";

const SelectCurrencyScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "SelectCurrency">>();
  const navigation = useNavigation();
  const { callbackId, selected } = route.params;

  const [query, setQuery] = useState("");
  const [rates] = useExchangeRates();

  const available = useMemo(() => getAvailableCurrencies(rates), [rates]);

  const filtered = useMemo(() => {
    return available.filter(
      (c) =>
        c.code.toLowerCase().includes(query.toLowerCase()) ||
        c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [available, query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search currency"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.item, selected === item.code && styles.selected]}
            onPress={() => {
              invokeCallback(callbackId, item.code);
              navigation.goBack();
            }}
          >
            <Image source={{ uri: item.flagSrc }} style={styles.flag} />
            <Text style={styles.name}>
              {item.code} - {item.name}
            </Text>
            <Text>{selected === item.code ? "●" : "○"}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    borderColor: "#ddd",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 6,
  },
  selected: {
    borderColor: "#aaa",
    borderWidth: 1,
  },
  flag: {
    width: 28,
    height: 20,
    marginRight: 12,
    borderRadius: 4,
  },
  name: { flex: 1 },
});

export default SelectCurrencyScreen;
