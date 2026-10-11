/* ============ EDIT ME: CONTACT DETAILS ============ */
const CONTACTS = {
  linkedin: 'https://www.linkedin.com/in/saravanakumar63?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  github:   'https://github.com/saravanakumar070707',
  email:    'dksaravanakumar7@gmail.com',
  whatsapp: '919080440728'            // country code 91 + number
};

/* ============ EDIT ME: RESUME PAGES ============
   Images were generated from assets/resume/resume.pdf.
   To update: replace the PDF, then re-run:  pdftoppm -r 130 -png assets/resume/resume.pdf assets/resume/page
   and list the resulting files below. */
const RESUME_PDF = 'assets/resume/resume.pdf';
const RESUME_PAGES = ['assets/resume/page-1.png', 'assets/resume/page-2.png'];

/* ============ EDIT ME: BOOK CONTENT ============ */
const li = a => '<ul>' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';
const chips = a => '<ul class="chips">' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';

const BOOKS = {
  projects: {
    left: `<h2>Projects</h2>
      <h3>Project 2 — Speech-to-Text Web Service</h3>
      <p>Created a web-based speech-to-text service concept that converts spoken words into text using browser-based speech recognition capabilities.</p>
      <p>The application provides a simple interface for capturing voice input and displaying the converted text on the webpage.</p>
      <p class="tech">Technologies: HTML, CSS, JavaScript, Web Speech API</p>`,
    right: `<h2>&nbsp;</h2>
      <h3>Project 1 — Advanced Attendance System</h3>
      <p>Developed an attendance management system concept to simplify student attendance tracking and maintain attendance records digitally.</p>
      <p>The system focuses on recording student attendance, managing attendance data, and providing an organized way to monitor attendance status.</p>
      <p class="tech">Technologies: Python 3.11, REST API</p>`
  },
  skills: {
    left: `<h2>Skills</h2>
      <h3>Programming Languages</h3>${chips(['Python','Java','SQL','JavaScript'])}
      <h3>Frontend &amp; Mobile</h3>${chips(['React JS','Flutter','UI/UX Design','Wireframing'])}
      <h3>Backend</h3>${chips(['Spring Boot'])}`,
    right: `<h2>&nbsp;</h2>
      <h3>Tools &amp; Platforms</h3>${chips(['Git','VS Code'])}
      <h3>Analytics &amp; Business Intelligence</h3>${chips(['Power BI (DAX, Dashboards, Data Modeling)','EDA'])}`
  },
  resume: { resume: true },
  experience: {
    left: `<h2>Experience</h2>
      <h3>Web Development Intern</h3>
      <p>Femtosoft Technologies, Chennai</p>
      <p class="sub">Duration: 1 Month</p>`,
    right: `<h2>&nbsp;</h2><h3>Responsibilities / Experience</h3>` + li([
      'Gained hands-on experience in web development using HTML, CSS, and JavaScript.',
      'Learned to design and develop responsive and user-friendly web pages.',
      'Gained practical knowledge of API integration and basic web application development.',
      'Improved understanding of frontend development, debugging, and problem-solving through practical training.'])
  },
  about: {
    left: `<h2>Education</h2>
      <h3>Bachelor of Engineering (B.E.) in Computer Science and Engineering</h3>
      <p class="sub">August 2022 – May 2026</p>
      <p>Mohamed Sathak Engineering College, Kilakarai, Ramanathapuram</p>
      <p><b>CGPA:</b> 7.43/10</p><hr>
      <h3>Department Student Coordinator — Club Code Zero</h3>
      ${li(['Orchestrated student committees to deliver technical workshops and the annual Cinematrix symposium.'])}
      <h3>College Cricket Team — Cricket Player &amp; Team Representative</h3>
      ${li(['Represented Ramanathapuram District Cricket Team at Tamil Nadu CM Trophy State Tournament 2025.'])}<hr>
      <h3>Class XII — Sri Sangeetha Vidyalaya Matriculation School</h3>
      <p class="sub">2021 – 2022</p><p>Year of Passing: 2022 | Percentage: 64%</p>
      <h3>Class X — St. Mary's Matriculation School</h3>
      <p class="sub">2019 – 2020</p><p>Year of Passing: 2020 | Percentage: 93%</p>`,
    right: `<h2>About Me</h2>
      <p>Motivated Computer Science and Engineering graduate with a strong interest in software development and technology.</p>
      <p>Skilled in Python and SQL, with practical exposure to HTML, CSS, JavaScript, and API integration gained through an internship and academic projects. Interested in web development, full-stack development, software testing, and data analytics, with a focus on learning both frontend and backend technologies to build complete, user-focused applications.</p>
      <p>A quick learner who enjoys exploring new technologies through hands-on projects and is eager to adapt to new tools.</p>
      <p>Seeking an entry-level opportunity to apply technical knowledge, gain industry experience, and grow as a software professional.</p>`
  }
};

