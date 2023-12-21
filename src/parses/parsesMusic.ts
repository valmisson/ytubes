import { type ObjectType } from '../types/shims'
import { type Music } from '../types/data'
import { findByKey } from '../shared'
import { getMusicData } from './utils'

export function extractMusicData (renderer: ObjectType): Array<Music> {
  const contents = getContents(renderer)

  const results = contents?.map((data: ObjectType): Music => {
    return getMusicData(data.musicResponsiveListItemRenderer)
  })
    ?.filter((result: ObjectType) => result)

  return results
}

function getContents (dRender: ObjectType) {
  try {
    const sRender = findByKey('sectionListRenderer', dRender)

    const mRender = sRender?.contents?.filter((data: ObjectType) => {
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
    throw new Error('Error on get music contents data')
  }
}
