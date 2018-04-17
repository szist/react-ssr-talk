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

class Component extends React.PureComponent {
  render() {
    return (
      <div>
        <Metadata title="Codesplit" description="I'm a code-split component" image="" />
        <h1>I am a code-split container.</h1>
        <p>
          I am making the initial chunk size smaller. Thanks to me, the page can be loaded faster on
          slow connections and on low-performance devices, which would struggle with a huge load of
          component rendering at the same time.
          <br />
          I also make server-side rendering a nightmare. Especially when I have async data.
        </p>
        <div>
          <AsyncPart />
        </div>
      </div>
    )
  }
}

export default Component
