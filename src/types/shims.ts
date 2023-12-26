export type SearchVideoType = 'video'
  | 'shorts'
  | 'channel'
  | 'playlist'
  | 'movie'
  | 'live'

export type SearchChannelType = 'videos'
  | 'shorts'
  | 'playlists'
  | 'streams'

export type SearchVideoTypes = Record<SearchVideoType, string>

export type SearchTypes = SearchVideoType
  | 'music'
  | 'channelVideos'
  | 'channelShorts'
  | 'channelLives'
  | 'channelPlaylists'

export interface SearchOptions {
  type: SearchTypes
  language?: string
  max?: number
}

export type Options = Omit<SearchOptions, 'type'>

export interface SearchVideoOptions extends SearchOptions {
  type: SearchVideoType
}

export interface SearchChannelOptions {
  type: SearchChannelType
  language?: string
  max?: number
}

export interface SearchMusicOptions extends Options {}

export type ObjectType = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
