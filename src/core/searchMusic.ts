import { type Music } from '../types/data'
import { type SearchMusicOptions } from '../types/shims'
import { defaultOptions, headers, ytMusicURL } from '../constants/default'
import { decodeHEX, fetch, isEmpty, isYtURL, sliceResults } from '../shared'
import { extractMusicData, getSearchData } from '../parses'
import { getVideo } from '..'

async function searchMusic (query: string, options: SearchMusicOptions): Promise<Music[]> {
  if (!query) {
    throw new Error('Search query has empty')
  }

  const {
    max = defaultOptions.max,
    language = defaultOptions.language
  } = options

  if (isYtURL(query)) {
    const video = await getVideo(query, { max: 1, language })

    query = video[0]?.title ?? query
  }

  ytMusicURL.search = `q=${query}`

  const webPage = await fetch(ytMusicURL, {
    headers: {
      ...headers,
      'Accept-Language': language
    }
  })

  const decodedWebPage = decodeHEX(webPage)
  const renderer = getSearchData(decodedWebPage, /"\}'\), data: '(.*)'\}\);ytcfg\.set/)

  if (isEmpty(renderer)) return []

  const resultsData = extractMusicData(renderer)
  const results = sliceResults(resultsData, max)

  return results
}

export default searchMusic
