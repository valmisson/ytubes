import {
  type Channel,
  type ExtractData,
  type Live,
  type Music,
  type Playlist,
  type Video,
  type Shorts
} from './types/data'
import {
  type Options,
  type SearchOptions,
  type SearchVideoOptions
} from './types/shims'
import searchVideo from './core/searchVideo'
import searchMusic from './core/searchMusic'
import searchChannel from './core/searchChannel'

async function getVideo (query: string, options?: Options): Promise<Video[]> {
  const videos = await searchVideo<Video>(query, {
    type: 'video',
    ...options
  })

  return videos
}

async function getShorts (query: string, options?: Options): Promise<Shorts[]> {
  const shorts = await searchVideo<Shorts>(`${query} #shorts`, {
    type: 'shorts',
    ...options
  })

  return shorts
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

async function getChannelVideos (channelID: string, options?: Options): Promise<Video[]> {
  const channelVideos = await searchChannel<Video>(channelID, {
    type: 'videos',
    ...options
  })

  return channelVideos
}

async function getChannelShorts (channelID: string, options?: Options): Promise<Shorts[]> {
  const channelVideos = await searchChannel<Shorts>(channelID, {
    type: 'shorts',
    ...options
  })

  return channelVideos
}

async function getChannelLives (channelID: string, options?: Options): Promise<Video[]> {
  const channelVideos = await searchChannel<Video>(channelID, {
    type: 'streams',
    ...options
  })

  return channelVideos
}

async function getChannelPlaylists (channelID: string, options?: Options): Promise<Playlist[]> {
  const channelPlaylists = await searchChannel<Playlist>(channelID, {
    type: 'playlists',
    ...options
  })

  return channelPlaylists
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

  const {
    max,
    language
  } = options

  if (type === 'music') {
    return await searchMusic(query, { max, language })
  }

  if (type === 'channelVideos') {
    return await getChannelVideos(query, { max, language })
  }

  if (type === 'channelShorts') {
    return await getChannelShorts(query, { max, language })
  }

  if (type === 'channelLives') {
    return await getChannelLives(query, { max, language })
  }

  if (type === 'channelPlaylists') {
    return await getChannelPlaylists(query, { max, language })
  }

  return await searchVideo<Video | Playlist | Channel | Live>(
    query,
    options as SearchVideoOptions
  )
}

export {
  getVideo,
  getShorts,
  getPlaylist,
  getChannel,
  getChannelVideos,
  getChannelShorts,
  getChannelLives,
  getChannelPlaylists,
  getMovie,
  getLive,
  getMusic,
  search
}
