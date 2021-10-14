import { ExtractData } from './types/data'
import { Options } from './types/shims'
import { sliceResults } from './shared'
import search from './functions/search'

async function getVideo (query: string, options: Options): Promise<Array<ExtractData>> {
  const videos = await search(query, {
    type: 'video',
    ...options
  })

  return sliceResults(videos, options?.max)
}

async function getPlaylist (query: string, options: Options): Promise<Array<ExtractData>> {
  const playlists = await search(query, {
    type: 'playlist',
    ...options
  })

  return sliceResults(playlists, options?.max)
}

async function getChannel (query: string, options: Options): Promise<Array<ExtractData>> {
  const channels = await search(query, {
    type: 'channel',
    ...options
  })

  return sliceResults(channels, options?.max)
}

async function getMovie (query: string, options: Options): Promise<Array<ExtractData>> {
  const movies = await search(query, {
    type: 'movie',
    ...options
  })

  return sliceResults(movies, options?.max)
}

async function getLive (query: string, options: Options): Promise<Array<ExtractData>> {
  const lives = await search(query, {
    type: 'live',
    ...options
  })

  return sliceResults(lives, options?.max)
}

export {
  getVideo,
  getPlaylist,
  getChannel,
  getMovie,
  getLive,
  search
}
