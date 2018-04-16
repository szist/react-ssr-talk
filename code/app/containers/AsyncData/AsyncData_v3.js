import React from 'react'
import { withRouter } from 'react-router-dom'
import Metadata from 'components/Metadata'
import Loading from 'components/Loading'

function loadAsyncData() {
  const asyncData = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.`
  return new Promise(resolve => {
    setTimeout(() => resolve(asyncData), 3000)
  })
}

class AsyncData extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    this.bootstrap()
  }

  static KEY = Symbol('AsyncData')

  bootstrap() {
    const { staticContext } = this.props
    if (staticContext) {
      const { [AsyncData.KEY]: data = null } = staticContext.data
      if (data) {
        // eslint-disable-next-line
        this.state.data = data
      } else {
        staticContext.bootstrap.push([AsyncData.KEY, loadAsyncData()])
      }
    }
  }

  componentDidMount() {
    loadAsyncData().then(data => this.setState({ data }))
  }

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
        <div>{this.state.data ? this.state.data : <Loading />}</div>
      </div>
    )
  }
}

export default withRouter(AsyncData)
