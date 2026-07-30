// --- STATE MANAGEMENT ---
let currentPage = 1;
let collectedGifts = 0;
let candlesBlown = false;
let photoIndex = 0;
let gifIndex = 0;
const photos = ['assets/photo1.jpg', 'assets/photo2.jpg', 'assets/photo3.jpg', 'assets/photo4.jpg', 'assets/photo5.jpg'];
const gifs = ['assets/gif1.gif', 'assets/gif2.gif', 'assets/gif3.gif', 'assets/gif4.gif', 'assets/gif5.gif'];

// --- AUDIO MANAGEMENT ---
const bgMusic = document.getElementById('bg-music');

function playAudio() {
    bgMusic.play().catch(() => {
        // Fallback for browsers blocking autoplay before interaction
        document.addEventListener('click', () => { bgMusic.play(); }, { once: true });
    });
}

// --- INITIALIZATION & LOADING ---
window.addEventListener('DOMContentLoaded', () => {
    let progress = 0;
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');

    const loaderInterval = setInterval(() => {
        progress += 2;
        fill.style.width = progress + '%';
        text.innerText = progress + '%';

        if (progress >= 100) {
            clearInterval(loaderInterval);
            document.getElementById('loader').classList.add('hidden');
            startOpeningAnimation();
        }
    }, 40);

    initParticles();
});

// --- OPENING ANIMATION ---
function startOpeningAnimation() {
    playAudio();
    const openingScreen = document.getElementById('opening');
    const balloonsContainer = document.getElementById('opening-balloons-container');
    
    // Spawn balloons with "RIMI"
    for (let i = 0; i < 8; i++) {
        let b = document.createElement('div');
        b.innerHTML = '🎈 RIMi';
        b.style.position = 'absolute';
        b.style.left = (10 + i * 11) + '%';
        b.style.bottom = '-50px';
        b.style.fontSize = '24px';
        b.style.transition = 'all 4s ease';
        balloonsContainer.appendChild(b);

        setTimeout(() => {
            b.style.bottom = '50%';
            b.style.transform = 'scale(1.2)';
        }, i * 300);

        setTimeout(() => {
            b.style.opacity = '0'; // Burst animation
        }, 3500 + (i * 200));
    }

    setTimeout(() => {
        document.getElementById('opening-text').classList.remove('hidden');
    }, 5500);

    setTimeout(() => {
        openingScreen.style.opacity = '0';
        setTimeout(() => {
            openingScreen.classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
            initPage1();
        }, 1000);
    }, 8500);
}

// --- PAGE NAVIGATION ---
function nextPage(pageNumber) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;
        triggerPageSpecificLogic(pageNumber);
    }
}

function triggerPageSpecificLogic(page) {
    if (page === 2) initGame();
    if (page === 4) initWishes();
    if (page === 5) initCalendar();
    if (page === 9) initReasons();
    if (page === 11) initBalloonsPage();
    if (page === 12) triggerFireworksShow();
}

// --- PAGE 1: TYPING EFFECT ---
function initPage1() {
    const text = "This surprise is specially made for the world's cutest bestie ❤️";
    let index = 0;
    const el = document.getElementById('typing-text');
    el.innerText = '';
    const timer = setInterval(() => {
        el.innerText += text[index];
        index++;
        if (index >= text.length) clearInterval(timer);
    }, 50);
}

// --- PAGE 2: GAME ---
function initGame() {
    const area = document.getElementById('game-area');
    area.innerHTML = '';
    collectedGifts = 0;
    document.getElementById('gift-count').innerText = collectedGifts;

    const items = ['🎁', '🎂', '⭐', '🍬'];
    
    const spawnInterval = setInterval(() => {
        if (collectedGifts >= 5) {
            clearInterval(spawnInterval);
            return;
        }
        let item = document.createElement('div');
        item.className = 'falling-item';
        item.innerText = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 80 + 10 + '%';
        
        item.onclick = () => {
            collectedGifts++;
            document.getElementById('gift-count').innerText = collectedGifts;
            item.remove();
            if (collectedGifts >= 5) {
                setTimeout(() => nextPage(3), 800);
            }
        };

        area.appendChild(item);
        setTimeout(() => { if(item.parentNode) item.remove(); }, 3000);
    }, 800);
}

// --- PAGE 3: CAKE ---
function blowCandles() {
    document.getElementById('candles').innerText = '💨';
    candlesBlown = true;
    document.getElementById('cut-cake-btn').classList.remove('disabled');
}

function cutCake() {
    if (!candlesBlown) return;
    document.getElementById('cake-container').innerHTML = '🍰✨';
    setTimeout(() => nextPage(4), 1000);
}

// --- PAGE 4: WISHES ---
function initWishes() {
    const msg = "Dear Rimi,\n\nOn this wonderful day, I want to remind you how deeply special you are to me. Having you as my bestie is a true blessing. May your year ahead be filled with unlimited laughter, pure joy, and infinite success.\n\nKeep shining bright always! ✨❤️";
    let idx = 0;
    const box = document.getElementById('wishes-text');
    box.innerText = '';
    const timer = setInterval(() => {
        box.innerText += msg[idx];
        idx++;
        if (idx >= msg.length) clearInterval(timer);
    }, 40);
}

