import { ObjectType, SearchType } from '../types/shims'
import { Channel, ExtractData, Live, Playlist, PlaylistVideo, Video } from '../types/data'
import { findByKey, toNumber } from '.'

export function extractData (type: SearchType, data: ObjectType): Array<ExtractData> {
  const contents = getContents(data)

  const results = contents?.map((renderer: ObjectType): ExtractData => {
    if (type === 'video') return getVideoData(renderer?.videoRenderer)
    if (type === 'playlist') return getPlaylistData(renderer?.playlistRenderer)
    if (type === 'channel') return getChannelData(renderer?.channelRenderer)
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
      title: compress(vRender?.title),
      channel: getChannelLink(vRender),
      uploaded: vRender?.publishedTimeText?.simpleText || unknown('Date'),
      views: getVideoViews(vRender),
      duration: vRender?.lengthText?.simpleText || '00:00',
      link: getVideoLink(id),
      shareLink: getVideoLink(id, true),
      thumbnail: getThumbnail(id)
    }
  } catch (err) {
    console.log(err)
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
      title: getTitle(pRender),
      channel: getChannelLink(pRender),
      videoCount: getPlaylistCount(pRender),
      link: getPlaylistLink(id),
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
      name: getTitle(cRender, 'Name'),
      link: channelLink || unknown('Link'),
      verified: getChannelVerified(cRender)
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
      title,
      channel,
      link,
      shareLink,
      thumbnail
    }
  } catch (err) {
    throw new Error('Error on get live data')
  }
}

function compress (key: ObjectType): string {
  return key?.runs?.map((v: ObjectType) => v.text).join('')
}

function unknown (keyName: string): string {
  return `Unknown ${keyName}`
}

function getTitle (dRender: ObjectType, keyName = 'Title'): string {
  const title = dRender?.title?.simpleText

  if (!title) return unknown(keyName)

  return title
}

function getThumbnail (id: string): string {
  if (!id) return unknown('Thumbnail')

  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
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

function getVideoLink (videoId: string, short = false): string {
  if (!videoId) return unknown('Link')

  return short ? `https://youtu.be/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`
}

function getPlaylistLink (playlistId: string): string {
  if (!playlistId) return unknown('Link')

  return `https://www.youtube.com/playlist?list=${playlistId}`
}

function getPlaylistCount (pRender: ObjectType): number {
  const countText = compress(pRender?.videoCountText) || '0'

  return toNumber(countText)
}
