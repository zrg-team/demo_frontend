import { fetch } from '../../common/effects'
import { ENDPOINTS } from './models'
import { setCookie } from '../../common/utils/cookies'
import {
  setUser
} from '../../common/actions'

export default ({ dispatch }) => {
  return {
    login: async (inputs) => {
      try {
        const response = await fetch({
          url: ENDPOINTS.login,
          method: 'POST',
          data: inputs
        }).then((response) => {
          const { data } = response
          if (data && data.success) {
            dispatch(setUser(data.user))
            setCookie('token', data.token)
            setCookie('user', JSON.stringify(data.user))
            return { success: !!data.user }
          }
          throw new Error('INVALID_RETURN')
        })
        return response
      } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
          const { errors } = err.response.data
          console.log('errors', errors)
          return { success: false, message: errors[0].message }
        }
        return { success: false, message: 'Server Error.' }
      }
    },
    logout: () => {
      setCookie('user', '')
      setCookie('token', '')
      localStorage.clear() // eslint-disable-line
    },
    verifyEmail: async (email, token) => {
      try {
        const result = await fetch({
          url: ENDPOINTS.verifyEmail,
          method: 'POST',
          data: {
            email,
            token
          }
        }).then((response) => {
          const { data } = response
          if (data && data.success) {
            return true
          }
          return false
        })
        return { success: result }
      } catch (err) {
        return { success: false }
      }
    }
  }
}
