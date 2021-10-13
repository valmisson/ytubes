export interface Video {
  id: string
  title: string
  channel: string
  duration: number
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

export type Live = Omit<Video, 'duration' | 'views' | 'uploaded'>
export type PlaylistVideo = Omit<Video, 'channel' | 'views' | 'uploaded'>
export type ExtractData = Video | Playlist | Channel | Live | null
