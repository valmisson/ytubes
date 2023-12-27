import {
  type Channel,
  type Live,
  type Music,
  type Playlist,
  type PlaylistVideo,
  type Shorts,
  type Video
} from '../types/data'
import { type ObjectType } from '../types/shims'
import { findByKey, toNumber } from '../shared'

export function getSearchData (webPage: string, regex: RegExp): ObjectType {
  try {
    const data: string = regex.exec(webPage)?.[1] ?? '{}'

    const result: ObjectType = JSON.parse(data)

    return result
  } catch (err) {
    throw new Error('Failed to parse YouTube search data. YouTube might have updated their site or no results returned.')
  }
}

export function getVideoData (vRender: ObjectType): Video {
  try {
    const id = vRender?.videoId

    return {
      id,
      type: 'video',
      title: compress(vRender?.title),
      views: getVideoViews(vRender),
      duration: vRender?.lengthText?.simpleText ?? '00:00',
      uploaded: vRender?.publishedTimeText?.simpleText ?? unknown('Date'),
      link: getVideoLink(id),
      shareLink: getVideoLink(id, true),
      channel: getChannelLink(vRender),
      thumbnail: getThumbnail(id)
    }
  } catch (err) {
    throw new Error('Error on get video data')
  }
}

export function getShortsData (vRender: ObjectType): Shorts {
  try {
    if (!findByKey('reelWatchEndpoint', vRender)) {
      return {} as Shorts
    }

    const {
      id,
      title,
      channel,
      thumbnail,
      views
    } = getVideoData(vRender)

    return {
      id,
      type: 'shorts',
      title,
      views,
      link: getShortsLink(id),
      channel,
      thumbnail
    }
  } catch (err) {
    throw new Error('Error on get shorts data')
  }
}

export function getPlaylistData (pRender: ObjectType): Playlist {
  try {
    const id = pRender?.playlistId

    const preview = pRender?.videos?.map((dataRender: ObjectType) => {
      return getPlaylistVideoData(dataRender.childVideoRenderer)
    }) ?? unknown('Preview')

    return {
      id,
      type: 'playlist',
      title: getTitle(pRender),
      videoCount: getPlaylistCount(pRender),
      link: getPlaylistLink(id),
      channel: getChannelLink(pRender),
      thumbnail: getThumbnail(preview?.length && preview[0].id),
      preview
    }
  } catch (err) {
    throw new Error('Error on get playlist data')
  }
}

export function getPlaylistVideoData (pRender: ObjectType): PlaylistVideo {
  try {
    const id = pRender?.videoId

    return {
      id,
      title: getTitle(pRender),
      duration: pRender?.lengthText?.simpleText ?? '00:00',
      link: getVideoLink(id),
      shareLink: getVideoLink(id, true),
      thumbnail: getThumbnail(id)
    }
  } catch (err) {
    throw new Error('Error on get playlist videos data')
  }
}

export function getChannelData (cRender: ObjectType): Channel {
  try {
    const id = cRender?.channelId

    const channelEndLink = findByKey('url', cRender.navigationEndpoint)
    const channelLink = channelEndLink && `https://www.youtube.com${channelEndLink}`

    return {
      id,
      type: 'channel',
      name: getTitle(cRender, 'Name'),
      verified: getChannelVerified(cRender),
      link: channelLink ?? unknown('Link')
    }
  } catch (err) {
    throw new Error('Error on get channel data')
  }
}

export function getChannelPlaylistData (pRender: ObjectType): Playlist {
  try {
    const id = pRender?.playlistId
    const previewId = pRender?.navigationEndpoint?.watchEndpoint?.videoId

    return {
      id,
      type: 'playlist',
      title: compress(pRender?.title),
      videoCount: getPlaylistCount(pRender),
      link: getPlaylistLink(id),
      channel: getChannelLink(pRender),
      thumbnail: getThumbnail(previewId),
      preview: getVideoLink(previewId && `${previewId}&list=${id}`)
    }
  } catch (err) {
    throw new Error('Error on get playlist data')
  }
}

export function getChannelShortsData (vRender: ObjectType): Shorts {
  try {
    const id = vRender?.videoId

    return {
      id,
      type: 'shorts',
      title: vRender?.headline?.simpleText,
      views: vRender?.viewCountText?.simpleText ?? 0,
      link: getShortsLink(id),
      channel: getChannelLink(vRender),
      thumbnail: getThumbnail(id)
    }
  } catch (err) {
    throw new Error('Error on get shorts video data')
  }
}

