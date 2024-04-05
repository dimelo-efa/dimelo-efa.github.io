var isMouseClicking = false;
var isFingerTouching = false;

var songs = {
    "song_0": {
        "before": new Howl({ src: ["/assets/sounds/song_0_before.mp3"], volume: 0.0 }),
        "after": new Howl({ src: ["/assets/sounds/song_0_after.mp3"], volume: 1.0 })
    },
    "song_1": {
        "before": new Howl({ src: ["/assets/sounds/song_1_before.mp3"], volume: 0.0 }),
        "after": new Howl({ src: ["/assets/sounds/song_1_after.mp3"], volume: 1.0 })
    }
}

function moveProgressBar(song, progressBar) {
    if (!song.playing()) return;

    if (!isMouseClicking && !isFingerTouching) {
        const duration = Math.floor(100 / song.duration() * song.seek());
        progressBar.val(duration);
    }

    requestAnimationFrame(() => moveProgressBar(song, progressBar));
}

$(document).ready(() => {
    for (const [title, { before, after }] of Object.entries(songs)) {
        let icon = $(`#${title} button[data-play-song] > i`);
        let legend = $(`#${title} p[data-song-version]`);
        let input = $(`#${title} input[type=range]`);

        before.on("play", () => {
            icon.removeClass("ri-play-line");
            icon.addClass("ri-pause-line");

            window.requestAnimationFrame(() => moveProgressBar(before, input));
        });

        before.on("pause", () => {
            icon.removeClass("ri-pause-line");
            icon.addClass("ri-play-line");
        });

        before.on("stop", () => {
            icon.removeClass("ri-pause-line");
            icon.addClass("ri-play-line");
            input.val(0);
        });

        before.on("end", () => {
            icon.removeClass("ri-pause-line");
            icon.addClass("ri-play-line");
            input.val(0);
        })

        before.on("volume", () => {
            if (before.volume() == 0) {
                legend.text("(después)");
            } else {
                legend.text("(antes)");
            }
        });

        input.on("mouseup", () => {
            isMouseClicking = false;
        });

        input.on("mousedown", () => {
            isMouseClicking = true;
        });

        input.on("touchstart", () => {
            isFingerTouching = true;
        });

        input.on("touchend", () => {
            isFingerTouching = false;
        });

        input.on("change", function () {
            const seek = before.duration() / 100 * $(this).val();

            before.seek(seek);
            after.seek(seek);
        });
    }
});

function playSong(title) {
    let { before, after } = songs[title];

    if (before.playing()) {
        before.pause();
        after.pause();
    } else {
        // Save current playing song position.
        const seek = { before: before.seek(), after: after.seek() }

        // Stop all songs, including the one playing.
        Howler.stop();

        // Restore the previous position of the currently playing song.
        before.seek(seek.before);
        after.seek(seek.after);

        before.play();
        after.play();
    }
}

function stopSong(title) {
    let { before, after } = songs[title];

    before.stop();
    after.stop();
}

function swapSong(title) {
    let { before, after } = songs[title];

    before.volume(before.volume() == 1 ? 0 : 1);
    after.volume(after.volume() == 1 ? 0 : 1);
}