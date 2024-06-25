import React from 'react';
import MainContent from '../generic/MainContent';
import './PageTemplate.css';
import Footer from '../generic/FooterButtons';

const PageTemplate = ({ children, footerButtons }) => {
  return (
    <div className="page-template">

        <MainContent>{children}</MainContent>
        {footerButtons !== null && footerButtons !== undefined &&
            <Footer buttons={footerButtons} />
        }

    </div>
  );
};

export default PageTemplate;