export function getLiveData (vRender: ObjectType): Live {
  try {
    const {
      id,
      title,
      channel,
      link,
      shareLink,
      thumbnail,
      views
    } = getVideoData(vRender)

    return {
      id,
      type: 'live',
      live: getIsLive(vRender),
      title,
      link,
      shareLink,
      channel,
      thumbnail,
      views
    }
  } catch (err) {
    throw new Error('Error on get live data')
  }
}

export function getMusicData (dRender: ObjectType): Music {
  try {
    const mRenderLeft = dRender?.flexColumns[0]
      ?.musicResponsiveListItemFlexColumnRenderer
      ?.text?.runs[0]

    const mRenderRight = dRender?.flexColumns[1]
      ?.musicResponsiveListItemFlexColumnRenderer
      ?.text?.runs

    const mRenderRightData = mRenderRight.filter((data: ObjectType) => {
      return findByKey('browseId', data)
    })

    const id = findByKey('videoId', mRenderLeft)
    const channelID = findByKey('browseId', mRenderRightData[0])

    return {
      id,
      type: 'music',
      title: mRenderLeft?.text ?? unknown('Title'),
      artist: mRenderRightData[0]?.text ?? unknown('Artist'),
      album: mRenderRightData[1]?.text ?? unknown('Album'),
      duration: mRenderRight[mRenderRight.length - 1]?.text ?? '00:00',
      link: getMusicLink(id),
      videoLink: getVideoLink(id),
      channel: getMusicChannelLink(channelID),
      thumbnail: getThumbnail(id),
      explicit: getExplicit(dRender)
    }
  } catch (err) {
    throw new Error('Error on get music data')
  }
}

export function compress (key: ObjectType): string {
  return key?.runs?.map((v: ObjectType) => v.text).join('')
}

export function unknown (keyName: string): string {
  return `Unknown ${keyName}`
}

export function getVideoLink (videoId: string, short = false): string {
  if (!videoId) return unknown('Link')

  return short ? `https://youtu.be/${videoId}` : `https://www.youtube.com/watch?v=${videoId}`
}

export function getChannelLink (cRender: ObjectType): string {
  const channel = findByKey('url', cRender?.longBylineText)

  if (!channel) return unknown('Channel')

  return `https://www.youtube.com${channel}`
}

export function getPlaylistLink (playlistId: string): string {
  if (!playlistId) return unknown('Link')

  return `https://www.youtube.com/playlist?list=${playlistId}`
}

export function getShortsLink (shortsId: string): string {
  if (!shortsId) return unknown('Link')

  return `https://www.youtube.com/shorts/${shortsId}`
}

export function getMusicLink (musicID: string) : string {
  if (!musicID) return unknown('Link')

  return `https://music.youtube.com/watch?v=${musicID}`
}

export function getMusicChannelLink (channelID: string): string {
  if (!channelID) return unknown('Channel')

  return `https://music.youtube.com/channel/${channelID}`
}

export function getTitle (dRender: ObjectType, keyName = 'Title'): string {
  const title = dRender?.title?.simpleText

  if (!title) return unknown(keyName)

  return title
}

export function getChannelVerified (cRender: ObjectType): boolean {
  const badges = cRender?.ownerBadges
    ?.map((badge: ObjectType) => findByKey('style', badge)) ?? []

  return badges.includes('BADGE_STYLE_TYPE_VERIFIED') ?? badges.includes('BADGE_STYLE_TYPE_VERIFIED_ARTIST')
}

export function getIsLive (vRender: ObjectType): boolean {
  const badges = findByKey('style', vRender?.badges) ??
    findByKey('style', vRender?.thumbnailOverlays)

  return badges === 'BADGE_STYLE_TYPE_LIVE_NOW' || badges === 'LIVE'
}

export function getVideoViews (vRender: ObjectType): number {
  const viewsText = findByKey('simpleText', vRender?.viewCountText) ??
    compress(vRender?.viewCountText) ??
    '0'

  return toNumber(viewsText)
}

export function getPlaylistCount (pRender: ObjectType): number {
  const countText = compress(pRender?.videoCountText) ?? '0'

  return toNumber(countText)
}

export function getExplicit (dRender: ObjectType): boolean {
  const badges = findByKey('iconType', dRender?.badges)

  return badges === 'MUSIC_EXPLICIT_BADGE'
}

export function getThumbnail (id: string): string {
  if (!id) return unknown('Thumbnail')

  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
}
