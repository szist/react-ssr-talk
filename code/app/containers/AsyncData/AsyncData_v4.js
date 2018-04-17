import React from 'react'
import Metadata from 'components/Metadata'
import Loading from 'components/Loading'
import { withJob } from 'react-jobs'
import { TIMEOUT } from 'utils/constants'

function loadAsyncData() {
  const asyncData = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.`
  return new Promise(resolve => {
    setTimeout(() => resolve(asyncData), TIMEOUT)
  })
}

const _AsyncPart = ({ jobResult }) => <div>{jobResult}</div>

const AsyncPart = withJob({
  LoadingComponent: Loading,
  work: props => loadAsyncData(),
  shouldWorkAgain: (nextProps, prevProps, status) => true,
  serverMode: 'resolve' // or 'defer'
})(_AsyncPart)

class AsyncData extends React.PureComponent {
  render() {
    return (
      <div>
        <Metadata title="AsyncData" description="A page with asynchronous data on it" image="" />
        <h1>I am a page with asynchronous data on it. I load the data when I get mounted.</h1>
        <p>
          I potentially save some amount of data that has to be loaded on the mobile devices.
          <br />
          I also make server-side rendering hard.
        </p>
        <AsyncPart />
      </div>
    )
  }
}

export default AsyncData
