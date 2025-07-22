function typeWriter(text, elementId, delay = 100) {
  let i = 0;
  const element = document.getElementById(elementId);
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, delay);
    }
  }
  type();
}

  // Audio control functionality
let isPlaying = false;
let audio, audioToggle;

function toggleMusic() {
  const playMeButton = document.getElementById('playMeButton');
  
  if (isPlaying) {
    audio.pause();
    audioToggle.textContent = '🔇';
    audioToggle.title = 'Play Music';
    isPlaying = false;
    playMeButton.classList.remove('hidden');
  } else {
    audio.play().catch(e => {
      console.log('Audio play failed:', e);
      alert('Please interact with the page first to enable audio.');
      return;
    });
    audioToggle.textContent = '🔊';
    audioToggle.title = 'Pause Music';
    isPlaying = true;
    playMeButton.classList.add('hidden');
  }
}

window.onload = () => {
  // Initialize audio controls, autoplay sound
  audio = document.getElementById('backgroundMusic');
  audioToggle = document.getElementById('audioToggle');
  audioToggle.addEventListener('click', toggleMusic);
  audio.volume = 0.3; // 30% volume

  const playMeButton = document.getElementById('playMeButton');
  playMeButton.addEventListener('click', toggleMusic);

  // Initialize text writing for title
  typeWriter("Kyana Afshari", "name", 100);
  setTimeout(() => {
    typeWriter("Engineer ✨ Pageant Queen ✨ TV Personality", "caption", 50);
  }, 1500);

  // Initialize robots floating in background
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 25,
        density: {
          enable: true,
          value_area: 800
        }
      },
      shape: {
        type: "image",
        image: {
          src: "robot-particle.png", // This is your custom robot image
          width: 40,
          height: 40
        }
      },
      opacity: {
        value: 0.8
      },
      size: {
        value: 30,
        random: true
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        }
      },
      modes: {
        repulse: {
          distance: 100
        }
      }
    },
    retina_detect: true
  });
};
  