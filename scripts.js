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

// Array of vulnerability scenarios
const vulnerabilityScenarios = [
    {
        id: 'scenario1',
        title: 'Hardcoded API Key in Configuration',
        type: 'config',
        snippet: `
# Application Configuration
DEBUG_MODE = True
DATABASE_URL = "mysql://user:password@localhost/app_db"
API_KEY = "sk_live_XXXXXXXXXXXXXXXXXXXXXXX"
LOG_LEVEL = "INFO"
        `.trim(),
        vulnerableLines: [3], // Line number (0-indexed)
        explanation: `
            <strong>Vulnerability: Hardcoded API Key.</strong>
            Storing sensitive API keys directly in source code or configuration files is a major security risk. If this file is ever exposed (e.g., through a misconfigured web server, version control leak, or compromised system), the API key can be stolen and misused.
            <strong>Remediation:</strong> Use environment variables, a secrets management service (e.g., AWS Secrets Manager, HashiCorp Vault), or a secure configuration management system to store and retrieve sensitive credentials.
        `
    },
    {
        id: 'scenario2',
        title: 'SQL Injection Vulnerability in User Search',
        type: 'code',
        snippet: `
function getUser(username) {
  const query = "SELECT * FROM users WHERE username = '" + username + "';";
  // In a real app, this would execute the query against a database
  console.log("Executing query: " + query);
  return { id: 1, username: username, email: "test@example.com" }; // Mock result
}

// Example usage (vulnerable if username comes from user input)
let userInput = "admin' OR '1'='1";
getUser(userInput);
        `.trim(),
        vulnerableLines: [1], // Line number (0-indexed)
        explanation: `
            <strong>Vulnerability: SQL Injection.</strong>
            Line 2 directly concatenates user-supplied input ('username') into an SQL query string without proper sanitization or parameterization. An attacker can inject malicious SQL code (e.g., "admin' OR '1'='1") to bypass authentication, access unauthorized data, or even execute arbitrary commands on the database.
            <strong>Remediation:</strong> Always use prepared statements with parameterized queries. Most database libraries provide methods for this (e.g., \`db.execute("SELECT * FROM users WHERE username = ?", [username])\`). Never concatenate user input directly into SQL queries.
        `
    },
    {
        id: 'scenario3',
        title: 'Overly Permissive Firewall Rule',
        type: 'config',
        snippet: `
# Firewall Rules
rule 1: allow tcp from any to any port 80
rule 2: allow tcp from 192.168.1.0/24 to any port 22
rule 3: allow tcp from any to any port 443
rule 4: allow tcp from any to any port 3389
rule 5: deny ip from any to any
        `.trim(),
        vulnerableLines: [3], // Line number (0-indexed) - rule 4: RDP open to any
        explanation: `
            <strong>Vulnerability: Overly Permissive Firewall Rule (RDP).</strong>
            Rule 4 allows TCP traffic from 'any' source to 'any' destination on port 3389 (Remote Desktop Protocol). Exposing RDP to the internet (or any broad network segment) without strict source IP restrictions or VPN requirements is a significant security risk, as RDP is a common target for brute-force attacks and exploits.
            <strong>Remediation:</strong> Restrict RDP access to specific trusted IP addresses or IP ranges. Ideally, place RDP behind a VPN or use a jump box. If external access is required, ensure strong authentication (MFA) is enforced and monitor logs for suspicious activity.
        `
    },
    {
        id: 'scenario4',
        title: 'Insecure Direct Object Reference (IDOR)',
        type: 'code',
        snippet: `
// Express.js Route Handler
app.get('/api/v1/users/:id', (req, res) => {
  const userId = req.params.id; // User ID taken directly from URL
  // In a real app, this would fetch user data from DB
  const userData = fetchUserFromDatabase(userId); // No authorization check
  if (userData) {
    res.json(userData);
  } else {
    res.status(404).send('User not found');
  }
});
        `.trim(),
        vulnerableLines: [4], // Line number (0-indexed) - fetchUserFromDatabase without auth check
        explanation: `
            <strong>Vulnerability: Insecure Direct Object Reference (IDOR).</strong>
            Line 4 fetches user data using an ID directly from the URL parameter (\`req.params.id\`) without performing any authorization check to ensure the *current authenticated user* is permitted to access *that specific user's data*. An attacker could simply change the \`id\` in the URL to view other users' information.
            <strong>Remediation:</strong> Implement robust authorization checks. Before fetching data, verify that the authenticated user has permission to access the requested resource. This often involves comparing the requested ID with the current user's ID or checking roles/permissions.
        `
    },
    {
        id: 'scenario5',
        title: 'Weak Session Management / Predictable Session ID',
        type: 'code',
        snippet: `
// User login function (simplified)
function loginUser(username, password) {
  if (authenticate(username, password)) {
    const sessionId = generateSimpleSessionId(username); // Weak session ID generation
    // Store sessionId in cookie and database
    return { success: true, sessionId: sessionId };
  }
  return { success: false };
}

function generateSimpleSessionId(username) {
  // This is a highly insecure way to generate a session ID!
  return btoa(username + Date.now()); // Base64 encoding of username + timestamp
}
        `.trim(),
        vulnerableLines: [3, 10], // Line 3 (call to weak function), Line 10 (weak generation)
        explanation: `
            <strong>Vulnerability: Weak Session Management / Predictable Session ID.</strong>
            Line 10 (\`generateSimpleSessionId\`) creates a session ID by simply base64 encoding the username and a timestamp. This makes the session ID highly predictable. An attacker could guess or brute-force valid session IDs, especially if they know a username, leading to session hijacking. Line 3 uses this insecure function.
            <strong>Remediation:</strong> Session IDs must be cryptographically strong, random, and sufficiently long. Use built-in session management functions provided by web frameworks (e.g., Express-session, Flask-Session) that generate secure, random session tokens. Ensure session IDs are stored securely (e.g., HttpOnly cookies) and invalidated upon logout or inactivity.
        `
    }
];

