import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const MyPetScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 제목 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이 펫</Text>
      </View>

      {/* 중앙 텍스트 */}
      <View style={styles.content}>
        <Text style={styles.message}>나의 반려동물 정보를 등록해주세요.</Text>
      </View>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.registerButton}
        onPress={() => navigation.navigate("PetRegistration")}
      >
        <Text style={styles.registerButtonText}>+ 등록하기</Text>
      </TouchableOpacity>

      {/* 하단 메뉴 */}
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="home" style={styles.menuIcon} 
                onPress={() => navigation.navigate("Home")}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="search" style={styles.menuIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("MyPet")} // 연필 아이콘 클릭 시 이동
              >
                <Icon name="pencil" style={styles.menuIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="user" style={styles.menuIcon} />
              </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    color: "#888",
    marginTop: 150
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: "center",
    marginBottom: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  registerButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 2,
  },
  menu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 24,
    color: "#555", // 어두운 회색
  },
});

export default MyPetScreen;
