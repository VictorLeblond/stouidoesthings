// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

const USERNAME = "stoui"; // Put your LastFM username here
const BASE_URL = `https://lastfm-last-played.biancarosa.com.br/${USERNAME}/latest-song`;

const cleanSongTitle = (title) => {
    return title.replace(/\(feat.*?\)/gi, "").replace(/\(ft\..*?\)/gi, "").replace(/\(with.*?\)/gi, "")
                .replace(/\[feat.*?\]/gi, "").replace(/\[ft\..*?\]/gi, "").replace(/\[with.*?\]/gi, "");
};

const getTrack = async () => {
    const request = await fetch(BASE_URL);
    const json = await request.json();

    let isPlaying = json.track['@attr']?.nowplaying || false;
    let trackImage = json.track.image[2]['#text'];

    if (trackImage === "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png") {
        trackImage = "https://penguinjaa.com/images/assets/cover.png";
    }

    let trackName = json.track.name;
    trackName = cleanSongTitle(trackName);

    let lastFmLink = `https://www.last.fm/music/${encodeURIComponent(json.track.artist['#text'])}/_/${encodeURIComponent(json.track.name)}`;

    if (!isPlaying) {
        // If a song isn't playing
        document.getElementById("listeningStatus").innerText = "LAST SONG...";
    } else {
        // If a song is playing
        document.getElementById("listeningStatus").innerText = "NOW LISTENING...";
    }

    // Update the widget with the current track info
    document.getElementById("listening").innerHTML = `
    <img src="${trackImage}">
    <div id="trackInfo">
    <h3 id="trackName"><a href="${lastFmLink}" target="_blank" style="text-decoration:none;">${trackName}</a></h3>
    <h5 id="artistName">${json.track.artist['#text']}</h5>
    </div>
    `;
};

getTrack();
setInterval(() => { getTrack(); }, 5000);