let currentScenarioIndex = 0;
let selectedLines = new Set(); // Stores 0-indexed line numbers selected by the user

const codeSnippetPre = document.getElementById('code-snippet');
const checkButton = document.getElementById('check-button');
const nextButton = document.getElementById('next-button');
const resetButton = document.getElementById('reset-button');
const feedbackArea = document.getElementById('feedback-area');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');

/**
 * Loads and displays the current vulnerability scenario.
 */
function loadScenario() {
  selectedLines.clear(); // Clear previous selections
  feedbackArea.classList.remove('show', 'feedback-correct', 'feedback-incorrect', 'feedback-neutral');
  feedbackTitle.textContent = '';
  feedbackText.textContent = '';
  checkButton.disabled = false; // Enable check button
  checkButton.classList.remove('hidden'); // Show check button
  nextButton.classList.add('hidden'); // Hide next button until checked

  const scenario = vulnerabilityScenarios[currentScenarioIndex];
  codeSnippetPre.innerHTML = ''; // Clear previous snippet

  // Split snippet into lines and create clickable elements
  scenario.snippet.split('\n').forEach((line, index) => {
      const lineSpan = document.createElement('span');
      lineSpan.classList.add('code-line', 'block', 'font-mono');
      lineSpan.textContent = `${String(index + 1).padStart(2, ' ')}. ${line}`; // Add line numbers
      lineSpan.dataset.lineNumber = index; // Store 0-indexed line number
      codeSnippetPre.appendChild(lineSpan);

      // Add click listener to each report card
      lineSpan.addEventListener('click', () => toggleLineSelection(lineSpan, index));
  });
}

/**
 * Toggles the selection state of a code line.
 * @param {HTMLElement} lineElement - The HTML element of the clicked line.
 * @param {number} lineNumber - The 0-indexed number of the line.
 */
