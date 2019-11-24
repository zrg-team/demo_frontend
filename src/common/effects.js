import axios from 'axios'
import { TIMEOUT } from './models'
import storeAccessible from './utils/storeAccessible'
import { MODULE_NAME as MODULE_USER } from '../modules/user/models'

export function fetch ({ url, headers, ...options }) {
  return axios({
    method: 'GET',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...options
  }).then((response) => {
    return response
  }).catch(error => {
    throw error
  })
}

export function fetchAuth ({ url, headers, ...options }) {
  const user = storeAccessible.getState(MODULE_USER)
  if (!user || !user.token) {
    throw new Error('MISSING_USER_TOKEN')
  }
  return axios({
    method: 'GET',
    timeout: TIMEOUT,
    url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
      ...headers
    },
    ...options
  }).then((response) => {
    return response
  }).catch(error => {
    throw error
  })
}
