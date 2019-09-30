import React from 'react';
import { Helmet } from 'react-helmet';

function FourOhFourPage() {
  return (
    <div className="App">
      <Helmet>
        <title>Oh No</title>
        <meta name="description" content="Page Not Found" />
      </Helmet>
      Page not found
    </div>
  );
}

export default FourOhFourPage;
