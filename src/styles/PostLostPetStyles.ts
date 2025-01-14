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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    color: '#6A5ACD',
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
});

export default styles;
