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

.value('GENRES', [
  'Pop',
  'Rock',
  'Rap'
]);