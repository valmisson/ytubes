export type SearchType = 'video'
  | 'channel'
  | 'playlist'
  | 'movie'
  | 'live'

export type SearchTypes = Record<SearchType, string>

export interface SearchOptions {
  type: SearchType
  language?: string
}

export interface Options {
  language?: string
  max?: number
}

export type ObjectType = {
  [key: string]: any // eslint-disable-line
}
