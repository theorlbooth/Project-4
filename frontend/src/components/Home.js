import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  return <div>
    {/* <section className="section main" style={{ height: '80vh' }}>
      <h1>
        Hello World
      </h1>
    </section> */}
    <section style={{ height: '80vh'}}>
      <div className="container main-container">
        <Link to="/explore">
          <h1 className="title">
          FIND YOUR NEXT ADVENTURE
          </h1>
        </Link>
        
        {/* <h2 className="subtitle">
          Fullheight subtitle
        </h2> */}
      </div>
    </section>

    <footer className="footer">
      <div className="content has-text-centered is-dark">
        <p>
          Built by <strong>Theo</strong> and <strong>Sean </strong> :)
        </p>
      </div>
    </footer>

  </div>
}

export default Home