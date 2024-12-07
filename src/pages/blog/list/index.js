import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardText, CardTitle, CardImg, Badge, Button } from 'reactstrap';
import '@styles/base/pages/page-blog.scss';

const BlogList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [newsPerPage] = useState(6); 
  const [totalCount, setTotalCount] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://classapi.sepehracademy.ir/api/News?PageNumber=${currentPage}&RowsOfPage=${newsPerPage}&SortingCol=InsertDate&SortType=DESC`);
        const result = await response.json();
        
        setData(result.news || []);
        setTotalCount(result.totalCount || 0); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); 

  const renderNewsList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (data.length === 0) {
      return <p>No news available.</p>;
    }

    return data.map((item) => (
      <Col key={item.id} md="6" lg="4">
        <Card className="mb-4 shadow-sm border-0 rounded">
          <Link to={`/pages/blog/detail/${item.id}`}>
            <CardImg
              className="img-fluid"
              src={item.currentImageAddressTumb || 'https://via.placeholder.com/800x400'}
              alt={item.title}
              top
              style={{ height: '200px', objectFit: 'cover' }} 
            />
          </Link>
          <CardBody>
            <CardTitle tag="h4">
              <Link className="blog-title-truncate text-body-heading" to={`/pages/blog/detail/${item.id}`}>
                {item.title}
              </Link>
            </CardTitle>
            <CardText className="blog-content-truncate">{item.miniDescribe || 'No description available.'}</CardText>
          </CardBody>
        </Card>
      </Col>
    ));
  };

  const totalPages = Math.ceil(totalCount / newsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Fragment>
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            <div className="blog-list-wrapper">
              <Row>{renderNewsList()}</Row>

              {/* صفحه‌بندی */}
              <div className="pagination-container d-flex justify-content-center mt-4">
                <Button color="primary" onClick={prevPage} disabled={currentPage === 1} className="me-2">
                  Previous
                </Button>
                <span className="align-self-center">Page {currentPage} of {totalPages}</span>
                <Button color="primary" onClick={nextPage} disabled={currentPage === totalPages} className="ms-2">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogList;
