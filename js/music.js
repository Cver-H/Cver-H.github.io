/**
 * 1. 自动注入播放器所需的 CSS
 */
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/css/style.css";
document.head.appendChild(link);

/**
 * 2. 自动注入播放器的 HTML 结构
 * 注意：所有路径都已补全开头的斜杠 /，确保二级页面可用
 */
const musicHTML = `
<div class="music-player">
  <div class="album-art" id="music-disk">
    <img src="/images/黑胶唱片.png" alt="封面" id="disk-img" />
  </div>
  <div class="player-controls">
    <div class="song-info">
      <div class="text-group">
        <span class="song-name" id="song-title">等待播放...</span>
        <span id="song-artist" style="font-size: 0.7rem; margin-left: 8px"></span>
      </div>
      <div class="btns" style="display: flex; gap: 8px; align-items: center">
        <span id="list-toggle" title="歌单" style="font-size: 0.7rem; cursor: pointer; opacity: 0.5">歌单</span>
        <span id="lrc-toggle" title="歌词开关">词</span>
      </div>
    </div>
    <div class="progress-container" id="progress-bar">
      <div class="progress" id="progress-inner"></div>
    </div>
    <audio id="audio-src"></audio>
  </div>

  <div id="playlist-panel" class="playlist-container">
    <div class="category-tabs" style="display: flex; justify-content: space-around; padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
      <span class="tab-item active" data-type="外语" style="cursor: pointer; font-size: 0.75rem; color: #38d7ff">外语</span>
      <span class="tab-item" data-type="音乐剧" style="cursor: pointer; font-size: 0.75rem; color: #fff; opacity: 0.6">音乐剧</span>
    </div>
    <ul id="playlist-ul"></ul>
  </div>

  <div id="lrc-panel" class="lrc-container">
    <p id="lrc-text" class="lrc-guide-style">点击唱片开启音乐之旅</p>
  </div>
</div>
`;

/**
 * 3. 歌单数据
 */
