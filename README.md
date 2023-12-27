# ytubes

[![npm][npm-shields]](https://www.npmjs.com/package/ytubes)
[![license][license-shields]](https://github.com/valmisson/ytubes/blob/main/LICENSE)

Search for videos, shorts, playlists, channels, movies, live and musics on youtube without api key.

## Install

```bash
yarn add ytubes
```

## Usage

```js
import ytubes from 'ytubes'

const videos = await ytubes.getVideo('Amor e fé', { max: 1, language: 'pt-BR' })
```

### Typescript

```ts
import * as ytubes from 'ytubes'
```

## Functions

### getVideo(query, options)

Returns the details of all videos found

```js
const video = await ytubes.getVideo('Amor e fé')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'iZq0u3quAqo',
      type: 'video',
      title: 'Hungria Hip Hop - Amor e Fé (Official Music Video) #CheiroDoMato',
      views: 291003057,
      duration: '5:24',
      uploaded: '1 year ago',
      link: 'https://www.youtube.com/watch?v=iZq0u3quAqo',
      shareLink: 'https://youtu.be/iZq0u3quAqo',
      channel: 'https://www.youtube.com/channel/UCAI8SmRbXgSpP8Zo3xZbxzQ',
      thumbnail: 'https://i.ytimg.com/vi/iZq0u3quAqo/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getShorts(query, options)

Returns the details of all shorts found

```js
const video = await ytubes.getShorts('Beat Tribo da Periferia')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'RV9JhsBN26s',
      type: 'shorts',
      title: 'Beat Insônia Tribo da periferia & Hungria - cover beat #shorts',
      views: 2286,
      link: 'https://www.youtube.com/shorts/RV9JhsBN26s',
      channel: 'https://www.youtube.com/@g-ruahiphop',
      thumbnail: 'https://i.ytimg.com/vi/RV9JhsBN26s/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getPlaylist(query, options)

Returns the details of all playlist found

```js
const playlist = await ytubes.getPlaylist('Tribo da Periferia - As Melhores')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'PL7V1hXWh2rMr4pz6lCkzHMHMLU3-BfQ2S',
      type: 'playlist',
      title: 'AS MELHORES - TRIBO DA PERIFERIA',
      videoCount: 49,
      link: 'https://www.youtube.com/playlist?list=PL7V1hXWh2rMr4pz6lCkzHMHMLU3-BfQ2S',
      channel: 'https://www.youtube.com/channel/UCe5pPUSFEajlij-LrxUl19A',
      thumbnail: 'https://i.ytimg.com/vi/crfRRVISmsw/maxresdefault.jpg',
      preview: [
        {
          id: 'YrQLmElRT-E',
          title: 'Tribo da Periferia - Imprevisível (Official Music Video)',
          duration: '4:09',
          link: 'https://www.youtube.com/watch?v=YrQLmElRT-E',
          shareLink: 'https://youtu.be/YrQLmElRT-E',
          thumbnail: 'https://i.ytimg.com/vi/YrQLmElRT-E/maxresdefault.jpg'
        },
        ...
      ]
    },
    ...
  ]
  ```
</details>

### getChannel(query, options)

Returns the details of all channel found

```js
const channel = await ytubes.getChannel('Hungria Hip Hop')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'UCAI8SmRbXgSpP8Zo3xZbxzQ',
      type: 'channel',
      name: 'OficialHungria',
      verified: true
      link: 'https://www.youtube.com/c/OficialHungria',
    },
    ...
  ]
  ```
</details>

### getChannelVideos(query, options)

Returns the details of all channel videos

```js
const channel = await ytubes.getChannelVideos('@eminem')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'lexLAjh8fPA',
      type: 'video',
      title: 'Eminem - Like Toy Soldiers (Official Music Video)',
      views: 455969481,
      duration: '5:22',
      uploaded: '13 years ago',
      link: 'https://www.youtube.com/watch?v=lexLAjh8fPA',
      shareLink: 'https://youtu.be/lexLAjh8fPA',
      channel: 'https://www.youtube.com/@eminem',
      thumbnail: 'https://i.ytimg.com/vi/lexLAjh8fPA/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getChannelShorts(query, options)

Returns the details of all channel shorts

```js
const channel = await ytubes.getChannelShorts('@eminem')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'By7NMf3C7xk',
      type: 'shorts',
      title: 'Eminem | Fortnite’s The Big Bang Event',
      views: '684K views',
      link: 'https://www.youtube.com/shorts/By7NMf3C7xk',
      channel: 'https://www.youtube.com/@eminem',
      thumbnail: 'https://i.ytimg.com/vi/By7NMf3C7xk/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getChannelLives(query, options)

Returns the details of all channel lives

```js
const channel = await ytubes.getChannelLives('@MusicLabChill')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: '9ZJT08MsRAs',
      type: 'live',
      live: true,
      title: '🎧Music for Maximum Productivity — Chillout Radio 24/7',
      link: 'https://www.youtube.com/watch?v=9ZJT08MsRAs',
      shareLink: 'https://youtu.be/9ZJT08MsRAs',
      channel: 'https://www.youtube.com/@MusicLabChill',
      thumbnail: 'https://i.ytimg.com/vi/9ZJT08MsRAs/maxresdefault.jpg',
      views: 29
    },
    ...
  ]
  ```
</details>

### getChannelPlaylists(query, options)

Returns the details of all channel playlists

```js
const channel = await ytubes.getChannelPlaylists('@eminem')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'FLfM3zsQsOnfWNUppiycmBuw',
      type: 'playlist',
      title: 'Favorites',
      videoCount: 32,
      link: 'https://www.youtube.com/playlist?list=FLfM3zsQsOnfWNUppiycmBuw',
      channel: 'https://www.youtube.com/@eminem',
      thumbnail: 'https://i.ytimg.com/vi/XbGs_qK2PQA/maxresdefault.jpg',
      preview: 'https://www.youtube.com/watch?v=XbGs_qK2PQA&list=FLfM3zsQsOnfWNUppiycmBuw'
    }
    ...
  ]
  ```
</details>

### getMovie(query, options)

Returns the details of all movies found

```js
const movie = await ytubes.getMovie('filmes de ação')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'MuTYo9tofSY',
      type: 'video',
      title: 'Thor Ragnarok Full Video - Voiced Motion Comic (Marvel Comics)',
      views: 7119537,
      duration: '1:33:17',
      uploaded: '4 years ago',
      link: 'https://www.youtube.com/watch?v=MuTYo9tofSY',
      shareLink: 'https://youtu.be/MuTYo9tofSY',
      channel: 'https://www.youtube.com/user/boscheinen',
      thumbnail: 'https://i.ytimg.com/vi/MuTYo9tofSY/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

### getLive(query, options)

Returns the details of all lives found

```js
const live = await ytubes.getLive('Music for Work')
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: '4kLviL8XwAI',
      type: 'live',
      live: true,
      title: 'Music for Work — Programming, Hacking, Coding Radio',
      link: 'https://www.youtube.com/watch?v=4kLviL8XwAI',
      shareLink: 'https://youtu.be/4kLviL8XwAI',
      channel: 'https://www.youtube.com/@MusicLabChill',
      thumbnail: 'https://i.ytimg.com/vi/4kLviL8XwAI/maxresdefault.jpg',
      views: 79
    },
    ...
  ]
  ```
</details>

### getMusic(query, options)

Returns the details of all musics found

```js
const music = await ytubes.getMusic("2Pac - Pac's Life")
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: 'A1HvFGTB7NE',
      type: 'music',
      title: "Pac's Life (feat. T.I. & Ashanti)",
      artist: '2Pac',
      album: "Pac's Life",
      duration: '3:37',
      link: 'https://music.youtube.com/watch?v=A1HvFGTB7NE',
      videoLink: 'https://www.youtube.com/watch?v=A1HvFGTB7NE',
      channel: 'https://music.youtube.com/channel/UC5RrGzC-JXglhFW5NhT4r6w',
      thumbnail: 'https://i.ytimg.com/vi/A1HvFGTB7NE/maxresdefault.jpg',
      explicit: true
    },
    ...
  ]
  ```
</details>

### search(query, options)

Returns the details of seach

```js
const videos = await ytubes.search('beautiful', { type: 'video' })
```

<details>
  <summary>Output</summary>

  ```js
  [
    {
      id: '_FE194VN6c4',
      type: 'video',
      title: 'Snoop Dogg - Beautiful (Official Music Video) ft. Pharrell Williams',
      views: 160183177,
      duration: '5:29',
      uploaded: '12 years ago',
      link: 'https://www.youtube.com/watch?v=_FE194VN6c4',
      shareLink: 'https://youtu.be/_FE194VN6c4',
      channel: 'https://www.youtube.com/channel/UC-OO324clObi3H-U0bP77dw',
      thumbnail: 'https://i.ytimg.com/vi/_FE194VN6c4/maxresdefault.jpg'
    },
    ...
  ]
  ```
</details>

## Functions options

| Property | Default | Description |
|----------|---------|-------------|
| `max` | `30` | Set the maximum amount of results to return. |
| `language` | `en` | Set the language that you would like for results to be returned in. |
| | | &#11206; Option available only in `search`. |
| `type` | `video` | Set the type of search on Youtube. The supported types are `video`, `shorts`, `playlist`, `channel`, `channelVideos`, `channelShorts`, `channelLives`, `channelPlaylists`, `movie`, `live`, and `music`. |


## Note

You should keep in mind that this library does not use an official YouTube API and a change may cause an error in the search.

## License
[MIT](LICENSE)

Copyright (c) 2021 Valmisson Grizorte

[npm-shields]: https://img.shields.io/npm/v/ytubes.svg
[license-shields]: https://img.shields.io/badge/license-MIT-green
