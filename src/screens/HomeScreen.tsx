import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* 상단 카드 */}
      <View style={styles.cardContainer}>
      <TouchableOpacity
          style={[styles.card, styles.purpleCard]}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>찾고싶어요</Text>
            <Text style={styles.cardSubtitle}>
              내 반려동물이 어디서, 언제 실종되었나요?
            </Text>
          </View>
          <Image
            source={require("../assets/dog1.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.greenCard]}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>발견했어요</Text>
            <Text style={styles.cardSubtitle}>
              어떤 반려동물을 목격하였는지 알려주세요!
            </Text>
          </View>
          <Image
            source={require("../assets/dog2.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton}
          onPress={() => navigation.navigate("MyPet")} // 반려동물 등록 카드 클릭 시 이동
        >
          <Text style={styles.bottomText}>반려동물 등록</Text>
          <Text style={styles.bottomSubtitle}>
            나의 반려동물의 정보를 입력해주세요.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomText}>둘러보기</Text>
          <Text style={styles.bottomSubtitle}>
            우리 동네의 어떤 동물들이 도움이 필요한지 살펴보세요!
          </Text>
        </TouchableOpacity>
      </View>

      {/* 하단 메뉴 */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="home" style={styles.menuIcon} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flex: 1.5, // 카드 영역을 더 많이 차지
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 55,
    paddingTop: 80,
    paddingBottom: 7,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
    height: 150, // 카드 높이를 고정
  },
  purpleCard: {
    backgroundColor: "#F4EBFF",
  },
  greenCard: {
    backgroundColor: "#E5FFF5",
  },
  cardTextContainer: {
    width: "70%",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#555",
  },
  cardImage: {
    width: 80,
    height: 80,
  },
  bottomContainer: {
    flex: 1.2, // 버튼 영역을 적당히 차지
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 10,
    paddingTop: 20, // 위쪽 패딩 줄임
    
  },
  bottomButton: {
    width: "47%",
    height: 150, // 버튼 높이
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 12,
  },
  bottomSubtitle: {
    fontSize: 12,
    color: "#555",
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

export default HomeScreen;
