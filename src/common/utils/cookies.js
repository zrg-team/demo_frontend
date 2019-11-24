export function setCookie (cname, cvalue) {
  try {
    document.cookie = `${cname}=${cvalue};path=/`
    return true
  } catch (err) {
    return false
  }
}
export function getCookie (cname, cvalue) {
  try {
    const name = `${cname}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return JSON.parse(c.substring(name.length, c.length))
      }
    }
  } catch (err) {
  }
  return ''
}
