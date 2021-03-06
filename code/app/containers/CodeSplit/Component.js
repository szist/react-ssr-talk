import React from 'react'
import Metadata from 'components/Metadata'
import Loading from 'components/Loading'
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

class Component extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    this.bootstrap()
  }

  static KEY = Symbol('Component')

  bootstrap() {
    const { staticContext } = this.props
    if (staticContext) {
      const { [Component.KEY]: data = null } = staticContext.data
      if (data) {
        // eslint-disable-next-line
        this.state.data = data
      } else {
        staticContext.bootstrap.push([Component.KEY, loadAsyncData()])
      }
    }
  }

  componentDidMount() {
    loadAsyncData().then(data => this.setState({ data }))
  }

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
        <div>{this.state.data ? this.state.data : <Loading />}</div>
      </div>
    )
  }
}

export default Component
