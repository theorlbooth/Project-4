import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

const Loader = () => {
  return <div className="sweet-loading">
    <PuffLoader
      css={`display: block;
    margin: auto;
    border-color: red;`}
      size={150}
      color={'#FF0000'}
      loading={true}
    />
  </div>

}

export default Loader