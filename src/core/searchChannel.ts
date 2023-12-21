import { type SearchChannelOptions } from '../types/shims'
import { defaultOptions, headers, ytURL } from '../constants/default'
import { fetch, isEmpty, sliceResults } from '../shared'
import { extractChannelData, getSearchData } from '../parses'

async function searchChannel <T> (channelID: string, options: SearchChannelOptions): Promise<T[]> {
  if (!channelID) {
    throw new Error('Channel ID has empty')
  }

  const {
    type = 'videos',
    max = defaultOptions.max,
    language = defaultOptions.language
  } = options

  ytURL.pathname = `${channelID}/${type}`

  const webPage = await fetch(ytURL, {
    headers: {
      ...headers,
      'Accept-Language': language
    }
  })

  const renderer = getSearchData(webPage, /var ytInitialData = (.*);<\/script>/)

  if (isEmpty(renderer)) return []

  const resultsData = extractChannelData<T>(type, renderer)

  const results = sliceResults<T>(resultsData, max)

  return results
}

export default searchChannel
