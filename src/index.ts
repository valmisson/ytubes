import { ExtractData } from './types/data'
import { Options } from './types/shims'
import search from './core/search'

async function getVideo (query: string, options: Options): Promise<Array<ExtractData>> {
  const videos = await search(query, {
    type: 'video',
    ...options
  })

  return videos
}

async function getPlaylist (query: string, options: Options): Promise<Array<ExtractData>> {
  const playlists = await search(query, {
    type: 'playlist',
    ...options
  })

  return playlists
}

async function getChannel (query: string, options: Options): Promise<Array<ExtractData>> {
  const channels = await search(query, {
    type: 'channel',
    ...options
  })

  return channels
}

async function getMovie (query: string, options: Options): Promise<Array<ExtractData>> {
  const movies = await search(query, {
    type: 'movie',
    ...options
  })

  return movies
}

async function getLive (query: string, options: Options): Promise<Array<ExtractData>> {
  const lives = await search(query, {
    type: 'live',
    ...options
  })

  return lives
}

export {
  getVideo,
  getPlaylist,
  getChannel,
  getMovie,
  getLive,
  search
}
