import { ObjectType } from '../types/shims'

export function getSearchData (webPage: string): ObjectType {
  try {
    const regex = /var ytInitialData = (.*);<\/script>/

    const data: string = regex.exec(webPage)?.[1] || '{}'

    const result: ObjectType = JSON.parse(data)

    return result
  } catch (err) {
    throw new Error('Failed to parse YouTube search data. YouTube might have updated their site or no results returned.')
  }
}

export function isEmpty (object: ObjectType): boolean {
  return Object.keys(object).length === 0
}

export function toNumber (text: string): number {
  const onlyNumberText = text.replace(/[^0-9]/g, '')

  return parseInt(onlyNumberText)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function findByKey (key: string, object: ObjectType): any {
  let value: any

  Object.keys(object).some((k: string) => {
    if (k === key) {
      value = object[k]

      return true
    }

    if (object[k] && typeof object[k] === 'object') {
      value = findByKey(key, object[k])

      return value !== undefined
    }

    return false
  })

  return value
}
