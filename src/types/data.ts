import { type SearchVideoType } from './shims'

export interface Video {
  id: string
  title: string
  channel: string
  duration: string
  views: number
  thumbnail: string
  uploaded: string
  link: string
  shareLink: string
  type: SearchVideoType
}

export interface Channel {
  id: string
  name: string
  link: string
  verified: boolean
  type: 'channel'
}

export interface Playlist {
  id: string
  title: string
  channel: string
  videoCount: number
  thumbnail: string
  link: string
  preview: Video[] | string
  type: 'playlist'
}

export interface Live {
  id: string
  title: string
  live: boolean
  channel: string
  views: number
  thumbnail: string
  link: string
  shareLink: string
  type: 'live'
}

export interface Shorts {
  id: string
  title: string
  views: number
  channel: string
  thumbnail: string
  link: string
  type: 'shorts'
}

export interface Music {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  link: string
  videoLink: string
  channel: string
  thumbnail: string,
  explicit: boolean
  type: 'music'
}

export type PlaylistVideo = Omit<Video, 'channel' | 'views' | 'uploaded' | 'type'>
export type ExtractData = Video | Playlist | Channel | Live | Shorts | Music | null
