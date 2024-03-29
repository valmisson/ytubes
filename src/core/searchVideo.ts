import { type SearchVideoOptions } from '../types/shims'
import { defaultOptions, headers, searchVideoTypes, ytVideoURL } from '../constants/default'
import { fetch, findByKey, isEmpty, sliceResults } from '../shared'
import { extractVideoData, getSearchData } from '../parses'

async function searchVideo <T> (query: string, options: SearchVideoOptions): Promise<T[]> {
  if (!query) {
    throw new Error('Search query has empty')
  }

  const {
    type = defaultOptions.type,
    max = defaultOptions.max,
    language = defaultOptions.language
  } = options

  const sp: string = findByKey(type, searchVideoTypes)

  ytVideoURL.search = `sp=${sp}&search_query=${query}`

  const webPage = await fetch(ytVideoURL, {
    headers: {
      ...headers,
      'Accept-Language': language
    }
  })

  const renderer = getSearchData(webPage, /var ytInitialData = (.*);<\/script>/)

  if (isEmpty(renderer)) return []

  const resultsData = extractVideoData<T>(type, renderer)
  const results = sliceResults<T>(resultsData, max)

  return results
}

export default searchVideo
