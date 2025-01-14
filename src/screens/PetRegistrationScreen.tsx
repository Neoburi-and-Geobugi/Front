import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "react-native-image-picker";
import axios from "axios";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = StackScreenProps<RootStackParamList, "PetRegistration">;

const PetRegistrationScreen = ({ navigation }: Props) => {
  const [petData, setPetData] = useState({
    이름: "",
    품종: "",
    나이: "",
    성별: "",
    거주지: "",
    특징: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePicker = async (type: "camera" | "gallery") => {
    setModalVisible(false);
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: "photo",
    };

    if (type === "camera") {
      const result = await ImagePicker.launchCamera(options);
      if (result.assets && result.assets[0].uri) {
        setSelectedImage(result.assets[0].uri);
      }
    } else {
      const result = await ImagePicker.launchImageLibrary(options);
      if (result.assets && result.assets[0].uri) {
        setSelectedImage(result.assets[0].uri);
      }
    }
  };

  const handleNavigation = (key: keyof typeof petData) => {
    navigation.navigate("PetInput", {
      fieldKey: key,
      value: petData[key],
      onSave: (value: string) => setPetData({ ...petData, [key]: value }),
    });
  };

  const handleSubmit = async () => {
    // 필수 값 확인
    const missingFields = Object.keys(petData).filter((key) => !petData[key as keyof typeof petData]);

    if (missingFields.length > 0) {
      Alert.alert("입력 오류", `다음 항목을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    if (!selectedImage) {
      Alert.alert("입력 오류", "반려동물 사진을 추가해주세요.");
      return;
    }

    try {
      const formData = {
        petName: petData["이름"],
        breed: petData["품종"],
        age: parseInt(petData["나이"] || "0", 10),
        gender: petData["성별"],
        residence: petData["거주지"],
        feature: petData["특징"],
        petPhoto: selectedImage, 
      };

      console.log("전송 데이터:", formData);
      const response = await axios.post("http://10.0.2.2:8080/pets/save", formData);

      if (response.status === 200) {
        Alert.alert("성공", "반려동물 정보가 저장되었습니다.");
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "반려동물 정보를 저장하는 중 오류가 발생했습니다.");
    }
  };

  const fieldIcons = {
    이름: "id-badge",
    품종: "paw",
    나이: "birthday-cake",
    성별: "venus-mars",
    거주지: "map-marker",
    특징: "list-alt",
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>반려동물 등록하기</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.completeButton}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TouchableOpacity
          style={styles.imageUpload}
          onPress={() => setModalVisible(true)}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.imageUploadIcon}>+</Text>
          )}
        </TouchableOpacity>

        {(Object.keys(fieldIcons) as Array<keyof typeof fieldIcons>).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.inputGroup}
            onPress={() => handleNavigation(key)}
          >
            <View style={styles.row}>
              <Icon
                name={fieldIcons[key]}
                size={17}
                color="#555"
                style={styles.icon}
              />
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.underlineInput}>
                {petData[key] || "입력해주세요"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImagePicker("gallery")}
            >
              <Text style={styles.modalButtonText}>라이브러리에서 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleImagePicker("camera")}
            >
              <Text style={styles.modalButtonText}>사진 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  completeButton: {
    fontSize: 15,
    color: "#8A2BE2",
  },
  form: {
    padding: 20,
  },
  imageUpload: {
    width: 150,
    height: 150,
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 20,
    alignSelf: "center",
  },
  imageUploadIcon: {
    fontSize: 35,
    color: "#888",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  inputGroup: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    flex: 1,
  },
  underlineInput: {
    flex: 3,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 4,
    fontSize: 14,
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalCancelButton: {
    borderBottomWidth: 0,
    alignItems: "center",
  },
  modalCancelText: {
    fontSize: 16,
    color: "red",
  },
});

export default PetRegistrationScreen;
