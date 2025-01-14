import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8EFFF',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#EEE',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
