import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const PostDetailScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>치와와 토리를 찾아요</Text>
      </View>

      {/* Profile */}
    <View style={styles.profileContainer}>
    <Image
        source={require('../assets/images/profile.png')} // 프로필 이미지 경로
        style={styles.profileImage}
    />
    <Text style={styles.username}>@torrymom</Text>
    </View>

    {/* Image Slider */}
    <View style={styles.imageSlider}>
    <Image
        source={require('../assets/images/pet/chiwawa.png')} // 반려동물 이미지 경로
        style={styles.petImage}
    />
    <Text style={styles.imageIndex}>1/4</Text>
    </View>

      {/* Pet Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>{post.petName || '토리'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>나이</Text>
          <Text style={styles.infoValue}>2세</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>품종</Text>
          <Text style={styles.infoValue}>치와와</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>성별</Text>
          <Text style={styles.infoValue}>여자</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          하얀색 치와와고 오늘 오후 2시쯤 보정동 카페거리 쪽에서 잃어버렸어요.
          빨간색 옷을 입고 있었습니다. 보신 분은 연락 부탁드려요.
        </Text>
      </View>

      {/* Bottom Icons */}
      <View style={styles.bottomIcons}>
        <TouchableOpacity onPress={() => Alert.alert('좋아요')}>
          <Text>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('댓글')}>
          <Text>💬</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    fontSize: 18,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    color: '#333',
  },
  imageSlider: {
    position: 'relative',
    height: 300,
    marginBottom: 16,
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  imageIndex: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
});

export default PostDetailScreen;
