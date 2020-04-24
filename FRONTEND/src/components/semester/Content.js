import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';

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
      // setContents(batch.data.data);

      batch.data.data.forEach(async (el) => {
        let elInfo = await axios.get(`/api/v1/drive/openafile/${el.id}`);
        // console.log(elInfo.data.data);
        setContents((previous) => {
          return [...previous, elInfo.data.data];
        });
      });

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
      // console.log(parentF1.data.data.parents[0]);

      if (parentF1.data.data.parents[0]) {
        parentF2 = await axios.get(
          `/api/v1/drive/getfileparents/${parentF1.data.data.parents[0]}`
        );
        setParentFolder1(parentF2.data.data.parents[0]);
        setCurrentBreadcrumb(parentF2.data.data.name);
      }
      // console.log(parentF2.data.data.parents[0]);
      if (parentF2.data.data.parents[0]) {
        parentF3 = await axios.get(
          `/api/v1/drive/getfileparents/${parentF2.data.data.parents[0]}`
        );
        setParentFolder2(parentF3.data.data.parents[0]);
        setPreviousBreadcrumb1(parentF3.data.data.name);
      }
      // console.log(parentF3.data.data.parents[0]);

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
  let semesterContents = Contents.map((el) => {
    return (
      <div class="col mb-4">
        <div class="card text-light bg-dark shadow">
          {el.thumbnailLink ? (
            <img
              src={`${el.thumbnailLink}`}
              class="card-img-top"
              alt={`${el.name}`}
              style={{ maxHeight: '300px' }}
            />
          ) : (
            ''
          )}
          <div class="card-body">
            <h5 class="card-title">
              <img src={`${el.iconLink}`} />
              {el.name}
            </h5>
            <a
              href={`${el.webViewLink}`}
              className="btn btn-success btn-lg "
              role="button"
              target="_blank"
            >
              Open
            </a>
            <a
              href={`${el.webContentLink}`}
              className="btn btn-danger btn-lg ml-2"
              role="button"
              target="_blank"
            >
              Download
            </a>
          </div>
          <div class="card-footer">
            <small class="text-muted">
              Uploaded at:{' '}
              {<Moment format="DD/MM/YYYY">{el.createdTime}</Moment>}
            </small>
          </div>
        </div>
      </div>
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

        {/* Course Contents here */}
        <div className="container mt-3">
          <div class="row row-cols-1 row-cols-md-2 bg-secondary p-3">
            {semesterContents}
          </div>
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
