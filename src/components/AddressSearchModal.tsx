import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

type AddressSearchModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddressSelected: (address: { zonecode: string; address: string }) => void;
};

const AddressSearchModal: React.FC<AddressSearchModalProps> = ({
  visible,
  onClose,
  onAddressSelected,
}) => {
  const handleSelected = (data: any) => {
    const addressData = {
      zonecode: data.zonecode,
      address: data.address,
    };
    onAddressSelected(addressData);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <Postcode
          style={styles.postcode}
          jsOptions={{ animation: true, hideMapBtn: true }}
          onSelected={handleSelected}
          onError={(error) => {
            console.error('Postcode Error:', error);
          }}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postcode: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6A5ACD',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default AddressSearchModal;
