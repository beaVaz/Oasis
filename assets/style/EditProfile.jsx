import { StyleSheet } from 'react-native'

export default StyleSheet.create({
     safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#EFEFEF', 
  },
  changePhotoText: {
    fontSize: 14,
    color: '#888', 
    marginTop: 8,
  },
  container: {
    flex: 1, 
    padding: 20,
    justifyContent: 'flex-start', 
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  readOnlyInput: { 
    backgroundColor: '#f0f0f0', 
    color: '#555', 
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  logoutButtonContainer: {
    marginTop: 15, 
    marginBottom: 20, 
  },
  authMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  authSuggestion: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  centeredContent: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxImg01: {
    position: 'absolute',
    top: 0,
    right:0,
  },
  boxImg02: {
    position: 'absolute',
    bottom:0,
    left:0,
  },
})