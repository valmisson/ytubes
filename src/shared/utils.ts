import { type ObjectType } from '../types/shims'
import { defaultOptions } from '../constants/default'

export function isEmpty (object: ObjectType): boolean {
  return Object.keys(object).length === 0
}

export function toNumber (text: string): number {
  const onlyNumberText = text.replace(/[^0-9]/g, '')

  return parseInt(onlyNumberText)
}

export function sliceResults <T> (arr: Array<T>, max = defaultOptions.max): Array<T> {
  if (!arr) return []

  return arr.slice(0, max)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function findByKey (key: string, object: ObjectType): any {
  let value: any

  if (!object) return undefined

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

export function isYtURL (url: string): boolean {
  url = url.replace(/\s+/g, '') // remove spaces

  const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^"&?/\s]{11})/gi

  return !!pattern.test(url)
}

export function decodeHEX (hex: string): string {
  return hex
    .replace(/\\x22/g, '"')
    .replace(/\\x7b/g, '{')
    .replace(/\\x7d/g, '}')
    .replace(/\\x5b/g, '[')
    .replace(/\\x5d/g, ']')
    .replace(/\\x3b/g, ';')
    .replace(/\\x3d/g, '=')
    .replace(/\\x27/g, '\'')
    .replace(/\\\\/g, 'doubleAntiSlash')
    .replace(/\\/g, '')
    .replace(/doubleAntiSlash/g, '\\')
}
