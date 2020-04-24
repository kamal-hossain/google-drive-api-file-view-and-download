import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-white">
      <div>
        <div>
          <div>
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <Link to="./" className="btn btn-danger">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
