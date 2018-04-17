import { asyncComponent } from 'react-async-component'
import Promise from 'bluebird'
import Loading from 'components/Loading'
import { TIMEOUT } from 'utils/constants'

export default asyncComponent({
  resolve: () =>
    Promise.delay(TIMEOUT).then(() => import(/* webpackChunkName: "codesplit" */ './Component_v4')),
  LoadingComponent: Loading,
  serverMode: 'resolve' // 'defer' or 'resolve' or 'boundary'
})
