import React from 'react'
import DefaultError from 'components/DefaultError'

class CatchError extends React.Component {
  state = {
    hasError: false,
    error: null
  }

  static defaultProps = {
    ErrorComponent: DefaultError
  }

  // does not get called on server-side
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info })
  }

  render() {
    if (this.state.hasError) {
      if (__DEV__) {
        // eslint-disable-next-line global-require
        const RedboxError = require('components/RedBoxError').default
        const { error, info } = this.state

        return <RedboxError error={error} info={info} />
      }

      const { ErrorComponent } = this.props
      return <ErrorComponent />
    }
    return this.props.children
  }
}

export default CatchError
