import { type SearchTypes } from './shims'

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
  type: SearchTypes
}

export interface Channel {
  id: string
  name: string
  link: string
  verified: boolean
  type: SearchTypes
}

export interface Playlist {
  id: string
  title: string
  channel: string
  videoCount: number
  thumbnail: string
  link: string
  preview: Video[]
  type: SearchTypes
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
  type: SearchTypes
}

export type Live = Omit<Video, 'duration' | 'views' | 'uploaded'>
export type PlaylistVideo = Omit<Video, 'channel' | 'views' | 'uploaded' | 'type'>
export type ExtractData = Video | Playlist | Channel | Live | Music | null
