import React from 'react';
import Header from '../generic/Header';
import MainContent from '../generic/MainContent';
import './PageTemplate.css';
import Footer from '../generic/FooterButtons';

const PageTemplate = ({ children, footerButtons }) => {
  return (
    <div className="page-template">
        <Header />
        <MainContent>{children}</MainContent>
        <Footer buttons={footerButtons} />
    </div>
  );
};

export default PageTemplate;