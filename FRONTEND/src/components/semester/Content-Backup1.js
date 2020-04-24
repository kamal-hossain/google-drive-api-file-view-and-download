import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Breadcrumb, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Batch = (props) => {
  let [Contents, setContents] = useState([]);
  let [loading, setLoading] = useState(true);

  let [parentFolder1, setParentFolder1] = useState('');
  let [parentFolder2, setParentFolder2] = useState('');

  let [currentBreadcrumb, setCurrentBreadcrumb] = useState('');
  let [previousBreadcrumb1, setPreviousBreadcrumb1] = useState('');
  let [previousBreadcrumb2, setPreviousBreadcrumb2] = useState('');

  useEffect(() => {
    async function getBatch() {
      let batch = await axios.get(
        `/api/v1/drive/getfoldercontent/${props.match.params.folderid}`
      );
      setContents(batch.data.data);

      // cis006 = 1J7oOOVMhnRtRa4UmR_rDbEpatlV-M-te
      // CIS - 3 = 18CGBqRtI7vsncLb0ZTOjiLJJnF4Rlv0K
      // Fall - 19 = 1LlfjqXbaaEIvcGru8o92fxAzaJADvppp
      // OOp = 13gEs5L7Ed2UeESCwuzGLETCeBcAe-MF-

      let parentF1;
      let parentF2;
      let parentF3;
      let prevBreadCrumb1;
      if (batch.data.data[0].id) {
        parentF1 = await axios.get(
          `/api/v1/drive/getfileparents/${batch.data.data[0].id}`
        );
      }
      // console.log(parentF1.data.data[0]);
      console.log(parentF1.data.data.parents[0]);

      if (parentF1.data.data.parents[0]) {
        parentF2 = await axios.get(
          `/api/v1/drive/getfileparents/${parentF1.data.data.parents[0]}`
        );
        setParentFolder1(parentF2.data.data.parents[0]);
        setCurrentBreadcrumb(parentF2.data.data.name);
      }
      console.log(parentF2.data.data.parents[0]);
      if (parentF2.data.data.parents[0]) {
        parentF3 = await axios.get(
          `/api/v1/drive/getfileparents/${parentF2.data.data.parents[0]}`
        );
        setParentFolder2(parentF3.data.data.parents[0]);
        setPreviousBreadcrumb1(parentF3.data.data.name);
      }
      console.log(parentF3.data.data.parents[0]);

      // Determining Previous breadcrumb
      if (parentF3) {
        prevBreadCrumb1 = await axios.get(
          `/api/v1/drive/getfileparents/${parentF3.data.data.parents[0]}`
        );
        setPreviousBreadcrumb2(prevBreadCrumb1.data.data.name);
      }

      setLoading(false);
    }
    getBatch();
  }, []);
  let semesterNames = Contents.map((el) => {
    return (
      <tr>
        <td>
          {/* <Link to={`/content/${el.id}`}>{el.name}</Link> */}
          {el.name}{' '}
        </td>
        <td>
          <button className="btn btn-light ">
            <a
              href={`http://192.168.0.11:3500/api/v1/drive/downloadafile/${el.id}/${el.name}`}
              className="text-dark"
            >
              Download
            </a>
          </button>
        </td>
      </tr>
    );
  });

  if (!loading) {
    return (
      <Fragment>
        <header
          id="main-header"
          className="py-2 bg-secondary text-white shadow"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-light">
                <Breadcrumb className="shadow ">
                  <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={`/batch/${parentFolder2}`}>
                      {previousBreadcrumb2}
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={`/courses/${parentFolder1}`}>
                      {previousBreadcrumb1}
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    <Link to="#!" active className="text-light">
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
              <h3 className=" text-light shadow rounded">All Contents:</h3>
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="text-center"
              >
                <thead>
                  <tr>
                    <th>Content Names:</th>
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
