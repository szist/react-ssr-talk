import React from "react";
import Helmet from 'react-helmet'

const Html = ({ assets, initialState, body }) => {
  const appState = {
    __html: `
      window.INITIAL_STATE = ${JSON.stringify(initialState)}`
  };

  
  const head = Helmet.renderStatic();
  const htmlAttrs = head.htmlAttributes.toComponent();
  const bodyAttrs = head.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {assets.css.map(asset => (
          <link rel="stylesheet" type="text/css" href={asset} key={asset} />
        ))}
      </head>
      <body {...bodyAttrs}>
        <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
        <script dangerouslySetInnerHTML={appState} />
        {assets.js.map(asset => <script src={asset} key={asset} />)}
      </body>
    </html>
  );
};

export default Html;
