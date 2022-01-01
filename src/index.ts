import { Channel, ExtractData, Live, Music, Playlist, Video } from './types/data'
import { Options, SearchOptions } from './types/shims'
import { defaultOptions } from './constants/default'
import searchVideo from './core/searchVideo'
import channelLive from './core/channelLive'
import searchMusic from './core/searchMusic'

const Options: Options = {
  max: defaultOptions.max,
  language: defaultOptions.language
} as const

async function getVideo (query: string, options = Options): Promise<Array<Video>> {
  const videos = await searchVideo<Video>(query, {
    type: 'video',
    ...options
  })

  return videos
}

async function getPlaylist (query: string, options = Options): Promise<Array<Playlist>> {
  const playlists = await searchVideo<Playlist>(query, {
    type: 'playlist',
    ...options
  })

  return playlists
}

async function getChannel (query: string, options = Options): Promise<Array<Channel>> {
  const channels = await searchVideo<Channel>(query, {
    type: 'channel',
    ...options
  })

  return channels
}

async function getChannelLive (channelId: string, options = Options): Promise<Array<Live>> {
  const lives = await channelLive<Live>(channelId, {
    type: 'channel-live',
    ...options
  })

  return lives
}

async function getMovie (query: string, options = Options): Promise<Array<Video>> {
  const movies = await searchVideo<Video>(query, {
    type: 'movie',
    ...options
  })

  return movies
}

async function getLive (query: string, options = Options): Promise<Array<Live>> {
  const lives = await searchVideo<Live>(query, {
    type: 'live',
    ...options
  })

  return lives
}

async function getMusic (query: string, options = Options): Promise<Array<Music>> {
  const musics = await searchMusic(query, options)

  return musics
}

async function search (query: string, options: SearchOptions): Promise<Array<ExtractData>> {
  const { type } = options

  if (type === 'music') {
    return await searchMusic(query, options)
  }

  return await searchVideo<Video | Playlist | Channel | Live>(query, options)
}

export {
  getVideo,
  getPlaylist,
  getChannel,
  getMovie,
  getLive,
  getMusic,
  search
}
