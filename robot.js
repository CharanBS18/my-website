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
    // Certificates
    const cert = document.querySelector('#certificates');
    if (cert) targets.push({el: cert, key:'certificates', msg: "These are Charan's certificates."});
    // GitHub links
    const gh = document.querySelector('a[href*="github.com/CharanBS18"]');
    if (gh) targets.push({el: gh, key:'github', msg: "Check out Charan's GitHub."});
    // Projects section
    const proj = document.querySelector('[href="#work"], #work');
    if (proj) targets.push({el: proj, key:'projects', msg: "This section lists some projects."});
    // Project rows
    document.querySelectorAll('.project-row').forEach(el=> targets.push({el, key:'project-row', msg: el.getAttribute('aria-label') || 'Project'}));
    return targets;
  }

  let targets = collectTargets();
  // refresh targets on resize or DOM changes
  window.addEventListener('resize', ()=> targets = collectTargets());

  // Pointer follow
  let robotX = window.innerWidth - 80, robotY = window.innerHeight - 80;
  let targetX = robotX, targetY = robotY;
  const speed = 0.15; // lerp
  let enabled = true;

  function lerp(a,b,t){ return a + (b-a)*t; }

  function updatePosition(){
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
    targetX = e.clientX + 60; // offset so robot follows with margin
    targetY = e.clientY + 40;
    // proximity check
    let nearest = null; let nearestDist = Infinity;
    for (const t of targets){
      const r = t.el.getBoundingClientRect();
      const cx = r.left + r.width/2; const cy = r.top + r.height/2;
      const d = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (d < nearestDist){ nearestDist = d; nearest = t; }
    }
    if (nearest && nearestDist < PROXIMITY_RADIUS){ showMessage(nearest.msg, 3000); }
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
