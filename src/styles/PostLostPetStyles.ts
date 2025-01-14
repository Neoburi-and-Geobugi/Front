import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF', // 화면 배경색
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 100,
    borderWidth: 1,
    borderColor: '#DDD',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  petSelector: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  petSelectorText: {
    fontSize: 16,
    color: '#666',
  },
  locationText: {
    color: '#999',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 배경 투명도
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
  petItemText: { // petItemText 추가
    fontSize: 16,
    color: '#333',
  },
  petSelected: {
    fontSize: 16,
    color: '#6A5ACD',
    fontWeight: 'bold',
  },
  mapModal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mapCloseButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    padding: 10,
  },
  mapCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalCloseButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
   // 추가된 petInfo 스타일
   petInfo: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default styles;
