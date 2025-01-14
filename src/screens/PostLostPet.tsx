import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation 훅 추가
import AddressSearchModal from '../components/AddressSearchModal';
import PetSelector from '../components/PetSelector';
import styles from '../styles/PostLostPetStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostLostPet: React.FC = () => {
  const navigation = useNavigation(); // Navigation 객체 생성
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [myPets, setMyPets] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  // JWT 토큰 가져오기
  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return null;
      }
      return token;
    } catch (error) {
      console.error('토큰 가져오기 실패:', error);
      Alert.alert('오류', '토큰을 가져오는 데 실패했습니다.');
      return null;
    }
  }, []);

  // 반려동물 리스트 가져오기
  const fetchMyPets = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) {return;}

      const response = await axios.get('http://10.0.2.2:8080/pets/list', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const petsData = response.data;
      setMyPets(petsData);

      if (petsData.length > 0) {
        setUserId(petsData[0].user.id);
      }
    } catch (error) {
      console.error('반려동물 데이터 가져오기 실패:', error);
      Alert.alert('오류', '반려동물 데이터를 불러오는 데 실패했습니다.');
    }
  }, [getToken]);

  useEffect(() => {
    fetchMyPets();
  }, [fetchMyPets]);

  // 게시글 등록
  const handleRegister = async () => {
    if (!title || !description || !location || !selectedPet) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }

    try {
      const token = await getToken();
      if (!token) {return;}

      const lostPostData = {
        title,
        description,
        location,
        petId: selectedPet.id,
        userId,
        lostPhoto: '',
        status: 'active',
        scrap: 0,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post('http://10.0.2.2:8080/lost-posts', lostPostData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('등록 완료', '게시물이 등록되었습니다!');
      console.log('등록된 LostPost:', response.data);

      // 지도 화면으로 이동
      navigation.replace('kakaoMapScreen');
    } catch (error: any) {
      console.error('게시물 등록 실패:', error);
      const errorMessage = error.response?.data?.message || '게시물 등록에 실패했습니다.';
      Alert.alert('오류', errorMessage);
    }
  };

  // 주소 선택 핸들러
  const handleAddressSelected = (address: { zonecode: string; address: string }) => {
    setLocation(`${address.address} (${address.zonecode})`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        placeholder="글 제목을 작성해주세요."
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>마이펫 불러오기</Text>
      <TouchableOpacity style={styles.petSelector} onPress={() => setModalVisible(true)}>
        <Text style={styles.petSelectorText}>{selectedPet ? selectedPet.petName : '+'}</Text>
      </TouchableOpacity>

      {/* 선택된 반려동물 정보 표시 */}
      {selectedPet && (
        <View style={styles.petInfo}>
          <Text>이름: {selectedPet.petName}</Text>
          <Text>나이: {selectedPet.age}</Text>
          <Text>성별: {selectedPet.gender}</Text>
          <Text>특징: {selectedPet.feature}</Text>
        </View>
      )}

      <Text style={styles.label}>자세한 설명</Text>
      <TextInput
        style={styles.textArea}
        placeholder="잃어버린 시각, 위치, 반려동물의 특징 등을 자세히 설명해주세요."
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>잃어버린 위치</Text>
      <TouchableOpacity style={styles.input} onPress={() => setMapVisible(true)}>
        <Text style={styles.locationText}>{location || '위치를 선택해주세요'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>+ 등록하기</Text>
      </TouchableOpacity>

      {/* 펫 선택 모달 */}
      <PetSelector
        visible={modalVisible}
        pets={myPets.map((pet) => pet.petName)}
        selectedPet={selectedPet ? selectedPet.petName : ''}
        onSelect={(petName) => {
          const selected = myPets.find((pet) => pet.petName === petName);
          setSelectedPet(selected || null);
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />

      {/* 주소 검색 모달 */}
      <AddressSearchModal
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        onAddressSelected={handleAddressSelected}
      />
    </View>
  );
};

export default PostLostPet;
