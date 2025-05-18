import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { currencies } from "../../shared/constants/currencies";
import { registerCallback } from "../../shared/utils/callbackMap";
import { convertCurrency } from "../../shared/utils/convert";
import { useExchangeRates } from "../../shared/hooks/useExchangeRates";

const ConversionScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState("0.00");
  const [error, setError] = useState(false);

  const [rates] = useExchangeRates();

  const getCurrencyData = (code: string) =>
    currencies.find((c) => c.code === code);

  const fromData = getCurrencyData(fromCurrency);
  const toData = getCurrencyData(toCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    const amountNumber = parseFloat(amount.replace(",", "."));

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    const hasValidRates =
      typeof fromRate === "number" &&
      typeof toRate === "number" &&
      fromRate > 0 &&
      toRate > 0;

    if (!hasValidRates || isNaN(amountNumber)) {
      setResult("0.00");
      setError(amount.trim() !== "");
      return;
    }

    setError(false);

    const converted = convertCurrency(amountNumber, fromRate, toRate);
    setResult(converted.toFixed(2));
  }, [amount, fromCurrency, toCurrency, rates]);

  const openCurrencySelector = (callbackId: string, current: string) => {
    registerCallback(
      callbackId,
      callbackId === "from" ? setFromCurrency : setToCurrency
    );
    navigation.navigate("SelectCurrency", { callbackId, selected: current });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.labelSmall}>From:</Text>
          <Pressable
            style={styles.selector}
            onPress={() => openCurrencySelector("from", fromCurrency)}
          >
            {fromData?.flagSrc && (
              <Image source={{ uri: fromData.flagSrc }} style={styles.flag} />
            )}
            <Text>{fromCurrency}</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleSwap} style={styles.swapIconButton}>
          <Text style={styles.swapIcon}>⇆</Text>
        </Pressable>

        <View style={styles.column}>
          <Text style={styles.labelSmall}>To:</Text>
          <Pressable
            style={styles.selector}
            onPress={() => openCurrencySelector("to", toCurrency)}
          >
            {toData?.flagSrc && (
              <Image source={{ uri: toData.flagSrc }} style={styles.flag} />
            )}
            <Text>{toCurrency}</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => {
          const clean = text.replace(/[^0-9.,]/g, "");
          setAmount(clean);
        }}
        keyboardType="numeric"
        style={styles.input}
      />

      {error && (
        <Text style={styles.warning}>
          Failed to load exchange rates. Using offline data if available.
        </Text>
      )}

      <Text style={styles.result}>
        {amount} {fromData?.symbol || fromCurrency} = {"\n"}
        <Text style={styles.converted}>
          {result} {toData?.symbol || toCurrency}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
  },
  labelSmall: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  flag: {
    width: 28,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  swapIconButton: {
    padding: 10,
    marginHorizontal: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 16,
  },
  swapIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: { marginBottom: 6, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
  },
  warning: {
    color: "#d97706",
    fontSize: 14,
    marginTop: 10,
    fontStyle: "italic",
  },
  result: { fontSize: 16, marginTop: 30 },
  converted: { fontSize: 32, fontWeight: "bold" },
});

export default ConversionScreen;
