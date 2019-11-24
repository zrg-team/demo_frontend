import { DEFAULT_URL, DEFAULT_PUBLIC_URL } from '../configs'
export const TIMEOUT = 12000
export const MODULE_NAME = 'common'
// export const DEFAULT_PUBLIC_URL = 'http://45.79.88.237:81'

export function getDefaultUrl () {
  try {
    if (window) {
      return DEFAULT_PUBLIC_URL
    }
  } catch (err) {
  }
  return DEFAULT_URL
}

export const JOB_TYPES = {
  1: 'user.full_time',
  2: 'user.part_time'
}

export const DEFAULT_LANGUAGE = 'en'
