/* Robot widget: prompt for name, show robot, follow pointer and show proximity tooltips */
(function(){
  const STORAGE_KEY = 'robot_name_v1';
  const DEFAULT_MSG = "Hi! I'm Robo — hover around to get tips.";
  const PROXIMITY_RADIUS = 140; // px

  function $(s, ctx=document) { return ctx.querySelector(s); }
  function $$(s, ctx=document) { return Array.from(ctx.querySelectorAll(s)); }

  // Create root
  const root = document.createElement('div');
  root.id = 'robot-root';

  const widget = document.createElement('div');
  widget.className = 'robot-widget';
  widget.innerHTML = `
    <div class="robot-bubble" id="robot-bubble"><span id="robot-bubble-text"></span></div>
    <div class="modelViewPort" id="robot-model" aria-hidden="true">
      <div class="eva">
        <div class="head">
          <div class="eyeChamber">
            <div class="eye"></div>
            <div class="eye"></div>
          </div>
        </div>
        <div class="body">
          <div class="hand"></div>
          <div class="hand"></div>
          <div class="scannerThing"></div>
          <div class="scannerOrigin"></div>
        </div>
      </div>
    </div>
  `;

  root.appendChild(widget);
  document.body.appendChild(root);

  const bubble = document.getElementById('robot-bubble');
  const bubbleText = document.getElementById('robot-bubble-text');

  // Modal for name
  function showNameModal(existingName){
    if (existingName) return; // only show if no name
    const modal = document.createElement('div'); modal.className='robot-modal';
    modal.innerHTML = `
      <div class="card">
        <div style="font-weight:700">Welcome!</div>
        <div style="margin-top:6px">What's your name? (optional)</div>
        <input id="robot-name-input" placeholder="Your name" />
        <div class="row">
          <button id="robot-name-save">Save</button>
          <button id="robot-name-skip">Skip</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    const input = modal.querySelector('#robot-name-input');
    input.focus();
    modal.querySelector('#robot-name-save').addEventListener('click', ()=>{
      const v = input.value.trim();
      if (v) localStorage.setItem(STORAGE_KEY, v);
      modal.remove();
      greet();
    });
    modal.querySelector('#robot-name-skip').addEventListener('click', ()=>{ modal.remove(); greet(); });
  }

  function getName(){ return localStorage.getItem(STORAGE_KEY) || null; }

  function greet(){
    const name = getName();
    const message = name? `Welcome, ${name}!` : DEFAULT_MSG;
    showMessage(message, 5000);
  }

  // Show bubble message
  let bubbleTimeout;
  function showMessage(text, ms=3000){
    bubbleText.textContent = text;
    bubble.classList.add('show');
    clearTimeout(bubbleTimeout);
    if (ms>0) bubbleTimeout = setTimeout(()=>bubble.classList.remove('show'), ms);
  }

  // Proximity detection
  function collectTargets(){
    const targets = [];
    const addTarget = (el, key, msg) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      targets.push({
        el,
        key,
        msg,
        pageX: r.left + window.scrollX + r.width/2,
        pageY: r.top + window.scrollY + r.height/2
      });
    };

    // Certificates
    addTarget(document.querySelector('#certificates'), 'certificates', "These are Charan's certificates.");
    // GitHub links
    addTarget(document.querySelector('a[href*="github.com/CharanBS18"]'), 'github', "Check out Charan's GitHub.");
    // Projects section
    addTarget(document.querySelector('[href="#work"], #work'), 'projects', "This section lists some projects.");
    // Project rows
    document.querySelectorAll('.project-row').forEach(el => {
      addTarget(el, 'project-row', el.getAttribute('aria-label') || 'Project');
    });
    return targets;
  }

  // Interactive elements (buttons/links) - tooltip for everything
  let interactiveListeners = new Map();
  let activeHoveredElement = null;
  let hoveredPageX = 0;
  let hoveredPageY = 0;

  function collectInteractiveTargets(){
    // selectors for interactive elements
    const selector = 'button, a, [role="button"], input[type="button"], input[type="submit"], .certificate-photo, .project-row';
    const els = Array.from(document.querySelectorAll(selector));

    // attach handlers (avoid duplicate)
    // remove listeners for elements no longer present
    for (const el of Array.from(interactiveListeners.keys())){
      if (!document.contains(el)){
        const {enter, leave} = interactiveListeners.get(el);
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        interactiveListeners.delete(el);
      }
    }

    els.forEach(el=>{
      if (interactiveListeners.has(el)) return;
      const getMessage = ()=>{
        // priority: data-robot-message, aria-label, title, attributes, textContent
        const ds = el.dataset && el.dataset.robotMessage;
        if (ds) return ds;
        const aria = el.getAttribute && el.getAttribute('aria-label');
        const title = el.getAttribute && el.getAttribute('title');
        const href = el.getAttribute && el.getAttribute('href') || '';
        const onclick = el.getAttribute && el.getAttribute('onclick') || '';
        const text = (el.textContent || '').trim().replace(/\s+/g, ' ').toLowerCase();

        // 1. Direct matches/substrings in text or attributes
        if (text.includes('view my work')) {
          return "This takes you directly to my featured projects and 3D prototypes below.";
        }
        if (text.includes('learn more')) {
          return "Scroll down to the About section to read about my developer journey and role fit.";
        }
        if (text.includes('get in touch')) {
          return "Jump directly to the contact section to send me a message or connect.";
        }
        if (text.includes('email me') || href.startsWith('mailto:')) {
          return "Open your mail application to send a direct email to charanbs@yahoo.com.";
        }
        if (text.includes('linkedin') || href.includes('linkedin.com')) {
          return "Open my LinkedIn profile in a new tab to connect or network.";
        }
        if (href.includes('github.com/CharanBS18?tab=repositories') || text.includes('view all on github')) {
          return "Open a new tab to browse all of my public source code repositories on GitHub.";
        }
        if (text.includes('github') || href.includes('github.com')) {
          return "Open my GitHub profile in a new tab to see my coding activity and contributions.";
        }
        if (text.includes('twitter') || href.includes('twitter.com')) {
          return "Open my Twitter profile in a new tab to follow my updates.";
        }
        if (text.includes('instagram') || href.includes('instagram.com')) {
          return "Open my Instagram profile in a new tab to see my creative designs and life.";
        }
        if (text.includes('discord') || href.includes('discord.com')) {
          return "Connect with me on Discord: @charan00002.";
        }
        if (text.includes('plant health rag') || href.includes('planthealthrag')) {
          return "Open the Plant Health RAG Streamlit app where AI diagnoses plant health issues.";
        }
        if (text.includes('lumina volt ev') || href.includes('ev-project')) {
          return "Open Lumina Volt: an interactive 3D WebGL pathing and EV showcase.";
        }
        if (text.includes('3d car') || href.includes('carwebsite')) {
          return "Open Cinematic 3D Car: a high-fidelity Three.js and Vite vehicle showcase.";
        }
        if (text.includes('drone showcase') || href.includes('drone-website')) {
          return "Open Cinematic Drone Showcase: an interactive 3D drone rendering with scroll motion.";
        }
        if (href.includes('AWS certificate.pdf')) {
          return "Open my verified Amazon Web Services Cloud Practitioner certification PDF.";
        }
        if (href.includes('Cyber Job Simulation')) {
          return "Open my Cybersecurity Job Simulation completion certificate PDF.";
        }
        if (href.includes('Data analysis')) {
          return "Open my Data Analysis and Analytics certification PDF.";
        }
        if (href.includes('completion_certificate.pdf') || text.includes('vista certificate')) {
          return "Open my Vista course completion certificate PDF.";
        }
        if (href.includes('forge data labeling')) {
          return "Open my Machine Learning Data Labeling certification PDF.";
        }

        // Side dot scroll indicator or individual scroll anchors
        if (onclick.includes("scrollToSection('top')") || text === 'start') {
          return "Scroll smoothly back to the top of the page.";
        }
        if (onclick.includes("scrollToSection('about')") || (onclick === '' && href === '#about') || text === 'about') {
          return "Scroll to the About section to read about my background and role fit.";
        }
        if (onclick.includes("scrollToSection('stack')") || (onclick === '' && href === '#stack') || text === 'stack') {
          return "Scroll down to my interactive 3D tech stack globe.";
        }
        if (onclick.includes("scrollToSection('capabilities')") || (onclick === '' && href === '#capabilities') || text === 'skills' || text === 'capabilities') {
          return "Scroll to the Capabilities section to check my developer skills.";
        }
        if (onclick.includes("scrollToSection('work')") || (onclick === '' && href === '#work') || text === 'works' || text === 'projects') {
          return "Scroll to the Projects section to explore my applications and prototypes.";
        }
        if (onclick.includes("scrollToSection('certificates')") || (onclick === '' && href === '#certificates') || text === 'credentials' || text === 'certificates') {
          return "Scroll to the Certificates section to view my verified credentials.";
        }
        if (onclick.includes("scrollToSection('contact')") || (onclick === '' && href === '#contact') || text === 'contact') {
          return "Scroll to the Contact section to get in touch with me.";
        }

        // Action controls
        if (onclick.includes('closeCertLightbox') || text.includes('close')) {
          return "Close the certificate viewer overlay.";
        }
        if (text.includes('open in new tab')) {
          return "Open this certificate PDF document in a new browser tab.";
        }
        if (el.classList.contains('prompt-box-21st-send') || aria === 'Send prompt' || text.includes('arrow_upward')) {
          return "Send your custom message or prompt from the contact box.";
        }

        // Smart text fallback
        if (aria) return aria;
        if (title) return title;
        
        const cleanTxt = (el.textContent || '').trim().replace(/\s+/g, ' ');
        if (cleanTxt && cleanTxt.length < 60) {
          if (el.tagName.toLowerCase() === 'a') {
            return `Click to open link: "${cleanTxt}"`;
          }
          return `Click to trigger: "${cleanTxt}"`;
        }

        if (el.tagName.toLowerCase()==='a') return `Link to ${el.href.split('/').pop()||el.href}`;
        return 'Interactive element';
      };

      const enter = ()=>{
        const msg = getMessage();
        // show indefinitely while hovered
        showMessage(msg, 0);
        activeHoveredElement = el;
        const r = el.getBoundingClientRect();
        hoveredPageX = r.left + window.scrollX + r.width/2;
        hoveredPageY = r.top + window.scrollY + r.height/2;
        targetX = r.left + r.width/2 + 30; targetY = r.top + r.height/2 + 20;
      };
      const leave = ()=>{
        if (activeHoveredElement === el) activeHoveredElement = null;
        bubble.classList.remove('show');
      };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      interactiveListeners.set(el, {enter, leave});
    });
  }

  let targets = collectTargets();
  // refresh targets on resize or DOM changes
  window.addEventListener('resize', ()=> targets = collectTargets());
  // collect interactive targets too
  collectInteractiveTargets();
  window.addEventListener('resize', collectInteractiveTargets);

  // Mutation observer to capture dynamic elements
  if ('MutationObserver' in window) {
    let debounceTimer;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        collectInteractiveTargets();
        targets = collectTargets();
      }, 200);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Pointer follow
  let robotX = window.innerWidth - 80, robotY = window.innerHeight - 80;
  let targetX = robotX, targetY = robotY;
  const speed = 0.15; // lerp
  let enabled = true;

  function lerp(a,b,t){ return a + (b-a)*t; }


  function updatePosition(){
    if (activeHoveredElement) {
      targetX = hoveredPageX - window.scrollX + 30;
      targetY = hoveredPageY - window.scrollY + 20;
    }
    robotX = lerp(robotX, targetX, speed);
    robotY = lerp(robotY, targetY, speed);
    root.style.transform = `translate3d(${robotX - window.innerWidth + 120}px, ${robotY - window.innerHeight + 120}px, 0)`;
    requestAnimationFrame(updatePosition);
  }
  requestAnimationFrame(updatePosition);

  // Throttled mousemove
  let last = 0;
  window.addEventListener('mousemove', (e)=>{
    if (!enabled) return;
    const now = Date.now();
    if (now - last < 40) return; last = now;
    
    if (!activeHoveredElement) {
      targetX = e.clientX + 60; // offset so robot follows with margin
      targetY = e.clientY + 40;
      
      // proximity check using page-relative caches adjusted for scroll
      let nearest = null; let nearestDist = Infinity;
      for (const t of targets){
        const cx = t.pageX - window.scrollX;
        const cy = t.pageY - window.scrollY;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        if (d < nearestDist){ nearestDist = d; nearest = t; }
      }
      if (nearest && nearestDist < PROXIMITY_RADIUS){ showMessage(nearest.msg, 3000); }
    }
  });

  // Pause when page hidden
  document.addEventListener('visibilitychange', ()=>{ enabled = !document.hidden; });

  // Init
  document.addEventListener('DOMContentLoaded', ()=>{
    const name = getName();
    showNameModal(name);
    // greet after small delay
    setTimeout(()=> greet(), 1200);
  });

  // Allow dismiss by click
  bubble.addEventListener('click', ()=> bubble.classList.remove('show'));

  // Expose for debugging
  window.__robot = { root, showMessage, getName };

})();
