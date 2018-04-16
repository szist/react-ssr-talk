import React from 'react'
import Helmet from 'react-helmet'

const Metadata = ({ title, description, image }) => (
  <Helmet>
    <title>{`${title} | SSR talk`}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="SSR-talk" />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ssrtalk" />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:description" content={description} />
  </Helmet>
)

export default Metadata
