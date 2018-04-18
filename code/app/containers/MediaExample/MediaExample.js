import React from 'react'
import Metadata from 'components/Metadata'
import Media from 'react-media'

const Simple = () => (
  <div>
    <Metadata title="Queries" description="Media Queries" image="" />
    <Media query="(max-width: 339px)" defaultMatches={false}>
      <h1>Hi, I am only visible on mobile.</h1>
    </Media>
    <Media query="(min-width: 340px)" defaultMatches={false}>
      <h1>Hi, I am only visible on desktop.</h1>
    </Media>
    <Media query="(min-width: 100000px)" defaultMatches>
      <img src="/never.gif" alt="trololol" />
    </Media>
  </div>
)

export default Simple
