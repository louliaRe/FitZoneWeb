// CreatePostCard.js
import React, { useState } from 'react';
import { Card, Group, Avatar, TextInput, Button, Textarea, Text, FileInput } from '@mantine/core';
import { useAuth } from '../../AuthContext';
import { IconCamera } from '@tabler/icons-react';
import { addPost } from '../../ApiServices/EmpServices';
import classes from './CreatePost.module.css';

const CreatePostCard = ({ handleAddPost }) => {
  const [newPost, setNewPost] = useState({ publisherName: 'Your Name', publisherImage: '/path/to/default-avatar.jpg', content: '', image: [] });
  const {authState}= useAuth();
  const [error, setError] = useState('')

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = (file) => {
    if (file) {
      setNewPost({ ...newPost, image: file });
    }
  };

    const handleAddPostIn = async () => {

      if (newPost.content || newPost.image) {
        try {
          const formData = new FormData();
          formData.append('content', newPost.content);
          if (newPost.image) {
            formData.append('images', newPost.image);
          }
          
          const response = await addPost(authState.accessToken, formData, authState.gym_id);
          console.log("Post added:", response);
          if (response){
            alert ("Post Added successfully!")
          }
          setNewPost({ ...newPost, content: '', image: null });
          handleAddPost(response);
        } catch (error) {
          console.error("Error adding post:", error);
          alert("Oops!", error);
        }
      
    }else{
      setError('Please enter content or upload an image.');
    }
  };
    

  return (
    <Card shadow="sm" padding="lg"  className={classes.card}>
      <Group>
        <Avatar src={newPost.publisherImage} alt={newPost.publisherName} color="#a1E533" />
        <Text className={classes.text}>{authState.username}</Text>
      </Group>
      <Group>
      <TextInput
          name="content"
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={handleTextChange}
          style={{ marginLeft: '10px' }}
        />
      <div style={{ position: 'relative', marginTop: '10px' }}>
      {error && <Text color="red">{error}</Text>}

        <FileInput
          name="image"
          placeholder="Upload image"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
          id="fileInput"
        />
         

        <label htmlFor="fileInput" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <IconCamera size={24} />
          <span style={{ marginLeft: '8px' }}>Upload image</span>
        </label>
      </div>
      </Group>
      <Group position="apart" mt="md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="#a1E533" onClick={handleAddPostIn}>Post</Button>
      </Group>
    </Card>
  );
};

export default CreatePostCard;
