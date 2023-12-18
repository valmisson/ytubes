import {
  type Channel,
  type ExtractData,
  type Live,
  type Music,
  type Playlist,
  type Video
} from './types/data'
import {
  type Options,
  type SearchOptions
} from './types/shims'
import searchVideo from './core/searchVideo'
import searchMusic from './core/searchMusic'

async function getVideo (query: string, options?: Options): Promise<Video[]> {
  const videos = await searchVideo<Video>(query, {
    type: 'video',
    ...options
  })

  return videos
}

async function getPlaylist (query: string, options?: Options): Promise<Playlist[]> {
  const playlists = await searchVideo<Playlist>(query, {
    type: 'playlist',
    ...options
  })

  return playlists
}

async function getChannel (query: string, options?: Options): Promise<Channel[]> {
  const channels = await searchVideo<Channel>(query, {
    type: 'channel',
    ...options
  })

  return channels
}

async function getMovie (query: string, options?: Options): Promise<Video[]> {
  const movies = await searchVideo<Video>(query, {
    type: 'movie',
    ...options
  })

  return movies
}

async function getLive (query: string, options?: Options): Promise<Live[]> {
  const lives = await searchVideo<Live>(query, {
    type: 'live',
    ...options
  })

  return lives
}

async function getMusic (query: string, options?: Options): Promise<Music[]> {
  const musics = await searchMusic(query, {
    ...options
  })

  return musics
}

async function search (query: string, options: SearchOptions): Promise<ExtractData[]> {
  const { type } = options

  if (type === 'music') {
    const {
      max,
      language
    } = options

    return await searchMusic(query, {
      max,
      language
    })
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