/* ============ HELPERS ============ */
const $ = id => document.getElementById(id);
let lastFocus = null;
function openOverlay(el){ lastFocus = document.activeElement; el.classList.remove('closing'); el.hidden = false; }
function closeOverlay(el){
  if (el.hidden) return;
  el.classList.add('closing');
  setTimeout(() => { el.hidden = true; el.classList.remove('closing'); lastFocus && lastFocus.focus && lastFocus.focus(); }, 250);
}
const overlays = ['book-overlay','watch-overlay','note-overlay','id-overlay'].map($);
overlays.forEach(o => {
  o.addEventListener('click', e => { if (e.target === o || e.target.closest('[data-close]')) closeOverlay(o); });
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') overlays.forEach(closeOverlay); });

/* ============ BOOKS ============ */
function openBook(key){
  const b = BOOKS[key], book = $('book');
  book.dataset.book = key;
  if (b.resume) {
    const pages = RESUME_PAGES.map(src => `<img class="resume-img" src="${src}" alt="Resume page">`);
    const L = pages.filter((_, i) => i % 2 === 0).join(''), R = pages.filter((_, i) => i % 2).join('');
    $('page-left').innerHTML = L || '<p>Add your resume pages in script.js (RESUME_PAGES).</p>';
    $('page-right').innerHTML = R + `<a class="pdf-link" href="${RESUME_PDF}" target="_blank" rel="noopener">Open / download resume PDF</a>`;
  } else { $('page-left').innerHTML = b.left; $('page-right').innerHTML = b.right; }
  // restart page-turn animation
  ['page-left','page-right','book'].forEach(id => { const n = $(id); n.style.animation = 'none'; void n.offsetWidth; n.style.animation = ''; });
  $('page-left').scrollTop = $('page-right').scrollTop = 0;
  openOverlay($('book-overlay'));
}
document.querySelectorAll('.book-hot').forEach(btn => btn.addEventListener('click', () => openBook(btn.dataset.book)));

/* ============ CONTACT BADGES ============ */
$('b-linkedin').href = CONTACTS.linkedin;
$('b-github').href = CONTACTS.github;
$('b-gmail').href = 'mailto:' + CONTACTS.email;
$('b-whatsapp').href = 'https://wa.me/' + CONTACTS.whatsapp;

/* ============ WATCH (live IST, 12-hour) ============ */
const timeFmt = new Intl.DateTimeFormat('en-US', { timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true });
const dateFmt = new Intl.DateTimeFormat('en-IN', { timeZone:'Asia/Kolkata', weekday:'long', day:'numeric', month:'long', year:'numeric' });
let clock;
function tick(){ const n = new Date(); $('ist-time').textContent = timeFmt.format(n); $('ist-date').textContent = dateFmt.format(n); }
$('watch-hot').addEventListener('click', () => { tick(); clearInterval(clock); clock = setInterval(tick, 1000); openOverlay($('watch-overlay')); });
new MutationObserver(() => { if ($('watch-overlay').hidden) clearInterval(clock); }).observe($('watch-overlay'), { attributes:true, attributeFilter:['hidden'] });

/* ============ VISITOR NOTE (never stored; wiped on reset) ============ */
const noteEl = $('note'), noteText = $('note-text');
$('note-hot').addEventListener('click', () => { openOverlay($('note-overlay')); setTimeout(() => noteText.focus(), 300); });
function freshSheet(){
  noteEl.classList.remove('fresh'); void noteEl.offsetWidth; noteEl.classList.add('fresh');
  noteText.value = ''; noteText.focus();
}
$('note-done').addEventListener('click', freshSheet);
$('note-clear').addEventListener('click', () => { noteText.value = ''; noteText.focus(); });
$('note-overlay').addEventListener('transitionend', () => {});
new MutationObserver(() => { if ($('note-overlay').hidden) noteText.value = ''; }).observe($('note-overlay'), { attributes:true, attributeFilter:['hidden'] });

/* ============ ID CARD ============ */
$('id-hot').addEventListener('click', () => openOverlay($('id-overlay')));
