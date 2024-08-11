import React from 'react';
import Logo from './Logo';
import './Loading.module.css';

const Loading = () => (
  <div className="loading-container">
    <div className="spinner">
      <div className="logo-container">
        <Logo />
      </div>
    </div>
  </div>
);

export default Loading;
