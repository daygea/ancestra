
function openVideoModal(youtubeUrl) {
    const videoId = getYouTubeID(youtubeUrl);
    if (!videoId) {
        alert("Invalid YouTube URL");
        return;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&iv_load_policy=3&showinfo=0&modestbranding=1&fs=0&cc_load_policy=0&disablekb=1`;

    const loader = document.createElement("div");
    loader.id = "videoLoader";
    loader.innerText = "Loading video...";
    loader.style = `
        text-align: center;
        font-style: italic;
        color: gray;
        padding-top: 100px;
        height: 90%;
        position: absolute;
        width: 100%;
        background: white;
        z-index: 1;
    `;

    const videoModal = document.getElementById("videoModal");
    videoModal.appendChild(loader);

    const iframe = document.getElementById("videoFrame");
    iframe.style.display = "none";
    iframe.src = embedUrl;

    iframe.onload = () => {
        iframe.style.display = "block";
        const loader = document.getElementById("videoLoader");
        if (loader) loader.remove();
    };

    videoModal.style.display = "block";
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

function extractDriveId(url) {
    const match = url.match(/\/d\/([^\/]+)\//);
    return match ? match[1] : null;
}


function openAudioModal(url) {
    const fileId = extractDriveId(url);
    const container = document.getElementById("audioPlayerContainer");

    if (fileId) {
        const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

        // Show loader and prepare iframe (hidden initially)
        container.innerHTML = `
            <div id="audioLoader" style="text-align:center; font-style:italic; color:gray;">
                Loading audio...
            </div>
            <iframe id="audioIframe" src="${embedUrl}" height="60" allow="autoplay" style="display:none; width:100%; border:none;"></iframe>
        `;

        // Listen for iframe load to hide loader
        const iframe = document.getElementById("audioIframe");
        iframe.onload = () => {
            document.getElementById("audioLoader").style.display = "none";
            iframe.style.display = "block";
        };

        document.getElementById("audioModal").style.display = "block";
    } else {
        alert("Invalid Google Drive link");
    }
}



function closeAudioModal() {
    document.getElementById("audioModal").style.display = "none";
    document.getElementById("audioPlayerContainer").innerHTML = "";
}

