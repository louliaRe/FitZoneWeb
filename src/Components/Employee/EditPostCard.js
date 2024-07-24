// EditPostCard.js
import React, { useState, useEffect } from 'react';
import { Card, Group, Avatar, TextInput, Button, Text, FileInput } from '@mantine/core';
import { IconCamera } from '@tabler/icons-react';
import classes from './EditPostCard.module.css';

const EditPostCard = ({ post, onUpdatePost, onCancelEdit }) => {
  const [updatedPost, setUpdatedPost] = useState(post);
  const [error, setError] = useState('');

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost({ ...updatedPost, [name]: value });
    if (error) {
      setError('');
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      setUpdatedPost({ ...updatedPost, image: file });
      if (error) {
        setError('');
      }
    }
  };

  const handleUpdatePostIn = async () => {
    if (updatedPost.content || updatedPost.image) {
      onUpdatePost(updatedPost);
    } else {
      setError('Please enter content or upload an image.');
    }
  };

  return (
    <Card shadow="sm" padding="lg" className={classes.card}>
      <Group>
        <Avatar src={updatedPost.publisherImage} alt={updatedPost.publisherName} color="#a1E533" />
        <Text className={classes.text}>{updatedPost.publisherName}</Text>
      </Group>
      <Group>
        <TextInput
          name="content"
          placeholder="What's on your mind?"
          value={updatedPost.content}
          onChange={handleTextChange}
          style={{ marginLeft: '10px' }}
        />
        <div style={{ position: 'relative', marginTop: '10px' }}>
          <FileInput
            name="image"
            placeholder="Upload image"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
            id="fileInputEdit"
          />
          <label htmlFor="fileInputEdit" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <IconCamera size={24} />
            <span style={{ marginLeft: '8px' }}>Upload image</span>
          </label>
        </div>
      </Group>
      {error && <Text color="red">{error}</Text>}
      <Group position="apart" mt="md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="red" onClick={onCancelEdit}>Cancel</Button>
        <Button color="#a1E533" onClick={handleUpdatePostIn}>Update</Button>
      </Group>
    </Card>
  );
};

export default EditPostCard;
