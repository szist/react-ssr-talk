// @flow

import React from 'react'

import s from './DefaultError.pcss'

const DefaultError = ({ onClose }) => {
  return (
    <div className={s.container}>
      <h1>Error</h1>
      <h3>Something went wrong</h3>
    </div>
  )
}

export default DefaultError
