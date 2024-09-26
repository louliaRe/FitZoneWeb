import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Group,
  Avatar,
  TextInput,
  Button,
  Textarea,
  Stack,
} from "@mantine/core";
import PostCard from "../../Components/Employee/PostCard";
import CreatePostCard from "../../Components/Employee/CreatePost";
import {
  UpdatePost,
  deletePost,
  getPosts,
  accept,
} from "../../ApiServices/EmpServices";
import { useAuth } from "../../AuthContext";
import EditPostCard from "../../Components/Employee/EditPostCard";
import Layout from "../../LayoutA";

const ManagePosts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      publisherName: "Coach Mohannad",
      publisherImage: "/path/to/image1.jpg",
      content: "Join my new class",
      image: "/Courses.jpg",
    },
    {
      id: 2,
      publisherName: "Coach Yasmin",
      publisherImage: "/path/to/image2.jpg",
      content: "We will start our class in November! Stay tuned",
      image: "",
    },
  ]);
  const { authState } = useAuth();
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await getPosts(
          authState.accessToken,
          authState.gym_id
        );
        console.log("posts", postData);

        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [authState.accessToken, authState.gym_id]);

  const handleApprove = async (postId) => {
    try {
      await accept(authState.accessToken, postId, authState.gym_id, true);
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, is_approved: true } : post
        )
      );
      console.log(`Approved post with id: ${postId}`);
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  const handleDeny = async (postId) => {
    try {
      await accept(authState.accessToken, postId, authState.gym_id, false);
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, is_approved: false } : post
        )
      );
      console.log(`Denied post with id: ${postId}`);
    } catch (error) {
      console.error("Error denying post:", error);
    }
  };

  const handleDelete = async (postId) => {
    alert("Are you sure you want to delete this post ?");
    try {
      const resdelete = await deletePost(
        authState.accessToken,
        postId,
        authState.gym_id
      );
      setPosts(posts.filter((post) => post.id !== postId));
      console.log(`Deleted post with id: ${postId}`);
      console.log(resdelete.data);
    } catch (error) {
      console.log("deleting", error);
    }
  };
  const handleAddPost = (newPost) => {
    console.log("Adding new post:", newPost);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleEdit = async (postId, editedPost) => {
    console.log("eedd", editedPost);
    try {
      // const formData = new FormData();
      // formData.append('content', editedPost.content);
      // if (editedPost.image instanceof File) {
      //   formData.append('image', editedPost.image);
      // }
      const response = await UpdatePost(
        authState.accessToken,
        postId,
        authState.gym_id,
        editedPost
      );
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, ...response } : post
        )
      );
    } catch (error) {
      console.log("Error updating post:", error);
    }
  };

  return (
    <Layout>
      <Stack mt={40} w="50%">
        <CreatePostCard handleAddPost={handleAddPost} />

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onApprove={handleApprove}
            onDeny={handleDeny}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </Stack>
    </Layout>
  );
};

export default ManagePosts;
