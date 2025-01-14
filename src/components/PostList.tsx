import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


// 하단 게시글 리스트 컴포넌트
const PostList = ({ posts, onSelect }: { posts: any[]; onSelect: (id: number) => void }) => {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.postItem} onPress={() => onSelect(item.id)}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postInfo}>
        <Text style={styles.postType}>{item.type === 'lost' ? '실종' : '발견'}</Text>
        <Text style={styles.postTitle}>{item.petName} | {item.description}</Text>
        <Text style={styles.postTime}>{item.timeAgo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  postItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  postInfo: {
    marginLeft: 10,
  },
  postType: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 12,
    color: '#AAA',
  },
});

export default PostList;
