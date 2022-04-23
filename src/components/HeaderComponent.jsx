import React, { Component } from 'react';

export class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <header className='header'>
          <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
            <div>
              {' '}
              <a href='#' className='navbar-brand'></a> Employee Management App{' '}
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
