import { Channel, ExtractData, Live, Playlist, PlaylistVideo, Video } from '../types/data'
import { ObjectType } from '../types/shims'
import { findByKey, toNumber } from '../shared'
import { compress, getThumbnail, getVideoLink, unknown } from './utils'

export function extractVideoData <T> (type: string, data: ObjectType): Array<T> {
  const contents = getContents(data)

  const results = contents?.map((renderer: ObjectType): ExtractData => {
    if (type === 'video') return getVideoData(renderer?.videoRenderer)
    if (type === 'playlist') return getPlaylistData(renderer?.playlistRenderer)
    if (type === 'channel') return getChannelData(renderer?.channelRenderer)
    if (type === 'channel-live') return getChannelLiveData(renderer?.channelRenderer)
    if (type === 'movie') return getVideoData(renderer?.videoRenderer)
    if (type === 'live') return getLiveData(renderer?.videoRenderer)

    return null
  })

  return results
}

function getContents (dRender: ObjectType) {
  try {
    const sRender = findByKey('itemSectionRenderer', dRender)

    const results = sRender.contents?.filter((item: ObjectType) => {
      return findByKey('videoRenderer', item) ||
        findByKey('channelRenderer', item) ||
        findByKey('playlistRenderer', item)
    })

    return results
  } catch (err) {
    throw new Error('Error on get contents data')
  }
}

function getVideoData (vRender: ObjectType): Video {
  try {
    const id = vRender?.videoId

    return {
      id,
      type: 'video',
      title: compress(vRender?.title),
      views: getVideoViews(vRender),
      duration: vRender?.lengthText?.simpleText || '00:00',
      uploaded: vRender?.publishedTimeText?.simpleText || unknown('Date'),
      link: getVideoLink(id),
      shareLink: getVideoLink(id, true),
      channel: getChannelLink(vRender),
      thumbnail: getThumbnail(id)
    }
  } catch (err) {
    throw new Error('Error on get video data')
  }
}

function getPlaylistData (pRender: ObjectType): Playlist {
  try {
    const id = pRender?.playlistId

    const preview = pRender?.videos?.map((dataRender: ObjectType) => {
      return getPlaylistVideoData(dataRender.childVideoRenderer)
    })

    return {
      id,
      type: 'playlist',
      title: getTitle(pRender),
      videoCount: getPlaylistCount(pRender),
      link: getPlaylistLink(id),
      channel: getChannelLink(pRender),
      thumbnail: getThumbnail(preview[0].id),
      preview
    }
  } catch (err) {
    throw new Error('Error on get playlist data')
  }
}

function getPlaylistVideoData (pRender: ObjectType): PlaylistVideo {
  try {
    const id = pRender?.videoId

    return {
      id,
      title: getTitle(pRender),
      duration: pRender?.lengthText?.simpleText || '00:00',
      link: getVideoLink(id),
      shareLink: getVideoLink(id, true),
      thumbnail: getThumbnail(id)
    }
  } catch (err) {
    throw new Error('Erro on get playlist videos')
  }
}

function getChannelData (cRender: ObjectType): Channel {
  try {
    const id = cRender?.channelId

    const channelEndLink = findByKey('url', cRender.navigationEndpoint)
    const channelLink = channelEndLink && `https://www.youtube.com${channelEndLink}`

    return {
      id,
      type: 'channel',
      name: getTitle(cRender, 'Name'),
      verified: getChannelVerified(cRender),
      link: channelLink || unknown('Link')
    }
  } catch (err) {
    throw new Error('Error on get channel data')
  }
}

function getChannelLiveData (cRender: ObjectType): Channel {
  try {
    const id = cRender?.channelId

    const channelEndLink = findByKey('url', cRender.navigationEndpoint)
    const channelLink = channelEndLink && `https://www.youtube.com${channelEndLink}`

    return {
      id,
      type: 'channel',
      name: getTitle(cRender, 'Name'),
      verified: getChannelVerified(cRender),
      link: channelLink || unknown('Link')
    }
  } catch (err) {
    throw new Error('Error on get channel data')
  }
}

function getLiveData (vRender: ObjectType): Live {
  try {
    const { id, title, channel, link, shareLink, thumbnail } = getVideoData(vRender)

    return {
      id,
      type: 'live',
      title,
      link,
      shareLink,
      channel,
      thumbnail
    }
  } catch (err) {
    throw new Error('Error on get live data')
  }
}

function getTitle (dRender: ObjectType, keyName = 'Title'): string {
  const title = dRender?.title?.simpleText

  if (!title) return unknown(keyName)

  return title
}

function getChannelLink (cRender: ObjectType): string {
  const channel = findByKey('url', cRender?.longBylineText?.runs[0]?.navigationEndpoint)

  if (!channel) return unknown('Channel')

  return `https://www.youtube.com${channel}`
}

function getChannelVerified (cRender: ObjectType) {
  const badges = cRender?.ownerBadges
    ?.map((badge: ObjectType) => findByKey('style', badge)) || []

  return badges.includes('BADGE_STYLE_TYPE_VERIFIED') || badges.includes('BADGE_STYLE_TYPE_VERIFIED_ARTIST')
}

function getVideoViews (vRender: ObjectType): number {
  const viewsText = vRender?.viewCountText?.simpleText || '0'

  return toNumber(viewsText)
}

function getPlaylistLink (playlistId: string): string {
  if (!playlistId) return unknown('Link')

  return `https://www.youtube.com/playlist?list=${playlistId}`
}

function getPlaylistCount (pRender: ObjectType): number {
  const countText = compress(pRender?.videoCountText) || '0'

  return toNumber(countText)
}
