class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.currentKick = "./sounds/kick-classic.wav";
    this.snareAudio = document.querySelector('.snare-sound');
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.index = 0;
    this.bpm = 150;
    this.playButton = document.querySelector('.play');
    this.isPlaying = null;
    this.selectSound = document.querySelectorAll('select');
  }
  activePad() {
    this.classList.toggle('active');
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach(bar => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //Check if pads are active
      if (bar.classList.contains('active')) {
        //Check which pads are active
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //Check if it is playing
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateButton() {
    if (!this.isPlaying) {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add('active');
    } else {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove('active');
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach(pad => {
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = "";
  })
})

//Play Button
drumKit.playButton.addEventListener('click', function () {
  drumKit.updateButton();
  drumKit.start();
});

//Select Sounds

drumKit.selectSound.forEach(select => {
  select.addEventListener('change', function (e) {
    drumKit.changeSound(e);
  })
})