import React from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet } from 'react-native';

type PetSelectorProps = {
  visible: boolean;
  pets: string[]; // 반려동물 이름 목록
  selectedPet: string; // 현재 선택된 반려동물
  onSelect: (pet: string) => void; // 반려동물 선택 시 호출될 함수
  onClose: () => void; // 모달 닫기
};

const PetSelector: React.FC<PetSelectorProps> = ({ visible, pets, selectedPet, onSelect, onClose }) => {
  const renderPetItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.petItem} onPress={() => onSelect(item)}>
      <Text style={selectedPet === item ? styles.petSelected : styles.petText}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>마이펫 List</Text>
          <FlatList
            data={pets}
            keyExtractor={(item) => item}
            renderItem={renderPetItem}
          />
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text>선택 완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  petItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  petText: {
    fontSize: 16,
    color: '#333',
  },
  petSelected: {
    fontSize: 16,
    color: '#6A5ACD', // 선택된 반려동물 강조
  },
  modalActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 10,
  },
});

export default PetSelector;
