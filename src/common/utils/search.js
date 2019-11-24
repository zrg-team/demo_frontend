export const parseSearch = (searchParams = {}) => {
  if (!searchParams.search) return {}
  const fields = searchParams.fields ? searchParams.fields.join(';') : ''
  let includes = searchParams.includes || []
  let search = ''
  let searchFields = ''

  Object.keys(convertSearchKey(searchParams.search)).forEach((key) => {
    const valueOfSearch = searchParams.search[key]
    const valueOfSearchFields = searchParams.searchFields[key]

    if (valueOfSearch !== null || valueOfSearch !== undefined || valueOfSearch !== '') {
      // Find and push includes
      if (key.indexOf('.') !== -1) {
        // check duplicate
        const include = key.split('.')[0]
        if (!includes.find(item => item === include)) {
          includes.push(key.split('.')[0] || '')
        }
      }
      // Search with Op in (value is Array)
      if (Array.isArray(valueOfSearch)) {
        if (valueOfSearch[0]) {
          search += `${key}:${valueOfSearch.join(',')};`
          searchFields += `${key}:in;`
        }
      } else
      // Search with Op =
      if (valueOfSearchFields === '=') {
        search += `${key}:${valueOfSearch};`
        searchFields += `${key}:=;`
      } else if (valueOfSearchFields) {
        search += `${key}:${valueOfSearch};`
        searchFields += `${key}:${valueOfSearchFields};`
      } else {
        search += `${key}:%${valueOfSearch}%;`
        searchFields += `${key}:like;`
      }
    }
  })

  includes = includes.join(';')

  return {
    search,
    searchFields,
    fields,
    includes,
    searchJoin: searchParams.searchJoin || 'and'
  }
}

export const convertSearchKey = (search) => {
  const fieldConverted = {}
  const searchTmp = { ...search }

  Object.keys(search).forEach((key) => {
    const field = search[key]
    if (field) {
      if (typeof field === 'object' &&
          // is not an Array
          !Array.isArray(field) &&
          // is not a date
          !field._isAMomentObject) {
        Object.keys(field).forEach(keyOfField => {
          const value = field[keyOfField]
          fieldConverted[`${key}.${keyOfField}`] = value
        })
        delete searchTmp[key]
      }
    }
  })

  return {
    ...searchTmp,
    ...fieldConverted
  }
}

export const splitFullName = (fullName = '') => {
  let words = fullName.trim().split(/ +/)

  /** Validate word */
  words = words.map(word => (/[!@#$%^&*]/.test(word) ? '' : word))

  const firstName = words[0]
  words.shift()
  const lastName = words.join(' ')

  return {
    first_name: firstName,
    last_name: lastName
  }
}

export const parserSearchParamsToUrl = (searchParams = {}) => {
  const arr = []
  Object.keys(searchParams).forEach(key => {
    let value = searchParams[key]

    if (value && value.length !== 0) {
      if (Array.isArray(value)) {
        value = value.join(',')
      }
      arr.push(`${key}=${value}`)
    }
  })
  return arr.join('&')
}
