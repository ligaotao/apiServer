$(document).ready(function(){

  var myPlaylist = new jPlayerPlaylist({
    jPlayer: "#jplayer_N",
    cssSelectorAncestor: "#jp_container_N"
  }, [
  ], {
    playlistOptions: {
      enableRemoveControls: true,
      autoPlay: true
    },
    swfPath: "js/jPlayer",
    supplied: "webmv, ogv, m4v, oga, mp3",
    smoothPlayBar: true,
    keyEnabled: true,
    audioFullScreen: false
  });
  console.log(myPlaylist)
  $('body').on('click', '.item .icon-control-play', function() {
    var id = $(this).data('id')
    var $item = $(this).parents('.item')
    var imgSrc = $item.find('.img-full').attr('src')
    var name = $item.find('.padder-v .text-ellipsis:first-child').text()
    var auther = $item.find('.padder-v .text-ellipsis:last-child').text()
    var mp3List = myPlaylist.playlist
    var isHas = mp3List.some(function(k, i) {
      if (k.id === id) {
        myPlaylist.selects(i)
      }
      return k.id === id
    })
    if (isHas) {
      // 如果歌曲列表有了 则直接播放
      return true;
    }
    $.ajax({
    type: "get",
    async: false,
    url: "http://music.ligaotao.cn/music/url",
    dataType: "json",
    data: {id: id},
    success: function(data) {
      var mp3 = ''
      if (data && data.data.length > 0) {
        mp3 = data.data[0].url
        myPlaylist.add({ // Set the media
          id: id,
          title: name,
          artist: auther,
          poster: imgSrc,
          mp3: mp3,
        })
      }
    },
    error: function() {
    }
  })
  })
  $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').removeClass('animate');
    $('.jp-play-me').removeClass('active');
    $('.jp-play-me').parent('li').removeClass('active');
  });

  $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer,  function(){
    $('.musicbar').addClass('animate');
  });

  $(document).on('click', '.jp-play-me', function(e){
    e && e.preventDefault();
    var $this = $(e.target);
    if (!$this.is('a')) $this = $this.closest('a');

    $('.jp-play-me').not($this).removeClass('active');
    $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

    $this.toggleClass('active');
    $this.parent('li').toggleClass('active');
    if( !$this.hasClass('active') ){
      myPlaylist.pause();
    }else{
      var i = Math.floor(Math.random() * (1 + 7 - 1));
      myPlaylist.play(i);
    }
    
  });



  // video

  $("#jplayer_1").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Big Buck Bunny",
        m4v: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.m4v",
        ogv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.ogv",
        webmv: "http://flatfull.com/themes/assets/video/big_buck_bunny_trailer.webm",
        poster: "images/m41.jpg"
      });
    },
    swfPath: "js",
    supplied: "webmv, ogv, m4v",
    size: {
      width: "100%",
      height: "auto",
      cssClass: "jp-video-360p"
    },
    globalVolume: true,
    smoothPlayBar: true,
    keyEnabled: true
  });

});