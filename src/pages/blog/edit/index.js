import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [featuredImg, setFeaturedImg] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [insertDate, setInsertDate] = useState('');
  const [active, setActive] = useState(true);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`https://classapi.sepehracademy.ir/api/News/${id}`);
        const data = response.data.detailsNewsDto;
        setTitle(data.title);
        setDescription(data.describe);
        setKeywords(data.keyword);
        setImgPath(data.imgPath);
        setFeaturedImg(data.imgUrl);
        setAuthorName(data.addUserFullName);
        setInsertDate(data.insertDate);
        setActive(data.active);  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const onChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;
    setImgPath(files[0].name);
    reader.onload = function () {
      setFeaturedImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    
    const updatedData = {
      id,
      title,
      describe: description,
      imgPath,
      imgUrl: featuredImg,
      addUserFullName: authorName,
      insertDate,
      keyword: keywords,
      active,  
    };

    try {
      const response = await axios.put('https://classapi.sepehracademy.ir/api/News/UpdateNews', updatedData);
      console.log('API Response:', response);
      navigate(`/pages/blog/detail/${id}`);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-edit-wrapper">
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Form className="mt-2" onSubmit={handleSaveChanges}>
                <Row>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="blog-edit-title">
                      Title
                    </Label>
                    <Input
                      id="blog-edit-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Col>
                  <Col md="12" className="mb-2">
                    <Label className="form-label" for="blog-edit-description">
                      Description
                    </Label>
                    <Input
                      type="textarea"
                      id="blog-edit-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                  <Col md="12" className="mb-2">
                    <Label className="form-label" for="blog-edit-keywords">
                      Keywords
                    </Label>
                    <Input
                      id="blog-edit-keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                  </Col>
                  <Col className="mb-2" sm="12">
                    <div className="border rounded p-2">
                      <h4 className="mb-1">Featured Image</h4>
                      <div className="d-flex flex-column flex-md-row">
                        <img
                          className="rounded me-2 mb-1 mb-md-0"
                          src={featuredImg || 'https://via.placeholder.com/150'}
                          alt="featured img"
                          width="170"
                          height="110"
                        />
                        <div>
                          <small className="text-muted">
                            Required image resolution 800x400, image size 10mb.
                          </small>
                          <p className="my-50">
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              {`C:/fakepath/${imgPath}`}
                            </a>
                          </p>
                          <div className="d-inline-block">
                            <div className="mb-0">
                              <Input
                                type="file"
                                id="exampleCustomFileBrowser"
                                name="customFile"
                                onChange={onChange}
                                accept=".jpg, .png, .gif"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" className="mb-2">
                    <Label for="active">Active</Label>
                    <Input
                      type="checkbox"
                      id="active"
                      checked={active}
                      onChange={() => setActive(!active)}  // toggle active status
                    />
                  </Col>
                  <Col className="mt-50">
                    <Button color="primary" className="me-1" type="submit">
                      Save Changes
                    </Button>
                    <Button color="secondary" outline onClick={() => navigate(`/pages/blog/detail/${id}`)}>
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

export default BlogEdit;