const playlist = [
  {
    title: "Farewell, Neverland",
    type: "外语",
    cover: "/images/cover/txt.jpg", // 专辑图路径
    src: "/music/TOMORROW X TOGETHER (투모로우바이투게더) - 네버랜드를 떠나며 (逃离梦幻岛).mp3",
    lrc: `[00:00.00]Farewell, Neverland--Tomorrow X Together 
[00:11.95]Neverland my love 이젠 안녕
[00:14.71]And I'm free falling
[00:16.84]별들아 모두 편히 자렴
[00:20.52]Till I be calling
[00:22.54]No matter where I go
[00:24.62]여긴 no home
[00:26.29]두려워도 난 더 아래로
[00:29.18]안녕 Neverland my love
[00:32.03]따사로운 매일 매일 같은 계절
[00:35.43]소년은 자라나질 않아
[00:37.92]잠들지도 않는 태양의 입맞춤
[00:41.14]누구도 별을 보지 않아
[00:43.43]A paradise is full of lies
[00:46.08]외면하고 싶었어 난 oh
[00:51.66]내 마지막 피난처
[00:54.38]바랐어 endless flying
[00:57.09]It's the end it's true
[00:59.80]Neverland my love 이젠 안녕
[01:03.30]And I'm free falling
[01:05.34]별들아 모두 편히 자렴
[01:08.97]Till I be calling
[01:10.93]No matter where I go
[01:13.28]여긴 no home
[01:14.92]두려워도 난 더 아래로
[01:17.63]안녕 Neverland my love
[01:20.53]Falling falling
[01:25.77]Falling falling
[01:31.65]Falling falling
[01:37.29]안녕 Neverland my love
[01:40.80]아름다웠던 그 모든 게
[01:43.58]진실이 아니란 것을 알기에 난
[01:48.26]잔인한 그 거짓을뱉으려 해
[01:51.86]무책임한 꿈의 낙원에
[01:54.86]마지막 인사를 건넬게
[01:58.22]My Peter Pan
[02:00.46]허공 위를 달려서
[02:03.02]땅을 향해 전속력
[02:05.86]Time to fall it's time
[02:08.54]Neverland my love 이젠 안녕
[02:11.93]And I'm free falling
[02:14.06]별들아 모두 편히 자렴
[02:17.78]Till I be calling
[02:19.81]No matter where I go
[02:21.93]여긴 no home
[02:23.30]두려워도 난 더 아래로
[02:26.38]안녕 Neverland my love
[02:29.49]Falling falling
[02:34.66]Falling falling
[02:39.89]Falling falling
[02:45.63]안녕 Neverland my love
`,
  },

  {
    title: "Mirror",
    artist: "Maximillian",
    type: "外语",
    cover: "/images/cover/maxi.jpg", // 专辑图路径
    src: "/music/mirror.mp3",
    lrc: `[00:00.00]Mirror--Maximillian
[00:03.51]Strange how it feels when I look in the mirror
[00:10.32]I see a man with his eyes full of terror
[00:15.42]And it's something so obvious but
[00:20.91]I missed it all in the rush
[00:23.88]I'm out of place and it feels so familiar
[00:29.64]Lately I've
[00:32.75]Been terrified
[00:35.52]'Cause
[00:36.99]I see the broken mirror
[00:40.17]Shattered unfamiliar
[00:43.71]How come my reflection
[00:47.19]Looks more like a stranger now
[00:50.49]I see a foreign figure
[00:53.73]Scattered unfamiliar
[00:57.18]Tell me mirror mirror
[01:00.60]Who's that stranger on the wall
[01:04.50]I keep my head in the clouds when I'm broken
[01:10.05]Mm
[01:11.19]I try to hide it but my wounds are open
[01:16.62]And it's something so obvious but
[01:21.78]I hid it all in the rush
[01:24.75]I'm out of place fighting things I can't cope with
[01:29.31]So now
[01:31.08]I see the broken mirror
[01:34.26]Shattered unfamiliar
[01:37.92]How come my reflection
[01:41.28]Looks more like a stranger now
[01:44.61]I see a foreign figure
[01:47.79]Scattered unfamiliar
[01:51.27]Tell me mirror mirror
[01:54.81]Who's that stranger on the wall
[02:04.11]Who's that stranger on the wall
[02:15.03]And I won't run anymore
[02:17.67]I can't keep closing doors
[02:19.65]I prevail let it go
[02:23.49]'Cause now
[02:25.17]I see the broken mirror
[02:28.32]Shattered unfamiliar
[02:31.86]How come my reflection
[02:35.34]Looks more like a stranger now
[02:38.67]I see a foreign figure
[02:41.88]Scattered unfamiliar
[02:45.36]Tell me mirror mirror
[02:48.78]Who's that stranger on the wall
`,
  },

  {
    title: "沉寂深海",
    artist: "冒海飞",
    type: "音乐剧",
    cover: "/images/cover/阴天.jpg",
    src: "/music/沉寂深海.mp3",
    lrc: `[00:00.00]沉寂深海--冒海飞
[00:12.38]⻛平浪静海面上
[00:17.34]是谁掀起波澜
[00:21.66]暗潮汹涌
[00:23.13]我的人生
[00:24.87]谁来让它平缓
[00:31.88]黑暗吞噬着光明
[00:36.09]有谁能战胜恐惧
[00:39.63]结局早已被注定
[00:43.11]谁能改变
[00:48.82]没有人能够代替我承担忧虑
[00:53.24]这就是我的命运
[00:56.71]没有人能够帮助我承受结局
[01:02.03]我必须独自向前行
[01:08.48]新的结局浮现
[01:12.42]在天空之下
[01:17.71]拥抱寂静
[01:21.27]也依然歌唱生命
[01:24.58]漫天的星光
[01:26.64]萦绕在我的身旁
[01:28.45]记录下
[01:29.84]曾有的繁华
[01:33.60]我的结局写在
[01:38.09]沉寂深海里
[01:42.82]忘却绝望
[01:46.32]将希望尽情歌唱
[01:49.60]望不到边际
[01:51.69]伴随我的曾经
[01:53.51]我虔诚放逐自己
[01:58.88]这一生迎来结局
[02:08.85]我沉入海底
`,
  },
  {
    title: "腐烂",
    artist: "冒海飞/王培杰",
    type: "音乐剧",
    cover: "/images/cover/嫌疑人.jpg",
    src: "/music/腐烂.mp3",
    lrc: `[00:00.00]腐烂--嫌疑人X的献身
[00:10.63]石神：
[00:15.80]难道我已成为她幸福的阻碍
[00:22.97]即使竭尽全力也无法躲避悲哀
[00:30.62]纠缠的痛苦正不断灼烧我
[00:36.20]我要在荒诞的世间点燃一把火
[00:45.76]花冈：
[00:49.28]此刻我能感受到挣扎的自我
[00:56.02]不论身处何处都无法再逃脱
[01:03.18]他的双眼里好像点燃一把火
[01:10.02]总有一天总有一天要毁灭我
[01:16.17]石神/花冈：
[01:16.24]夜晚中恐惧掀起风暴
[01:19.55]我的心湿漉却又燃烧
[01:23.14]如果命运托付给他人
[01:26.44]是否会是另一座囚牢
[01:29.86]美里：
[01:29.88]我渴望拥有完整的家
[01:33.24]却永远活在阴影之下
[01:36.64]我想过上幸福的生活
[01:40.23]这到底有什么错
[01:43.21]汤川：
[01:45.07]我曾看到他面对镜中的自我
[01:51.91]一瞬难以觉察的慌乱与落魄
[01:59.01]或许他早已不是当年的自己
[02:05.80]置身于这个毁灭一切的漩涡
[02:11.28]石神/汤川：
[02:11.98]夜晚中思绪掀起风暴
[02:15.34]我的心湿漉却又燃烧
[02:18.42]汤川：
[02:18.92]如何面对挣扎的自我
[02:22.14]到最后谁也无法逃脱
[02:25.27]石神：
[02:25.56]夜晚中愤怒掀起风暴
[02:28.86]我的心湿漉却又燃烧
[02:31.92]石神/汤川：
[02:32.25]眼眸中流露出的嫌疑
[02:35.60]将会在某一刻毁灭你
[02:41.40]石神：
[02:42.23]我会在大雨中慢慢腐烂
[02:48.91]化作危险将这世界瞬间点燃
[02:54.57]汤川/花冈/美里：
[02:55.65]众生在癫狂的雨夜抖颤
[03:02.30]合：
[03:02.32]谁让你/我们的爱与魔鬼纠缠
[03:08.55]合：
[03:09.10]谁会在大雨中慢慢腐烂
[03:20.23]汤川/花岗/美里：
[03:20.25]众生在癫狂的雨夜抖颤
[03:29.13]合：
[03:29.36]谁让我们的爱与魔鬼纠缠
[03:35.83]石神：
[03:37.14]命运的齿轮慢慢转动
[03:40.28]汤川：
[03:40.30]谁也无法逃离设定的操控
[03:43.86]花岗/美里：
[03:43.88]哀伤和苦难包裹了天空
[03:47.03]合：
[03:47.27]彼此的命运却不尽相同
[03:52.33]合：
[03:52.72]夜晚中思绪掀起风暴
[03:56.75]我的心湿漉却又燃烧
[04:00.35]如何面对挣扎的自我
[04:03.54]到最后谁也无法逃脱
[04:06.91]夜晚中恐惧掀起风暴
[04:10.24]我的心湿漉却又燃烧
[04:13.69]眼眸中流露出的嫌疑
[04:17.02]将会在某一刻毁灭你

    `,
  },
  {
    title: "解:设",
    artist: "王培杰/冒海飞",
    type: "音乐剧",
    cover: "/images/cover/嫌疑人.jpg",
    src: "/music/解设.mp3",
    lrc: `[00:00.00]解：设--王培杰/冒海飞
[00:09.91]石神:
[00:10.16]幽静 雪夜 攀登者
[00:13.48]迷失在山路之中
[00:16.83]摔倒 站起
[00:18.60]他的眼前已经一片漆黑
[00:27.01]狂风 呼啸
[00:28.68]第二天尸体无法被找到
[00:33.80]大雪 纷飞 留下了一个永远的问号
[00:41.43]群:
[00:43.83]纷飞 雪花 跌落 悬崖
[00:47.42]鲜血 流下 无人 回答
[00:51.79]纷飞 雪花 夜幕 谋杀
[00:55.16]黑暗 隐藏 洁白 之下
[00:58.79]石神:
[00:58.81]计算所有行为的误差
[01:01.57]寻找完美无暇的解答
[01:04.81]推算悖论形成的结构
[01:08.15]告诉我是否应该再回头
[01:16.52]群:
[01:16.70]他会不会回来
[01:17.87]汤川:
[01:23.31]如果你割舍了痛苦与爱
[01:27.40]那么未来你能否释怀
[01:31.64]可你却忽略了人性之中
[01:35.34]理性无法解释的存在
[01:39.75]如果我就此化作尘埃
[01:43.52]带着秘密一起被掩埋
[01:47.49]在最完美的演算之中
[01:52.00]答案能否被修改
[01:55.95]石神:
[01:55.97]如果我割舍了痛苦与爱
[01:59.43]那么未来我能否释怀
[02:02.98]合:
[02:03.50]可我却忽略了人性之中
[02:07.00]理性无法解释的存在
[02:10.98]石神:
[02:11.21]如果你就此化作尘埃
[02:14.68]带着秘密一起被掩埋
[02:18.13]合:
[02:18.40]在最完美的演算之中
[02:22.57]答案无法被修改
[02:28.68]汤川:
[02:32.03]这是我最真实的自白
[02:35.66]合：
[02:36.37]那些记忆 无法被掩埋
    `,
  },
];

