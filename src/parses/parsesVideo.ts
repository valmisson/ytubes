import { type ExtractData } from '../types/data'
import { type ObjectType } from '../types/shims'
import { findByKey } from '../shared'
import { getChannelData, getLiveData, getPlaylistData, getVideoData } from './utils'

export function extractVideoData <T> (type: string, data: ObjectType): T[] {
  const contents = getContents(data)

  const results = contents?.map((renderer: ObjectType): ExtractData => {
    const videoRenderer = renderer?.videoRenderer
    const playlistRenderer = renderer?.playlistRenderer
    const channelRenderer = renderer?.channelRenderer

    if (type === 'video' && videoRenderer) return getVideoData(videoRenderer)
    if (type === 'playlist' && playlistRenderer) return getPlaylistData(playlistRenderer)
    if (type === 'channel' && channelRenderer) return getChannelData(channelRenderer)
    if (type === 'movie' && videoRenderer) return getVideoData(videoRenderer)
    if (type === 'live' && videoRenderer) return getLiveData(videoRenderer)

    return null
  })?.filter((result: ObjectType) => result)

  return results
}

function getContents (dRender: ObjectType) {
  try {
    const sRender = findByKey('itemSectionRenderer', dRender)

    const results = sRender?.contents?.filter((item: ObjectType) => {
      return findByKey('videoRenderer', item) ??
        findByKey('channelRenderer', item) ??
        findByKey('playlistRenderer', item)
    })

    return results
  } catch (err) {
    throw new Error('Error on get contents data')
  }
}
