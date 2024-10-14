new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "自在的少年",
          artist: "也不用买菜",
          cover: "https://y.qq.com/music/photo_new/T062R800x800M000000g0vZX2zsQfU.jpg?max_age=2963246343",
          source: "https://sjy6.stream.qqmusic.qq.com/M5000021K9jl1QJA9C.mp3?guid=www.hhlqilongzhu.cn&vkey=F34179CF8FF703F457900C3D1EF55D6BBC413FA9C147219B62A5BB3622E8DB50D05925C814DABB2E4A9C3D80441950C8BD700D72BDC124F6&uin=2205693398&fromtag=5201314&info=cache&from=longzhu_api",
          url: "https://i.y.qq.com/v8/playsong.html?songmid=003Kwlu20jioV9&type=0",
          favorited: false,
        },
        {
          name: "Everybody Knows",
          artist: "Leonard Cohen",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: true,
        },
        {
          name: "Extreme Ways",
          artist: "Moby",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false,
        },
        {
          name: "Butterflies",
          artist: "Sia",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
          favorited: false,
        },
        {
          name: "The Final Victory",
          artist: "Haggard",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: true,
        },
        {
          name: "Genius ft. Sia, Diplo, Labrinth",
          artist: "LSD",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false,
        },
        {
          name: "The Comeback Kid",
          artist: "Lindi Ortega",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true,
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false,
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false,
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null,
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60) || 0;
      let dursec = Math.floor(this.audio.duration - durmin * 60) || 0;
      let curmin = Math.floor(this.audio.currentTime / 60) || 0;
      let cursec = Math.floor(this.audio.currentTime - curmin * 60) || 0;
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited =
        !this.tracks[this.currentTrackIndex].favorited;
    },
  },
  onBeforeUnmount() {
    localStorage.setItem("tracks", JSON.stringify(this.tracks));
  },
  created() {
    // 进入项目首先检测地址栏的参数，是否包含歌曲信息，如果存在，则插入到当前播放列表中，并播放
// 检测 URL 参数
const params = new URLSearchParams(window.location.hash.substring(1));
const songName = params.get("name");
const artist = params.get("artist");
const cover = params.get("cover");
const source = params.get("source");

// 取出本地缓存中的数据，赋值给播放列表
const localTracks = localStorage.getItem("tracks");
if (localTracks) {
    this.tracks = JSON.parse(localTracks);
} else {
    // 默认播放列表
    this.tracks = [
        {
            name: "自在的少年",
            artist: "也不要用菜",
            cover: "https://y.qq.com/music/photo_new/T062R800x800M000000g0vZXZ2zQfU.jpg?max_age=2963246343",
            source: "https://sjy6.stream.qqmusic.com/M5000021K9j1lQJ9C.mp3?guid=www.hhlqlongzhu.cn&key=F34179CF8FF703F457900C3D1EFE5BDBBC413FA9C14T719B6A5BB622EBD50D05925C814DAABE4A9C3D0441950C8BDY72DC124F6&uin=2205693398&fromtag=5201314&info_cache&from=longzhu_api",
            url: "https://i.y.qq.com/v8/playsong.html?songmid=003Kwluo2joV9&type=0",
            favored: false,
        },
    ];
}

// 使用 fetch 获取 API 数据
fetch('https://dg.slwu19.workers.dev/?song=' + songName)
.then(response => response.json())
.then(data => {
    const apiData = data.data;
    // 将 API 返回的数据添加到 tracks 列表中
    this.tracks.push({
        name: apiData.song_name,
        artist: apiData.song_singer,
        cover: apiData.cover,
        source: apiData.link,
        url: apiData.music_url,
        favored: false,
    });
})
.catch(error => console.error('Error:', error));

// 将更新后的 tracks 存储到本地存储中
localStorage.setItem("tracks", JSON.stringify(this.tracks));
    }

    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image";
      document.head.appendChild(link);
    }
  },
});
