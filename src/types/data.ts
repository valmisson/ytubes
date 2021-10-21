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
}

export interface Channel {
  id: string
  name: string
  link: string
  verified: boolean
}

export interface Playlist {
  id: string
  title: string
  channel: string
  videoCount: number
  thumbnail: string
  link: string
  preview: Array<Video>
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
}

export type Live = Omit<Video, 'duration' | 'views' | 'uploaded'>
export type PlaylistVideo = Omit<Video, 'channel' | 'views' | 'uploaded'>
export type ExtractData = Video | Playlist | Channel | Live | Music | null
