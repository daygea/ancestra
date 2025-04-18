function openVideoModal(youtubeUrl) {
  const videoId = getYouTubeID(youtubeUrl);
  // const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
   const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&iv_load_policy=3&showinfo=0&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1`;

  document.getElementById("videoFrame").src = embedUrl;
  document.getElementById("videoModal").style.display = "block";
}

function closeVideoModal() {
  document.getElementById("videoFrame").src = "";
  document.getElementById("videoModal").style.display = "none";
}

function getYouTubeID(url) {
  const regExp = /(?:youtube\.com.*(?:\\?|&)v=|youtu\.be\/)([^&\\n?#]+)/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}