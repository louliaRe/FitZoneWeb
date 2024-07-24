import React , {useState, useEffect} from 'react';
import { Card, Image, Text, Button, Group, Avatar, TextInput, FileInput } from '@mantine/core';
import classes from './PostCard.module.css';
import { IconCamera } from '@tabler/icons-react';


const PostCard = ({ post, onApprove, onDeny, onDelete, onEdit }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ content: post.content, image: post.image });
  const [error, setError] = useState('');

  const handleTextChange = (event) => {
    console.log("handler", event)
    const { name, value } = event.target;
    setEditedPost({ ...editedPost, [name]: value });
    if (error) {
      setError('');
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      setEditedPost({ ...editedPost, image: file });
      if (error) {
        setError('');
      }
    }
  };

  const handleSave = () => {
    if (editedPost.content || editedPost.image) {
      onEdit(post.id, editedPost);
      setIsEditing(false); 
    } else {
      setError('Please enter content or upload an image.');
    }
  };
 return (
    <Card shadow="sm" padding="lg" className={classes.card}>
      {isEditing ? (
        <>
          <Group>
            <Avatar src={editedPost.publisherImage} alt={editedPost.publisherName} color="#a1E533" />
            <Text className={classes.text}>{editedPost.poster}</Text>
          </Group>
          <Group>
            <TextInput
              name="content"
              placeholder="What's on your mind?"
              value={editedPost.content}
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
            <Button color="red" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button color="#a1E533" onClick={handleSave}>Save</Button>
          </Group>
        </>
      ) : (
        <>
          <Group>
            <Avatar src={post.publisherImage} alt={post.publisherName} color="#a1E533" />
            <Text className={classes.text}>{post.poster}</Text>
          </Group>
          <Text className={classes.time}>{post.created_at}</Text>
          <div className={classes.CB}>
            <Text mt="md" mb="md">{post.content}</Text>
          </div>
          {post.images && post.images.length > 0 && post.images.map((im) => (
            <Image key={im.id} src={`${im.image}`} alt="Post Image" className={classes.img} />
          ))}
          <Group position="apart" mt="md" className={classes.btns}>
            {post.is_approved ? (
              <>
                <Button color="#a1E533" onClick={() => setIsEditing(true)}>Edit</Button>
                <Button color="red" onClick={() => onDelete(post.id)}>Delete</Button>
              </>
            ) : (
              <>
                <Button color="#a1E533" onClick={() => onApprove(post.id)}>Approve</Button>
                <Button color="red" onClick={() => onDeny(post.id)}>Deny</Button>
              </>
            )}
          </Group>
        </>
      )}
    </Card>
  );
};

export default PostCard;
