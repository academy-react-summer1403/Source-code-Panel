import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [googleTitle, setGoogleTitle] = useState('');
  const [miniDescribe, setMiniDescribe] = useState('');
  const [describe, setDescribe] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isSlider, setIsSlider] = useState(false);
  const [newsCategoryId, setNewsCategoryId] = useState('');
  const [image, setImage] = useState('');
  
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPostData = {
      Title: title,
      GoogleTitle: title, 
      GoogleDescribe: describe, 
      MiniDescribe: miniDescribe,
      Describe: describe,
      Keyword: keywords,
      IsSlider: isSlider,
      NewsCatregoryId: parseInt(newsCategoryId, 10),
      Image: image,
    };

    try {
      const response = await axios.post('https://classapi.sepehracademy.ir/api/News/CreateNews', newPostData);
      console.log('News created successfully:', response.data);
      navigate('/pages/blog/list'); 
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <div className="blog-create-wrapper">
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6" className="mb-2">
                    <Label for="title">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label for="miniDescribe">Mini Description</Label>
                    <Input
                      type="text"
                      id="miniDescribe"
                      value={miniDescribe}
                      onChange={(e) => setMiniDescribe(e.target.value)}
                      required
                    />
                  </Col>
                  <Col md="12" className="mb-2">
                    <Label for="describe">Description</Label>
                    <Input
                      type="textarea"
                      id="describe"
                      value={describe}
                      onChange={(e) => setDescribe(e.target.value)}
                      required
                    />
                  </Col>
                  <Col md="12" className="mb-2">
                    <Label for="keywords">Keywords</Label>
                    <Input
                      type="text"
                      id="keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      required
                    />
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label for="newsCategoryId">Category ID</Label>
                    <Input
                      type="number"
                      id="newsCategoryId"
                      value={newsCategoryId}
                      onChange={(e) => setNewsCategoryId(e.target.value)}
                      required
                    />
                  </Col>
                  <Col sm="12" className="mb-2">
                    <div className="d-flex flex-column flex-md-row">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <img
                          className="rounded me-2 mb-1 mb-md-0"
                          src={image || 'https://via.placeholder.com/150'}
                          alt="preview"
                          width="170"
                          height="110"
                        />
                        <Input
                          type="file"
                          accept=".jpg, .png, .gif"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label for="isSlider">Is Slider</Label>
                    <Input
                      type="checkbox"
                      id="isSlider"
                      checked={isSlider}
                      onChange={() => setIsSlider(!isSlider)}
                    />
                  </Col>
                  <Col className="mt-50">
                    <Button color="primary" type="submit">
                      Create News
                    </Button>
                    <Button color="secondary" outline onClick={() => navigate('/pages/blog/list')}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogCreate;
