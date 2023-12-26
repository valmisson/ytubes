import { type ObjectType, type SearchChannelType } from '../types/shims'
import { type ExtractData } from '../types/data'
import { findByKey } from '../shared'
import { getChannelPlaylistData, getChannelShortsData, getLiveData, getVideoData } from './utils'

export function extractChannelData <T> (type: SearchChannelType, data: ObjectType): T[] {
  const contents = type === 'playlists'
    ? getPlaylistContents(data)
    : getContents(data)

  const results = contents?.map((renderer: ObjectType): ExtractData => {
    const videoRenderer = renderer?.videoRenderer
    const reelItemRenderer = renderer?.reelItemRenderer
    const gridPlaylistRenderer = renderer?.gridPlaylistRenderer

    const channelId = findByKey('canonicalBaseUrl', data)

    if (videoRenderer) videoRenderer.longBylineText = { url: channelId }
    if (reelItemRenderer) reelItemRenderer.longBylineText = { url: channelId }
    if (gridPlaylistRenderer) gridPlaylistRenderer.longBylineText = { url: channelId }

    if (type === 'videos' && videoRenderer) return getVideoData(videoRenderer)
    if (type === 'shorts' && reelItemRenderer) return getChannelShortsData(reelItemRenderer)
    if (type === 'streams' && videoRenderer) return getLiveData(videoRenderer)
    if (type === 'playlists' && gridPlaylistRenderer) return getChannelPlaylistData(gridPlaylistRenderer)

    return null
  })?.filter((result: ObjectType) => result?.id)

  return results
}

function getContents (dRender: ObjectType) {
  try {
    const sRender = findByKey('richGridRenderer', dRender)

    const results = sRender?.contents
      ?.filter((item: ObjectType) => {
        return findByKey('videoRenderer', item) ??
          findByKey('reelItemRenderer', item)
      })
      ?.map((item: ObjectType) => findByKey('content', item))

    return results
  } catch (err) {
    throw new Error('Error on get channel contents data')
  }
}

function getPlaylistContents (dRender: ObjectType) {
  try {
    const sRender = findByKey('sectionListRenderer', dRender)

    const results = sRender?.contents
      ?.map((item: ObjectType) => findByKey('itemSectionRenderer', item))
      ?.map((item: ObjectType) => findByKey('items', item))
      ?.filter((item: ObjectType) => findByKey('gridPlaylistRenderer', item))
      ?.flat()

    return results
  } catch (err) {
    throw new Error('Error on get channel playlist contents data')
  }
}
