// object mapping song to genre


angular.module('PlaylistSelector')


.value('SONGS', {
  Pop: [
    {
      title: 'PopSong1',
    },
    {
      title: 'PopSong2',
    }
  ],
  Rock: [
    {
      title: 'RockSong1',
    },
    {
      title: 'RockSong2',
    }
  ],
  Rap: [
    {
      title: 'RapSong1',
    },
    {
      title: 'RapSong2',
    }
  ],


})

.value('SONG_LIST', {
  'PopSong1': 'Pop',
  'RockSong1': 'Rock',
  'PopSong2': 'Pop',
  'RockSong2': 'Rock',
  'RapSong1': 'Rap'
})

.value('GENRES', [
  'Pop',
  'Rock',
  'Rap'
]);