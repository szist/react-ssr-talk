import Loadable from 'react-loadable'
import Promise from 'bluebird'
import Loading from 'components/Loading'
import { TIMEOUT } from 'utils/constants'

export default Loadable({
  loader: () =>
    Promise.delay(TIMEOUT).then(() => import(/* webpackChunkName: "codesplit" */ './Component')),
  loading: Loading
})
