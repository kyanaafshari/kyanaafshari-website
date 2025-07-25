// --- HOW TO PUSH UPDATES TO GIT ---
// 1) git add .
// 2) git status
// 3) git commit -m "commit title here, describe changes"
// 4) git push origin main
//
// --- HOW TO PULL CHANGES FROM GIT ---
// 1) git pull origin main

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

// Timeline interactivity
function initializeTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      timelineItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
      
      // Optional: Auto-remove active class after 3 seconds
      setTimeout(() => {
        item.classList.remove('active');
      }, 3000);
    });

    // Add staggered entrance animation
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(-50%) scale(1)';
    }, index * 200);
  });
}

// Back to Top Button Functionality
function initializeBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Smooth scroll to top when clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.onload = () => {
  
  // Initialize audio controls
  audio = document.getElementById('backgroundMusic');
  audio.volume = 0.3; // 30% volume
  audioToggle = document.getElementById('audioToggle');
  audioToggle.addEventListener('click', toggleMusic);

  const playMeButton = document.getElementById('playMeButton');
  playMeButton.addEventListener('click', toggleMusic);

  // Initialize text writing for title
  typeWriter("Kyana Afshari", "name", 100);
  setTimeout(() => {
    typeWriter("Cybersecurity Analyst ✨ AI Enthusiast ✨ Leader", "caption", 50);
  }, 1500);

  // Initialize timeline
  initializeTimeline(); 

  //Initizilize back to top button
  initializeBackToTop();

  // Initialize particles
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
          src: "robot-particle.png",
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