// --- STATE MANAGEMENT ---
let currentPage = 1;
let collectedGifts = 0;
let candlesBlown = false;
let photoIndex = 0;
let gifIndex = 0;

const photos = [
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg',
    'assets/photo4.jpg',
    'assets/photo5.jpg'
];

const gifs = [
    'assets/gif1.gif',
    'assets/gif2.gif',
    'assets/gif3.gif',
    'assets/gif4.gif',
    'assets/gif5.gif'
];

// --- AUDIO MANAGEMENT ---
const bgMusic = document.getElementById('bg-music');

function enableAudio() {
    bgMusic.play().then(() => {
        document.getElementById('audio-enable-overlay').classList.add('hidden');
    }).catch((err) => {
        console.log("Audio play deferred or blocked:", err);
        document.getElementById('audio-enable-overlay').classList.add('hidden');
    });
}

// --- INITIALIZATION & LOADER ---
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
    }, 35);

    initParticles();
});

// --- OPENING ANIMATION ---
function startOpeningAnimation() {
    enableAudio();
    const openingScreen = document.getElementById('opening');
    const balloonsContainer = document.getElementById('opening-balloons-container');
    
    // Create animated balloons
    for (let i = 0; i < 8; i++) {
        let b = document.createElement('div');
        b.innerHTML = '🎈 RIMI';
        b.style.position = 'absolute';
        b.style.left = (8 + i * 11) + '%';
        b.style.bottom = '-60px';
        b.style.fontSize = '26px';
        b.style.fontWeight = 'bold';
        b.style.transition = 'all 3.5s cubic-bezier(0.25, 1, 0.5, 1)';
        balloonsContainer.appendChild(b);

        setTimeout(() => {
            b.style.bottom = '50%';
            b.style.transform = 'scale(1.2)';
        }, i * 250);

        setTimeout(() => {
            b.style.opacity = '0';
        }, 3600 + (i * 200));
    }

    setTimeout(() => {
        document.getElementById('opening-text').classList.remove('hidden');
    }, 5200);

    setTimeout(() => {
        openingScreen.style.opacity = '0';
        setTimeout(() => {
            openingScreen.classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
            initPage1();
        }, 800);
    }, 8000);
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

// --- PAGE 1: TYPEWRITER ---
function initPage1() {
    const text = "This surprise is specially made for the world's cutest bestie ❤️";
    let index = 0;
    const el = document.getElementById('typing-text');
    el.innerText = '';
    const timer = setInterval(() => {
        el.innerText += text[index];
        index++;
        if (index >= text.length) clearInterval(timer);
    }, 45);
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
                setTimeout(() => nextPage(3), 600);
            }
        };

        area.appendChild(item);
        setTimeout(() => { if(item.parentNode) item.remove(); }, 3000);
    }, 700);
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
    setTimeout(() => nextPage(4), 800);
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
    }, 35);
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
    }, 350);
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
    if (container.children.length > 0) return;
    
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
    const reasons = [
        "Always caring!", "Cute smile 😊", "Best listener 🎧", 
        "Super kind 💕", "Pure heart 💖", "Makes me laugh 😂", 
        "Always supportive ✨", "Truly honest 🌟", "So stylish 👗", "Pure gold 💛"
    ];
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
    const wishes = [
        "Happy Birthday Rimi ❤️", "Stay Blessed 🎂", 
        "Bestie Forever 💕", "Smile Always 😊", "Have a Wonderful Life ✨"
    ];

    for (let i = 0; i < 5; i++) {
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
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            createParticle(
                Math.random() * window.innerWidth, 
                Math.random() * window.innerHeight * 0.6
            );
        }, i * 50);
    }
}

// --- PAGE 13: GIFT BOXES ---
function openGiftBox(num) {
    const messages = {
        1: "💌 Birthday Letter: You deserve all the happiness, laughter, and success in the world!",
        2: "📸 Birthday Memories: Every single moment spent with you is unforgettable!",
        3: "🎁 Special Surprise: You are officially crowned the Best Bestie in the Universe!"
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
    video.play().catch(err => console.log("Video play error:", err));

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
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.05;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    window.addEventListener('click', (e) => {
        for (let i = 0; i < 12; i++) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length < 30) {
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
