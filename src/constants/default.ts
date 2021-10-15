import { URL } from 'url'
import { SearchTypes } from '../types/shims'

export const headers = {
  'Access-Control-Allow-Origin': '*',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
}

export const searchTypes: SearchTypes = {
  video: 'EgIQAQ==',
  channel: 'EgIQAg==',
  playlist: 'EgIQAw==',
  movie: 'EgIQBA==',
  live: 'EgJAAQ=='
}

export const defaultOptions = {
  type: 'video',
  language: 'en',
  max: 30
}

export const ytURL = new URL('https://www.youtube.com/results')
