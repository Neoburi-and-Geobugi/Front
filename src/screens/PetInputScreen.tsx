import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Postcode from "@actbase/react-daum-postcode";

const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "PetInput">;

const PetInputScreen = ({ route, navigation }: Props) => {
  const { fieldKey, value, onSave } = route.params;
  const [inputValue, setInputValue] = useState(value);
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [showPostcode, setShowPostcode] = useState(false);

  const fieldLabels = {
    이름: "이름",
    품종: "품종",
    나이: "나이",
    성별: "성별",
    거주지: "거주지",
    특징: "특징",
  };

  const fieldIcons = {
    이름: "id-badge",
    품종: "paw",
    나이: "birthday-cake",
    성별: "venus-mars",
    거주지: "map-marker",
    특징: "list-alt",
  };

  const handleSave = () => {
    const finalValue =
      fieldKey === "거주지" ? `${address} ${detailAddress}` : inputValue;
    onSave(finalValue);
    navigation.goBack();
  };

  const handleAddressSelect = (data: any) => {
    let defaultAddress = "";
    if (data.buildingName === "N") {
      defaultAddress = data.apartment;
    } else {
      defaultAddress = data.buildingName;
    }
    setAddress(`${data.address} ${defaultAddress}`);
    setShowPostcode(false);
  };

  const isGenderField = fieldKey === "성별";
  const isFeatureField = fieldKey === "특징";
  const isAgeField = fieldKey === "나이";

  const handleAgeInput = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Icon
            name={fieldIcons[fieldKey]}
            size={20}
            color="#000"
            style={styles.icon}
          />
          <Text style={styles.headerTitle}>{fieldLabels[fieldKey]}</Text>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>완료</Text>
        </TouchableOpacity>
      </View>
      {showPostcode ? (
        <Postcode
          style={{ flex: 1, width: "100%", zIndex: 999 }}
          jsOptions={{ animation: true }}
          onSelected={handleAddressSelect}
          onError={(error) => console.error("Postcode Error: ", error)}
        />
      ) : (
        <View style={styles.content}>
          <Text style={styles.description}>
            {fieldKey === "거주지"
              ? "나와 반려동물이 사는 곳은 어디인가요? 상세주소는 입력하지 않으셔도 좋아요."
              : isFeatureField
              ? "내 반려동물은 어떤 특징을 가지고 있나요? 간단하게 소개해주세요."
              : isAgeField
              ? "내 반려동물은 몇 살인가요?"
              : `내 반려동물의 ${fieldLabels[fieldKey]}은 무엇인가요?`}
          </Text>
          {fieldKey === "거주지" ? (
            <>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => setShowPostcode(true)}
              >
                <Icon name="search" size={16} />
                <Text style={styles.mapButtonText}>
                  {address || "주소를 입력해주세요"}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="상세주소 (선택)"
                value={detailAddress}
                onChangeText={setDetailAddress}
              />
            </>
          ) : isFeatureField ? (
            <>
              <Text style={styles.exampleText}>예시) 검은 점박이, 둥근 귀</Text>
              <TextInput
                style={[styles.input, styles.largeInput]}
                value={inputValue}
                onChangeText={(text) => setInputValue(text.slice(0, 30))}
                placeholder="특징을 입력해주세요 (30자 이내)"
                multiline
              />
              <Text style={styles.charLimit}>{inputValue.length} / 30</Text>
            </>
          ) : isGenderField ? (
            <View>
              {["암컷", "수컷"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    inputValue === option && styles.selectedOption,
                  ]}
                  onPress={() => setInputValue(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      inputValue === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={
                isAgeField
                  ? handleAgeInput
                  : (text) => setInputValue(text)
              }
              placeholder={`${fieldLabels[fieldKey]} 입력`}
              keyboardType={isAgeField ? "numeric" : "default"}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  backButton: {
    fontSize: 24,
    color: "#000",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#555",
  },
  saveButton: {
    fontSize: 16,
    color: "#8A2BE2",
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  exampleText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  mapButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 10,
  },
  largeInput: {
    height: 100, // 입력창 크기 증가
    textAlignVertical: "top", // 텍스트 상단 정렬
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "#F4EBFF",
    borderColor: "#F4EBFF",
  },
  optionText: {
    fontSize: 14,
    color: "#555",
  },
  selectedOptionText: {
    color: "#000",
  },
  charLimit: {
    marginTop: 5,
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
});

export default PetInputScreen;