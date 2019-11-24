import { getDefaultUrl } from '../../common/models'

export const MODULE_NAME = 'user'

export const ENDPOINTS = {
  login: `${getDefaultUrl()}/user/login`,
  verifyEmail: `${getDefaultUrl()}/user/verify`
}
