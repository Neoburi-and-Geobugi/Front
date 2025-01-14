import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import PetSelector from '../components/PetSelector'; // 반려동물 선택 모달
import AddressSearchModal from '../components/AddressSearchModal';
import styles from '../styles/PostLostPetStyles';
import axios from 'axios'; // HTTP 요청 라이브러리

const PostLostPet: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null); // 선택된 반려동물의 상세 정보
  const [myPets, setMyPets] = useState<any[]>([]); // 반려동물 리스트

  // 반려동물 리스트를 가져오는 함수
  const fetchMyPets = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/pets/list/{userId}'); // 사용자의 반려동물 리스트 조회 API 호출
      setMyPets(response.data); // 가져온 반려동물 리스트 설정
    } catch (error) {
      console.error('반려동물 데이터 가져오기 실패:', error);
      Alert.alert('오류', '반려동물 데이터를 불러오는 데 실패했습니다.');
    }
  };

  // 컴포넌트 렌더링 시 반려동물 리스트를 가져옵니다.
  useEffect(() => {
    fetchMyPets();
  }, []);

  // 잃어버린 게시물 등록 함수
  const handleRegister = async () => {
    if (!title || !description || !location || !selectedPet) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }

    try {
      const lostPostData = {
        title,
        description,
        location,
        petId: selectedPet.id, // 선택된 반려동물의 ID
      };

      const response = await axios.post('http://10.0.2.2:8080/lost-posts', lostPostData); // LostPost 생성 API
      Alert.alert('등록 완료', '게시물이 등록되었습니다!');
    } catch (error) {
      console.error('게시물 등록 실패:', error);
      Alert.alert('오류', '게시물 등록에 실패했습니다.');
    }
  };

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
        <Text style={styles.petSelectorText}>{selectedPet ? selectedPet.petName : '반려동물 선택'}</Text>
      </TouchableOpacity>

      {selectedPet && (
        <View style={styles.petDetails}>
          <Image source={{ uri: selectedPet.petPhoto }} style={styles.petImage} />
          <Text>품종: {selectedPet.breed}</Text>
          <Text>나이: {selectedPet.age}년</Text>
          <Text>성별: {selectedPet.gender}</Text>
          <Text>위치: {selectedPet.residence}</Text>
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
        pets={myPets} // DB에서 가져온 반려동물 리스트
        selectedPet={selectedPet}
        onSelect={setSelectedPet} // 반려동물 선택 시 해당 반려동물의 정보 처리
        onClose={() => setModalVisible(false)} // 모달 닫기
      />

      {/* 카카오 주소 검색 모달 */}
      <AddressSearchModal
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        onAddressSelected={handleAddressSelected}
      />
    </View>
  );
};

export default PostLostPet;
