export type SearchType = 'video'
  | 'channel'
  | 'playlist'
  | 'movie'
  | 'live'

export type SearchTypes = Record<SearchType, string>

export interface DefaultOptions {
  type?: SearchType
  language?: string
  max?: number
}

export type Options = Omit<DefaultOptions, 'type'>

export type ObjectType = {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
