import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Breadcrumb, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Batch = (props) => {
  let [semesters, setSemesters] = useState([]);
  let [loading, setLoading] = useState(true);
  let [parentFolder, setParentFolder] = useState('');
  let [currentBreadcrumb, setCurrentBreadcrumb] = useState('');
  let [previousBreadcrumb1, setPreviousBreadcrumb1] = useState('');

  useEffect(() => {
    async function getBatch() {
      let batch = await axios.get(
        `/api/v1/drive/getfoldercontent/${props.match.params.folderid}`
      );
      setSemesters(batch.data.data);

      let parentF1;
      let parentF2;
      let prevBreadCrumb1;
      if (batch.data.data[0].id) {
        parentF1 = await axios.get(
          `/api/v1/drive/getfileparents/${batch.data.data[0].id}`
        );
      }

      if (parentF1.data.data.parents[0]) {
        parentF2 = await axios.get(
          `/api/v1/drive/getfileparents/${parentF1.data.data.parents[0]}`
        );
        setParentFolder(parentF2.data.data.parents[0]);
        setCurrentBreadcrumb(parentF2.data.data.name);
      }

      // Determining Previous breadcrumb
      if (parentF2) {
        prevBreadCrumb1 = await axios.get(
          `/api/v1/drive/getfileparents/${parentF2.data.data.parents[0]}`
        );
        setPreviousBreadcrumb1(prevBreadCrumb1.data.data.name);
      }

      setLoading(false);
    }
    getBatch();
  }, []);

  let semesterNames = semesters.map((el) => (
    <tr>
      <td>
        <Link
          to={{
            pathname: `/content/${el.id}`
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
        <header
          id="main-header"
          className="py-2 bg-secondary text-white shadow"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Breadcrumb className="shadow ">
                  <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={`/batch/${parentFolder}`}>
                      {previousBreadcrumb1}
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    <Link
                      to={props.location.pathname}
                      active
                      className="text-light"
                    >
                      {currentBreadcrumb}
                    </Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </header>

        {/* Batch List here */}
        <div className="container mt-3">
          <Jumbotron className="bg-secondary">
            <Container>
              <h3 className=" text-light shadow rounded">Select Course:</h3>
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="text-center"
              >
                <thead>
                  <tr>
                    <th>Courses</th>
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

export default Batch;
