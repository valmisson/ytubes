import { type ObjectType } from '../types/shims'

export function getSearchData (webPage: string, regex: RegExp): ObjectType {
  try {
    const data: string = regex.exec(webPage)?.[1] ?? '{}'

    const result: ObjectType = JSON.parse(data)

    return result
  } catch (err) {
    throw new Error('Failed to parse YouTube search data. YouTube might have updated their site or no results returned.')
  }
}

export function compress (key: ObjectType): string {
  return key?.runs?.map((v: ObjectType) => v.text).join('')
}

export function unknown (keyName: string): string {
  return `Unknown ${keyName}`
}

export function getVideoLink (videoId: string, short = false): string {
  if (!videoId) return unknown('Link')

  return short ? `https://youtu.be/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`
}

export function getThumbnail (id: string): string {
  if (!id) return unknown('Thumbnail')

  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
}