function toggleLineSelection(lineElement, lineNumber) {
  // Only allow selection if check button is enabled (i.e., not yet checked)
  if (!checkButton.disabled) {
    if (lineElement.classList.contains('selected')) {
        lineElement.classList.remove('selected');
        selectedLines.delete(lineNumber);
    } else {
        lineElement.classList.add('selected');
        selectedLines.add(lineNumber);
    }
  }
}

/**
 * Checks the user's selected lines against the correct vulnerable lines.
 */
function checkAnswer() {
    checkButton.disabled = true; // Disable check button after submission
    checkButton.classList.add('hidden'); // Hide check button
    nextButton.classList.remove('hidden'); // Show next button

    const scenario = vulnerabilityScenarios[currentScenarioIndex];
    const correctLines = new Set(scenario.vulnerableLines);

    let isCorrect = true;
    // Check if all correct lines are selected and no extra lines are selected
    if (selectedLines.size !== correctLines.size) {
        isCorrect = false;
    } else {
        for (let line of correctLines) {
            if (!selectedLines.has(line)) {
                isCorrect = false;
                break;
            }
        }
    }

    // Highlight lines and provide feedback
    document.querySelectorAll('.code-line').forEach((lineElement, index) => {
        // Remove existing feedback classes
        lineElement.classList.remove('selected', 'correct', 'incorrect');

        if (correctLines.has(index)) {
            lineElement.classList.add('correct'); // Mark correct answer
        }
        if (selectedLines.has(index) && !correctLines.has(index)) {
            lineElement.classList.add('incorrect'); // Mark user's incorrect selection
        }
        // If a line was correctly identified by the user, but it's not the only correct line,
        // or if the user missed some correct lines, the overall answer is still incorrect.
        if (!selectedLines.has(index) && correctLines.has(index)) {
            // If a correct line was NOT selected by the user, mark it as missed correct
            lineElement.classList.add('correct'); // Still show it as correct for explanation
        }

        lineElement.style.cursor = 'default'; // Disable further clicks
        // Remove all event listeners to prevent re-selection
        const newLineElement = lineElement.cloneNode(true); // Clone to remove all listeners
        lineElement.parentNode.replaceChild(newLineElement, lineElement);
    });

    feedbackArea.classList.add('show');
    if (isCorrect) {
        feedbackArea.classList.add('feedback-correct');
        feedbackTitle.textContent = 'Correct! Well done!';
    } else {
        feedbackArea.classList.add('feedback-incorrect');
        feedbackTitle.textContent = 'Not quite. Here\'s the explanation:';
    }
    feedbackText.innerHTML = scenario.explanation;
}

/**
 * Resets the current challenge to its initial state.
 */
function resetChallenge() {
    loadScenario(); // Reloads the current scenario
}

/**
 * Moves to the next challenge scenario.
 * If at the end, loops back to the beginning and shows completion message.
 */
function nextChallenge() {
    currentScenarioIndex++;
    if (currentScenarioIndex < vulnerabilityScenarios.length) {
      loadScenario();
    } else {
      // All challenges completed
      currentScenarioIndex = 0; // Loop back to the first scenario
      loadScenario(); // Load the first scenario for a fresh start
      feedbackArea.classList.remove('feedback-correct', 'feedback-incorrect');
      feedbackArea.classList.add('show', 'feedback-neutral');
      feedbackTitle.textContent = 'Challenge Complete!';
      feedbackText.innerHTML = 'You\'ve gone through all the vulnerability scenarios. Click "Reset Challenge" to play again, or try them one more time!';
      nextButton.classList.add('hidden'); // Hide next button
      checkButton.classList.add('hidden'); // Hide check button
    }
}

// Add event listeners
checkButton.addEventListener('click', checkAnswer);
resetButton.addEventListener('click', resetChallenge);
nextButton.addEventListener('click', nextChallenge);


// Initial load of the first scenario when the page loads
document.addEventListener('DOMContentLoaded', loadScenario);
