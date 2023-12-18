import { type ObjectType } from '../types/shims'
import { type Music } from '../types/data'
import { findByKey } from '../shared'
import { getThumbnail, getVideoLink, unknown } from './utils'

export function extractMusicData (renderer: ObjectType): Array<Music> {
  const contents = getContents(renderer)

  const results = contents?.map((data: ObjectType): Music => {
    return getMusicData(data.musicResponsiveListItemRenderer)
  })

  return results
}

function getContents (dRender: ObjectType) {
  try {
    const sRender = findByKey('sectionListRenderer', dRender)

    const mRender = sRender?.contents.filter((data: ObjectType) => {
      return findByKey('bottomEndpoint', data)
    })

    const cRender = mRender.filter((data: ObjectType) => {
      return findByKey('contents', data)
    })

    const vRender = cRender.filter((data: ObjectType) => {
      return findByKey('videoId', data)
    })

    const contents = findByKey('contents', vRender[0])

    return contents
  } catch (err) {
    throw new Error('Error on get contents data')
  }
}

function getMusicData (dRender: ObjectType): Music {
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
      channel: getChannelLink(channelID),
      thumbnail: getThumbnail(id),
      explicit: getExplicit(dRender)
    }
  } catch (err) {
    throw new Error('Error on get music data')
  }
}

function getMusicLink (musicID: string) : string {
  if (!musicID) return unknown('Link')

  return `https://music.youtube.com/watch?v=${musicID}`
}

function getChannelLink (channelID: string): string {
  if (!channelID) return unknown('Channel')

  return `https://music.youtube.com/channel/${channelID}`
}

function getExplicit (dRender: ObjectType): boolean {
  const badges = findByKey('iconType', dRender?.badges)

  return badges === 'MUSIC_EXPLICIT_BADGE'
}