let currentIndex = -1;
let lyricData = [];

/**
 * 4. 歌词解析引擎
 */
function parseLyrics(text) {
  const lines = text.split("\n");
  const res = [];
  const reg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
  lines.forEach((l) => {
    const m = l.match(reg);
    if (m) {
      const t =
        parseInt(m[1]) * 60 +
        parseInt(m[2]) +
        parseInt(m[3]) / (m[3].length === 3 ? 1000 : 100);
      const txt = l.replace(reg, "").trim();
      if (txt) res.push({ time: t, text: txt });
    }
  });
  return res;
}

/**
 * 5. 核心播放逻辑 (由之前的代码封装而来)
 */
function initMusicPlayer() {
  const audio = document.getElementById("audio-src");
  const disk = document.getElementById("music-disk");
  const progressInner = document.getElementById("progress-inner");
  const progressBar = document.getElementById("progress-bar");
  const lrcToggle = document.getElementById("lrc-toggle");
  const listToggle = document.getElementById("list-toggle");
  const lrcPanel = document.getElementById("lrc-panel");
  const playlistPanel = document.getElementById("playlist-panel");
  const lrcText = document.getElementById("lrc-text");
  const playlistUl = document.getElementById("playlist-ul");
  const tabs = document.querySelectorAll(".tab-item");
  const songTitle = document.getElementById("song-title");
  const songArtist = document.getElementById("song-artist");
  const diskImg = document.getElementById("disk-img");

  let currentType = "外语";

  function renderPlaylist() {
    const filteredList = playlist.filter((s) => s.type === currentType);
    playlistUl.innerHTML = filteredList
      .map((song) => {
        const realIdx = playlist.indexOf(song);
        return `<li class="${realIdx === currentIndex ? "active" : ""}" data-index="${realIdx}">${song.title}</li>`;
      })
      .join("");
  }

  function loadSong(index, shouldPlay = true) {
    currentIndex = index;
    const song = playlist[index];
    audio.src = song.src;
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist ? `- ${song.artist}` : "";
    diskImg.src = song.cover || "/images/黑胶唱片.png";
    lyricData = parseLyrics(song.lrc);
    renderPlaylist();
    if (shouldPlay) {
      audio.play().catch(() => console.log("等待交互后播放"));
      disk.style.animationPlayState = "running";
    }
  }

  // 【核心功能】自动续播检测
  function checkRestore() {
    const lastIndex = localStorage.getItem("music_index");
    const lastTime = localStorage.getItem("music_time");
    const wasPlaying = localStorage.getItem("music_playing") === "true";

    if (lastIndex !== null) {
      currentIndex = parseInt(lastIndex);
      loadSong(currentIndex, false); // 加载数据但不立即播放
      audio.currentTime = parseFloat(lastTime || 0);

      if (wasPlaying) {
        audio
          .play()
          .then(() => {
            disk.style.animationPlayState = "running";
          })
          .catch(() => {
            console.log("切页续播被拦截，点击页面任意位置恢复音乐");
          });
      }
    }
  }

  disk.onclick = () => {
    if (currentIndex === -1) {
      loadSong(0);
      return;
    }
    if (audio.paused) {
      audio.play();
      disk.style.animationPlayState = "running";
    } else {
      audio.pause();
      disk.style.animationPlayState = "paused";
    }
  };

  // 进度保存与歌词滚动
  audio.ontimeupdate = () => {
    if (audio.duration) {
      progressInner.style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
      // 实时保存进度到本地
      localStorage.setItem("music_index", currentIndex);
      localStorage.setItem("music_time", audio.currentTime);
    }
    if (lrcPanel.classList.contains("active") && lyricData.length > 0) {
      const now = audio.currentTime;
      let activeLine = lyricData.reduce(
        (prev, curr) => (now >= curr.time ? curr : prev),
        lyricData[0],
      );
      if (lrcText.innerText !== activeLine.text) {
        lrcText.innerText = activeLine.text;
        lrcText.classList.replace("lrc-guide-style", "lrc-content-style");
      }
    }
  };

  audio.onplay = () => localStorage.setItem("music_playing", "true");
  audio.onpause = () => localStorage.setItem("music_playing", "false");

  tabs.forEach((tab) => {
    tab.onclick = function () {
      tabs.forEach((t) => {
        t.style.color = "#fff";
        t.style.opacity = "0.6";
      });
      this.style.color = "#38d7ff";
      this.style.opacity = "1";
      currentType = this.dataset.type;
      renderPlaylist();
    };
  });

  playlistUl.onclick = (e) => {
    if (e.target.tagName === "LI") loadSong(parseInt(e.target.dataset.index));
  };
  listToggle.onclick = (e) => {
    e.stopPropagation();
    playlistPanel.classList.toggle("active");
    lrcPanel.classList.remove("active");
  };
  lrcToggle.onclick = (e) => {
    e.stopPropagation();
    lrcPanel.classList.toggle("active");
    playlistPanel.classList.remove("active");
  };
  audio.onended = () => loadSong((currentIndex + 1) % playlist.length);
  progressBar.onclick = (e) => {
    const rect = progressBar.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  renderPlaylist();
  checkRestore(); // 初始化完成后检查是否需要续播
}

/**
 * 5. 执行注入与启动
 */
/**
 * 最终整合：确保 刷新、切页、后退 都能自动续播
 */
function startApp() {
    // 1. 如果页面没播放器就插一个，有的话就不重复插
    if (!document.querySelector(".music-player")) {
        document.body.insertAdjacentHTML("beforeend", musicHTML);
    }
    // 2. 运行你定义的初始化逻辑（里面有恢复进度的 checkRestore）
    initMusicPlayer();
}

// 场景 A：处理常规进入页面和刷新
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApp);
} else {
    startApp();
}

// 场景 B：处理【后退】按钮返回（解决你说的后退不播放）
window.addEventListener("pageshow", (event) => {
    // persisted 为 true 表示是从浏览器缓存里“后退”回来的
    if (event.persisted) {
        // 先清理可能残留在缓存 DOM 里的旧播放器，防止事件监听错乱
        const oldPlayer = document.querySelector(".music-player");
        if (oldPlayer) oldPlayer.remove();
        
        // 重新启动
        startApp();
    }
});