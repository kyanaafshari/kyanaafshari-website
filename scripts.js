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

function initializeScrollDownNote() {
  const scrollDownNote = document.getElementById('scrollDownNote');
  const timelineContainer = document.querySelector('.timeline-container');
  const riskGameSection = document.querySelector('.risk-game-section');
  
  if (!scrollDownNote || !timelineContainer || !riskGameSection) return;

  // Show/hide scroll down note based on scroll position
  function toggleScrollDownNote() {
    const timelineBottom = timelineContainer.offsetTop + timelineContainer.offsetHeight;
    const riskGameTop = riskGameSection.offsetTop;
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Show note when user has scrolled past timeline but before risk game
    const showNote = scrollPosition + windowHeight > timelineBottom && 
                     scrollPosition + windowHeight < riskGameTop + 200;
    
    if (showNote) {
      scrollDownNote.classList.add('visible');
    } else {
      scrollDownNote.classList.remove('visible');
    }
  }

  // Smooth scroll to risk game when note is clicked
  scrollDownNote.addEventListener('click', function() {
    riskGameSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Hide the note after clicking
    setTimeout(() => {
      scrollDownNote.classList.remove('visible');
    }, 500);
  });

  // Listen for scroll events
  window.addEventListener('scroll', toggleScrollDownNote);
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

  initializeScrollDownNote();

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

// Risk Prioritization Game JavaScript
(function() {
  // Array of vulnerability reports with their details and justifications
  const vulnerabilityReports = [
    {
      id: 'report1',
      title: 'High Severity SQL Injection on Login Page',
      description: 'An unauthenticated SQL injection vulnerability was discovered on the user login page, allowing full database access.',
      impact: 'Complete data compromise, unauthorized access.',
      justification: 'This is a CRITICAL vulnerability because it allows unauthenticated attackers to gain full control over the database, leading to complete data compromise and potential system takeover. It directly impacts confidentiality, integrity, and availability.',
      icon: '🚨'
    },
    {
      id: 'report2',
      title: 'Low Severity XSS on Static Blog Page',
      description: 'A reflected Cross-Site Scripting (XSS) vulnerability was found on a static blog comment section, requiring user interaction.',
      impact: 'Limited user session hijacking, defacement.',
      justification: 'This is a LOW priority because it is a reflected XSS on a static page, requiring user interaction (clicking a malicious link) and its impact is limited to session hijacking or defacement, not direct data exfiltration from the backend. While important, it\'s not immediately exploitable for widespread damage.',
      icon: '⚠️'
    },
    {
      id: 'report3',
      title: 'Unauthorized Access to Employee Database (Internal)',
      description: 'An internal employee gained unauthorized read access to a non-sensitive employee contact database due to misconfigured permissions.',
      impact: 'Internal policy violation, potential data exposure.',
      justification: 'This is a HIGH priority incident. While the database is non-sensitive and the access is internal, it represents a clear breach of internal policy and a failure in access controls. It could escalate if the employee gains further access or if the data becomes sensitive over time. Immediate remediation of permissions is required.',
      icon: '🔓'
    },
    {
      id: 'report4',
      title: 'Missing Security Headers on Public Marketing Site',
      description: 'Several HTTP security headers (e.g., Strict-Transport-Security, X-Frame-Options) are missing on the public marketing website.',
      impact: 'Clickjacking, insecure content delivery, minor SEO impact.',
      justification: 'This is a MEDIUM priority. While not a direct vulnerability leading to data breach, missing security headers can expose users to client-side attacks like clickjacking or insecure content loading. It\'s a best practice and a common compliance requirement, but the immediate risk is lower than direct code vulnerabilities.',
      icon: '🛡️'
    },
    {
      id: 'report5',
      title: 'Outdated Library with Known CVE on Internal Tool',
      description: 'An internal development tool uses an outdated version of a JavaScript library with a known Critical CVE (Common Vulnerabilities and Exposures) for remote code execution.',
      impact: 'Potential remote code execution on internal systems.',
      justification: 'This is a HIGH priority. Although on an "internal" tool, a Critical CVE for Remote Code Execution (RCE) means that if an attacker gains initial access to the internal network, this vulnerability could be easily exploited for significant impact. It poses a direct threat to internal system integrity and confidentiality, even if not directly internet-facing.',
      icon: '⏰'
    }
  ];

  let activeReport = null;

  // Initialize the game when DOM is loaded
  function initializeRiskGame() {
    const reportsContainer = document.getElementById('reports-container');
    const prioritySelection = document.getElementById('priority-selection');
    const feedbackArea = document.getElementById('feedback-area');
    const justificationText = document.getElementById('justification-text');
    const resetButton = document.getElementById('reset-button');

    if (!reportsContainer) return; // Exit if game elements don't exist

    // Render all vulnerability reports
    function renderReports() {
      reportsContainer.innerHTML = '';
      vulnerabilityReports.forEach(report => {
        const reportCard = document.createElement('div');
        reportCard.id = report.id;
        reportCard.classList.add('report-card');
        reportCard.innerHTML = `
          <div class="report-header">
            <span class="report-icon">${report.icon}</span>
            <h3 class="report-title">${report.title}</h3>
          </div>
          <p class="report-description">${report.description}</p>
          <p class="report-impact"><strong>Impact:</strong> ${report.impact}</p>
          <div class="justification-feedback" data-justification-for="${report.id}">
            <h4>Your Prioritization Feedback:</h4>
            <p></p>
          </div>
        `;
        reportsContainer.appendChild(reportCard);

        // Add click listener to each report card
        reportCard.addEventListener('click', () => selectReport(reportCard, report));
      });
    }

    // Handle report selection
    function selectReport(clickedCard, reportData) {
      // Remove 'active' class from all other cards
      document.querySelectorAll('.report-card').forEach(card => {
        card.classList.remove('active');
      });

      // Add 'active' class to the clicked card
      clickedCard.classList.add('active');
      activeReport = reportData;

      // Show priority selection buttons
      prioritySelection.classList.remove('hidden');
      // Hide feedback area when a new report is selected
      feedbackArea.classList.add('hidden');
    }

    // Handle prioritization
    function prioritizeReport(priority) {
      if (!activeReport) return;

      const reportElement = document.getElementById(activeReport.id);
      const justificationDiv = reportElement.querySelector('.justification-feedback');
      const justificationP = justificationDiv.querySelector('p');

      // Update the justification text
      justificationP.innerHTML = `You assigned this as <strong>${priority}</strong>.<br><br>${activeReport.justification}`;

      // Show the justification area within the report card
      justificationDiv.classList.add('show');

      // Remove active state and hide priority buttons after prioritization
      reportElement.classList.remove('active');
      prioritySelection.classList.add('hidden');
      activeReport = null;

      // Show the main feedback area
      feedbackArea.classList.remove('hidden');
      justificationText.innerHTML = `You assigned the "${reportElement.querySelector('.report-title').textContent}" report as <strong>${priority}</strong>. Scroll up to see the detailed feedback on the report card itself.`;
    }

    // Reset the simulation
    function resetSimulation() {
      // Remove 'active' class from all cards
      document.querySelectorAll('.report-card').forEach(card => {
        card.classList.remove('active');
        card.querySelector('.justification-feedback').classList.remove('show');
      });

      // Hide priority selection buttons and feedback area
      prioritySelection.classList.add('hidden');
      feedbackArea.classList.add('hidden');
      justificationText.innerHTML = '';
      activeReport = null;
      renderReports(); // Re-render reports to clear any dynamic changes
    }

    // Add event listeners to priority buttons
    document.querySelectorAll('.priority-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const priority = event.target.dataset.priority;
        prioritizeReport(priority);
      });
    });

    // Add event listener to the reset button
    if (resetButton) {
      resetButton.addEventListener('click', resetSimulation);
    }

    // Initial render of reports
    renderReports();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRiskGame);
  } else {
    initializeRiskGame();
  }
})();