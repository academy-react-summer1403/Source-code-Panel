import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare
} from 'react-feather';

import Sidebar from '../BlogSidebar';
import Avatar from '@components/avatar';
import Breadcrumbs from '@components/breadcrumbs';

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Badge,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';

import '@styles/base/pages/page-blog.scss';

const BlogDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [blogData, setBlogData] = useState(null); 
  const [comments, setComments] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`https://classapi.sepehracademy.ir/api/News/${id}`);
        console.log("Received Blog Data:", response.data); 
        setBlogData(response.data.detailsNewsDto); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching blog details", error);
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://classapi.sepehracademy.ir/api/News/GetNewsComments?NewsId=${id}`);
        console.log("Received Comments:", response.data); 
        setComments(response.data); 
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [id]);

  const [replies, setReplies] = useState({});

  const fetchReplies = async (commentId) => {
    try {
      const response = await axios.get(`https://classapi.sepehracademy.ir/api/News/GetRepliesComments?Id=${commentId}`);
      setReplies(prevReplies => ({
        ...prevReplies,
        [commentId]: response.data 
      }));
    } catch (error) {
      console.error("Error fetching replies", error);
    }
  };

  const renderTags = () => {
    return blogData.keyword?.split(',').map((tag, index) => (
      <a key={index} href='/' onClick={e => e.preventDefault()}>
        <Badge color='light-secondary' pill>
          {tag}
        </Badge>
      </a>
    ));
  };

  const renderComments = () => {
    if (comments.length === 0) {
      return <div>No comments yet.</div>; 
    }
    return comments.map((comment) => {
      return (
        <Card className='mb-3' key={comment.id}>
          <CardBody>
            <div className='d-flex'>
              <div>
                <Avatar 
                  className='me-75' 
                  img={comment.pictureAddress || "https://via.placeholder.com/40"} 
                  imgHeight='38' 
                  imgWidth='38' 
                />
              </div>
              <div>
                <h6 className='fw-bolder mb-25'>{comment.autor}</h6>
                <CardText>{new Date(comment.inserDate).toLocaleDateString()}</CardText>
                <CardText>{comment.describe}</CardText>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              
              <Button 
                color='link' 
                className='p-0' 
                onClick={() => fetchReplies(comment.id)}>
                Show Replies
              </Button>
            </div>
            
            {replies[comment.id] && replies[comment.id].length > 0 && (
              <div className='ms-3 mt-2'>
                {replies[comment.id].map(reply => (
                  <Card key={reply.id} className='mb-3'>
                    <CardBody>
                      <div className='d-flex'>
                        <div>
                          <Avatar 
                            className='me-75' 
                            img={reply.pictureAddress || "https://via.placeholder.com/40"} 
                            imgHeight='38' 
                            imgWidth='38' 
                          />
                        </div>
                        <div>
                          <h6 className='fw-bolder mb-25'>{reply.autor}</h6>
                          <CardText>{new Date(reply.inserDate).toLocaleDateString()}</CardText>
                          <CardText>{reply.describe}</CardText>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!blogData) {
    return <div>Blog post not found</div>; 
  }

  return (
    <>
      <Breadcrumbs title='Blog Details' data={[{ title: 'Pages' }, { title: 'Blog' }, { title: 'Details' }]} />
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            <Row>
              <Col sm='12'>
                <Card className='mb-3'>
                  <CardImg src={blogData.currentImageAddress} className='img-fluid' top />
                  <CardBody>
                    <CardTitle tag='h4'>{blogData.title}</CardTitle>
                    <div className='d-flex'>
                      <Avatar 
                        className='me-50' 
                        img={blogData.addUserFullName ? `https://www.gravatar.com/avatar/${blogData.userId}` : "https://via.placeholder.com/40"} 
                        imgHeight='24' 
                        imgWidth='24' 
                      />
                      <div>
                        <small className='text-muted me-25'>by</small>
                        <small>
                          <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                            {blogData.addUserFullName}
                          </a>
                        </small>
                        <span className='text-muted ms-50 me-25'>|</span>
                        <small className='text-muted'>{new Date(blogData.insertDate).toLocaleDateString()}</small>
                      </div>
                    </div>
                    <div className='my-1 py-25'>{renderTags()}</div>
                    <div dangerouslySetInnerHTML={{ __html: blogData.describe }} />
                    <div className='d-flex'>
                      
                        
                      
                    </div>
                    <hr className='my-2' />
                    <div className='d-flex align-items-center justify-content-between'>
                      <Button color='primary' onClick={() => navigate(`/pages/blog/edit/${id}`)}>
                        Edit Blog
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm='12'>
                <Card>
                  <CardBody>
                    <h4>Comments</h4>
                    {renderComments()}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
