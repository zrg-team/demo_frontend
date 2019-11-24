import Router from 'next/router'

const USER_TYPE = {
  ADMIN: 1,
  EMPLOYER: 2,
  JOB_SEEKER: 3
}

export const redirectTo = (destination, res) => {
  if (res) {
    /** Redicrect in server side */
    res.writeHead(302, { Location: destination })
    res.end()
  } else {
    /** Redicrect in client side when use <Link> tag */
    Router.push(destination)
  }
  return false
}

const validate = (role, user) => {
  const {
    user_type_id: userType,
    jobSeekerOfUser
  } = user
  const type = jobSeekerOfUser ? jobSeekerOfUser.type : null
  const level = jobSeekerOfUser ? jobSeekerOfUser.level : null
  switch (role) {
    case 'ADMIN':
      return +userType === USER_TYPE.ADMIN
    case 'EMPLOYER':
      return +userType === USER_TYPE.EMPLOYER
    case 'JOB_SEEKER':
      return +userType === USER_TYPE.JOB_SEEKER && +type === 0
    case 'FREELANCER':
      return (+userType === USER_TYPE.JOB_SEEKER && +type === 1 && +level === 3)
  }
}

const service = (res, user) => {
  return {
    accept: (roles) => {
      if (!user.token) {
        return redirectTo('/', res)
      }
      const valid = roles.some((role) => {
        return validate(role, user.user)
      })
      if (!valid) {
        return redirectTo('/', res)
      }
      return true
    }
  }
}

export default service
