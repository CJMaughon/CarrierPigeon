import React from 'react';
import { connect } from 'react-redux';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Instructor Dashboard</h1>
        </div>
      </div>
    </section>
  );
};

export default connect(null)(Landing);