// --- PAGE 5: CALENDAR ---
function initCalendar() {
    const now = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    document.getElementById('today-date').innerText = now.toLocaleDateString('en-US', options);
}

// --- PAGE 6: LOVE METER ---
function startLoveMeter() {
    const fill = document.getElementById('love-fill');
    const text = document.getElementById('meter-text');
    const values = ['25%', '50%', '75%', '100%', '500%', '1000%', 'Infinity ♾️'];
    let idx = 0;

    const interval = setInterval(() => {
        text.innerText = values[idx];
        fill.style.width = ((idx + 1) * 14.2) + '%';
        idx++;
        if (idx >= values.length) {
            clearInterval(interval);
            document.getElementById('love-next-btn').classList.remove('hidden');
        }
    }, 400);
}

// --- PAGE 7 & 8: GALLERIES ---
function nextPhoto() {
    photoIndex = (photoIndex + 1) % photos.length;
    document.getElementById('gallery-img').src = photos[photoIndex];
}
function prevPhoto() {
    photoIndex = (photoIndex - 1 + photos.length) % photos.length;
    document.getElementById('gallery-img').src = photos[photoIndex];
}

function nextGif() {
    gifIndex = (gifIndex + 1) % gifs.length;
    document.getElementById('gif-display').src = gifs[gifIndex];
}
function prevGif() {
    gifIndex = (gifIndex - 1 + gifs.length) % gifs.length;
    document.getElementById('gif-display').src = gifs[gifIndex];
}

// --- PAGE 9: 50 REASONS ---
function initReasons() {
    const container = document.getElementById('reasons-container');
    if(container.children.length > 0) return; // Prevent duplicating cards
    
    for (let i = 1; i <= 50; i++) {
        let card = document.createElement('div');
        card.className = 'reason-card';
        card.innerText = `#${i} Reason ❤️`;
        card.onclick = () => {
            card.innerText = getSweetReason(i);
        };
        container.appendChild(card);
    }
}

function getSweetReason(num) {
    const reasons = ["Always caring!", "Cute smile 😊", "Best listener 🎧", "Super kind 💕", "Pure heart 💖", "Makes me laugh 😂", "Always supportive ✨"];
    return reasons[num % reasons.length];
}

// --- PAGE 10: WHEEL ---
function spinWheel() {
    const wheel = document.getElementById('wheel');
    const randDeg = Math.floor(3600 + Math.random() * 360);
    wheel.style.transform = `rotate(${randDeg}deg)`;
    
    setTimeout(() => {
        document.getElementById('wheel-result').innerText = "Result: 🎉 Best Friend Forever! 💖";
        document.getElementById('wheel-next').classList.remove('hidden');
    }, 4000);
}

// --- PAGE 11: BALLOONS ---
function initBalloonsPage() {
    const area = document.getElementById('balloon-pop-area');
    area.innerHTML = '';
    const wishes = ["Happy Birthday Rimi ❤️", "Stay Blessed 🎂", "Bestie Forever 💕", "Smile Always 😊", "Have a Wonderful Life ✨"];

    for(let i = 0; i < 5; i++) {
        let balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.innerText = '🎈 RIMI';
        balloon.style.left = (i * 18 + 5) + '%';
        balloon.onclick = () => {
            balloon.style.display = 'none';
            document.getElementById('balloon-wish-display').innerText = wishes[i % wishes.length];
        };
        area.appendChild(balloon);
    }
}

// --- PAGE 12: FIREWORKS ---
function triggerFireworksShow() {
    // Visual cue provided by canvas particles falling/exploding
    for(let i=0; i<30; i++) {
        createParticle(window.innerWidth / 2, window.innerHeight / 2);
    }
}

// --- PAGE 13: GIFT BOXES ---
function openGiftBox(num) {
    const messages = {
        1: "💌 Birthday Letter: You deserve all the joy in the universe!",
        2: "📸 Birthday Memories: Thank you for every amazing moment we shared!",
        3: "🎁 Special Surprise: You are officially awarded the Best Bestie of the Century!"
    };
    document.getElementById('gift-modal-text').innerText = messages[num];
    document.getElementById('gift-modal').classList.remove('hidden');
}

function closeGiftModal() {
    document.getElementById('gift-modal').classList.add('hidden');
}

// --- PAGE 16: CINEMA ---
function goToCinema() {
    nextPage(16);
    bgMusic.pause();
    bgMusic.currentTime = 0;

    const video = document.getElementById('birthday-video');
    video.play();

    video.onended = () => {
        document.getElementById('video-end-card').classList.remove('hidden');
    };
}

// --- CANVAS PARTICLE ENGINE ---
let particles = [];
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.02;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    window.addEventListener('click', (e) => {
        for (let i = 0; i < 8; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length < 40) {
            particles.push(new Particle());
        }
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.2) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function createParticle(x, y) {
    window.dispatchEvent(new MouseEvent('click', { clientX: x, clientY: y }));
}
