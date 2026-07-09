// ===== MENU DATA =====
const MENU = {
  pastries: [
    { name:'Butter Croissant',     desc:'Hand-laminated with French butter, 36-hour rise.', price:'$4.50', img:'images/croissant.jpg' },
    { name:'Pain au Chocolat',     desc:'Two batons of Valrhona dark chocolate inside flaky layers.', price:'$5.25', img:'images/pain-au-chocolat.jpg' },
    { name:'Almond Croissant',     desc:'Twice-baked with frangipane and toasted almonds.', price:'$5.75', img:'images/croissant.jpg' },
    { name:'Kouign-Amann',         desc:'Caramelized Breton classic — crisp, buttery, irresistible.', price:'$5.50', img:'images/pretzel.jpg' },
    { name:'Raspberry Danish',     desc:'Cream cheese & fresh raspberries on golden pastry.', price:'$5.00', img:'images/tart.jpg' },
    { name:'Pistachio Twist',      desc:'Sicilian pistachio cream wrapped in laminated dough.', price:'$6.00', img:'images/macarons.jpg' },
  ],
  breads: [
    { name:'Country Sourdough',    desc:'Naturally leavened, 36-hour ferment, blistered crust.', price:'$8.00', img:'images/sourdough.jpg' },
    { name:'Seeded Multigrain',    desc:'Sunflower, flax, sesame & pumpkin seeds.', price:'$9.00', img:'images/wheat.jpg' },
    { name:'Baguette Tradition',   desc:'Classic French baguette, crackling crust.', price:'$5.50', img:'images/sourdough.jpg' },
    { name:'Walnut Levain',        desc:'Toasted walnuts folded into our signature levain.', price:'$10.00', img:'images/sourdough.jpg' },
    { name:'Olive Fougasse',       desc:'Provençal flatbread with Castelvetrano olives.', price:'$9.50', img:'images/pretzel.jpg' },
    { name:'Brioche Loaf',         desc:'Soft, buttery, perfect for French toast.', price:'$11.00', img:'images/wheat.jpg' },
  ],
  cakes: [
    { name:'Opera Cake',           desc:'Almond sponge, coffee buttercream, dark chocolate ganache.', price:'$8.50', img:'images/cake.jpg' },
    { name:'Lemon Tart',           desc:'Bright Meyer lemon curd on sablé Breton.', price:'$7.50', img:'images/tart.jpg' },
    { name:'Paris-Brest',          desc:'Choux ring filled with hazelnut praline cream.', price:'$8.00', img:'images/cake.jpg' },
    { name:'Strawberry Charlotte', desc:'Vanilla mousse, ladyfingers, fresh berries.', price:'$9.00', img:'images/cake.jpg' },
    { name:'Chocolate Entremet',   desc:'Three layers of single-origin chocolate.', price:'$9.50', img:'images/cake.jpg' },
    { name:'Seasonal Galette',     desc:'Whatever fruit is best this week.', price:'$7.00', img:'images/tart.jpg' },
  ],
  drinks: [
    { name:'Espresso',             desc:'Single-origin from Brooklyn Roasting Co.', price:'$3.50', img:'images/coffee.jpg' },
    { name:'Café au Lait',         desc:'Double espresso, steamed whole milk.', price:'$5.00', img:'images/coffee.jpg' },
    { name:'Cortado',              desc:'Balanced 1:1 espresso & warm milk.', price:'$4.50', img:'images/coffee.jpg' },
    { name:'Hot Chocolate',        desc:'Melted Valrhona, whole milk, fresh whipped cream.', price:'$5.50', img:'images/coffee.jpg' },
    { name:'Chamomile Tea',        desc:'Loose-leaf Egyptian chamomile.', price:'$4.00', img:'images/coffee.jpg' },
    { name:'Fresh Citrus Press',   desc:'Whatever citrus is in season, hand-pressed.', price:'$5.00', img:'images/coffee.jpg' },
  ],
};

// ===== RENDER MENU =====
const grid = document.getElementById('menuGrid');
function renderMenu(cat){
  grid.innerHTML = MENU[cat].map(item => `
    <article class="menu-card">
      <div class="menu-img"><img src="${item.img}" alt="${item.name}" loading="lazy" /></div>
      <div class="menu-body">
        <h3>${item.name}</h3>
        <p class="desc">${item.desc}</p>
        <div class="menu-foot">
          <span class="menu-price">${item.price}</span>
          <button class="add-btn" data-name="${item.name}">Add to order</button>
        </div>
      </div>
    </article>
  `).join('');
}
renderMenu('pastries');

// ===== TABS =====
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.tab);
  });
});

// ===== TOAST =====
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ===== ADD TO ORDER (event delegation) =====
grid.addEventListener('click', e => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;
  showToast(`✓ ${btn.dataset.name} added to your order`);
});

// ===== NAV: scroll state + mobile =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== REVEAL ON SCROLL =====
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== FORM HANDLERS =====
function handleForm(id, msg){
  const f = document.getElementById(id);
  if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    showToast(msg);
    f.reset();
  });
}
handleForm('orderForm', '✓ Order request received — we\'ll email you within 24h');
handleForm('contactForm', '✓ Message sent — we\'ll be in touch soon');
handleForm('newsletterForm', '✓ You\'re subscribed. Welcome to the crumbs club!');

// ===== HERO PARALLAX (subtle) =====
const cards = document.querySelectorAll('.hero-card');
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - .5) * 20;
  const y = (e.clientY / window.innerHeight - .5) * 20;
  cards.forEach((c, i) => {
    const f = (i + 1) * 0.4;
    c.style.translate = `${x*f}px ${y*f}px`;
  });
});
