import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Breadcrumb, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  let [semesters, setSemesters] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(window.location.href);

    async function getBatch() {
      let batch = await axios.get(
        '/api/v1/drive/getfoldercontent/1J7oOOVMhnRtRa4UmR_rDbEpatlV-M-te'
      );
      setSemesters(batch.data.data);
      setLoading(false);
    }
    getBatch();
  }, []);
  let semesterNames = semesters.map((el) => (
    <tr>
      <td>
        <Link
          to={{
            pathname: `/batch/${el.id}`,
            previousLink: window.location.href
          }}
        >
          {el.name}
        </Link>
      </td>
    </tr>
  ));

  if (!loading) {
    return (
      <Fragment>
        {/* <header
          id="main-header"
          className="py-2 bg-secondary text-white shadow"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Breadcrumb className="shadow ">
                  <Breadcrumb.Item>
                    <Link to="#!">Home</Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </header> */}

        {/* Batch List here */}
        <div className="container mt-3">
          <Jumbotron className="bg-secondary">
            <Container>
              <h3 className=" text-light shadow rounded">Select Your Batch:</h3>
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="text-center"
              >
                <thead>
                  <tr>
                    <th>Batch</th>
                  </tr>
                </thead>
                <tbody>{semesterNames}</tbody>
              </Table>
            </Container>
          </Jumbotron>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className="text-center mt-5">
        <div
          class="spinner-border text-light mt-5"
          style={{ width: '4em', height: '4rem' }}
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};

export default Home;
