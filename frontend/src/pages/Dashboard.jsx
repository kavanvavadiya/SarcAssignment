import Post from '../components/post/Post'
import React, {useState, useEffect } from 'react'
import axios from 'axios'
import './dashboard.css'
import {Close, PostAdd} from '@mui/icons-material';
// import { getposts} from '../services/ApiService'
import addNotification from 'react-push-notification';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editPostId, setEditPostId] = useState(null);
  
    useEffect(() => {
      axios.get('http://localhost:8000/api/posts/')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    const handleCreate = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/api/posts/', { title, content })
        .then(response => {
          setPosts([...posts, response.data]);
          setTitle('');
          setContent('');
        })
        .catch(error => {
          console.log(error);
        });
        addNotification({
            title:"new post added",
            message: "new post added",
            duration: 3000,
            native:true,
        })
        // window.location.reload(false);
    };
  
    const handleEdit = (postId) => {
      const postToEdit = posts.find(post => post.id === postId);
      setEditTitle(postToEdit.title);
      setEditContent(postToEdit.content);
      setEditPostId(postId);
      setShowEditModal(true);
    };
  
    const handleEditSubmit = (event) => {
      event.preventDefault();
      axios.put(`http://localhost:8000/api/posts/${editPostId}/`, { title: editTitle, content: editContent })
        .then(response => {
          const index = posts.findIndex(post => post.id === editPostId);
          const newPosts = [...posts];
          newPosts[index] = response.data;
          setPosts(newPosts);
          setShowEditModal(false);
        })
        .catch(error => {
          console.log(error);
        });
        addNotification({
            title:"new post added",
            message: "new post added",
            duration: 3000,
            native:true,
        })
    };
  
    const handleDelete = (postId) => {
      axios.delete(`http://localhost:8000/api/posts/${postId}/`)
        .then(() => {
          setPosts(posts.filter(post => post.id !== postId));
        })
        .catch(error => {
          console.log(error);
        });
    };
    
  return (
    <div className="dashboard">
    <div className="left">

    <h1 className='text-center'>Blog Posts</h1>
    <div className="flex">

    {posts.map(post => (
        <Post key={post?.id } post={post} handleEdit={() =>handleEdit(post.id)} handleDelete={()=> handleDelete(post.id)}/>
        ))}
    </div>
        </div>
        <div className="right">
    {!showAddModal? <div className="add">
    <Button onClick={()=> {setShowAddModal(!showAddModal)}}><PostAdd/> Add Post</Button>
    </div> :<div className="add">
    <Button onClick={()=> {setShowAddModal(!showAddModal)}}><Close/> Colse</Button>
    </div>
    }
 
    {showAddModal && (
            <Form onSubmit={handleCreate}>
            <h3>Create your Blog here</h3>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title of your blog" value={title}
          onChange={(event) => setTitle(event.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" placeholder="Type your content" style={{ height: '100px' }} value={content}
          onChange={(event) => setContent(event.target.value)} required/>
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{ margin: '5px'}}>
       Create
      </Button>
    </Form>
      )}
    
    {showEditModal && (
        <div>
        <h3>Edit Post</h3>
        <Form onSubmit={handleEditSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Edit Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title of your blog" value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" placeholder="Type your content" style={{ height: '100px' }} value={editContent} onChange={(event) => setEditContent(event.target.value)} required/>
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{ margin: '5px'}}>
       Edit
      </Button>
      <Button variant="primary" onclick={()=>setShowEditModal(false)}>
       Cancel
      </Button>
    </Form>
       
      </div>
    )}
  </div>
    </div>
  );
}
