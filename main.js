// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 1920;
canvas.height = 1080;

// Load images
const playerImage = new Image();
playerImage.src = 'assets/player.png';

const coinImage = new Image();
coinImage.src = 'assets/gain/inco.png';

const gunEnemyImage = new Image();
gunEnemyImage.src = 'assets/enemies/gun.png';

const incoEnemyImage = new Image();
incoEnemyImage.src = 'assets/enemies/inco-enemy.png';

const backgroundImage = new Image();
backgroundImage.src = 'assets/background.png';

// Wait for images to load
let imagesLoaded = 0;
const totalImages = 5;  // Updated to include both enemy images

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        // Start game loop only after all images are loaded
        initGame();
    }
}

playerImage.onload = imageLoaded;
coinImage.onload = imageLoaded;
gunEnemyImage.onload = imageLoaded;
incoEnemyImage.onload = imageLoaded;
backgroundImage.onload = imageLoaded;

// Load character image
const rabio = new Image();
rabio.src = 'assets/characters/rabio.png';

// Add image loading verification
rabio.onload = function() {
    console.log('Character image loaded successfully');
};

rabio.onerror = function() {
    console.error('Error loading character image');
};

// Brick properties
const brickWidth = 60;    // Width of each brick
const brickHeight = 27;   // Height of each brick
const groundHeight = brickHeight * 2;  // Height of the ground platform (2 rows)

// Platform positions
const platforms = [
    // Initial ground platform
    { x: -100, y: canvas.height - groundHeight, width: 1000, height: groundHeight },
    
    // First section - Normal platforms (Easy)
    { x: 400, y: canvas.height - 100, width: brickWidth * 4, height: brickHeight * 2 },   // Low platform
    { x: 800, y: canvas.height - 550, width: brickWidth * 6, height: brickHeight * 3 },   // Mid-high platform
    { x: 1200, y: canvas.height - 150, width: brickWidth * 5, height: brickHeight * 2 },  // Mid platform
    { x: 1600, y: canvas.height - 400, width: brickWidth * 4, height: brickHeight * 2 },  // High platform
    { x: 2000, y: canvas.height - 200, width: brickWidth * 3, height: brickHeight * 2 },  // Mid platform
    { x: 2400, y: canvas.height - 350, width: brickWidth * 5, height: brickHeight * 2 },  // Highest platform
    { x: 3200, y: canvas.height - 280, width: brickWidth * 3, height: brickHeight * 2 },  // High platform
    
    // Ground platforms with gaps
    { x: 3500, y: canvas.height - groundHeight, width: 800, height: groundHeight },       // Ground platform 1
    { x: 4500, y: canvas.height - groundHeight, width: 600, height: groundHeight },       // Ground platform 2
    { x: 5300, y: canvas.height - groundHeight, width: 1000, height: groundHeight },      // Ground platform 3
    { x: 6500, y: canvas.height - groundHeight, width: 700, height: groundHeight },       // Ground platform 4
    { x: 7400, y: canvas.height - groundHeight, width: 900, height: groundHeight },       // Ground platform 5
    { x: 8500, y: canvas.height - groundHeight, width: 800, height: groundHeight },       // Ground platform 6
    { x: 9500, y: canvas.height - groundHeight, width: 600, height: groundHeight },       // Ground platform 7
    { x: 10300, y: canvas.height - groundHeight, width: 1000, height: groundHeight },     // Ground platform 8
    { x: 11500, y: canvas.height - groundHeight, width: 700, height: groundHeight },      // Ground platform 9
    { x: 12400, y: canvas.height - groundHeight, width: 900, height: groundHeight },      // Ground platform 10
    { x: 13500, y: canvas.height - groundHeight, width: 800, height: groundHeight },      // Ground platform 11

    // Second section - L-shaped structures (Medium)
    { x: 3600, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Vertical part of L
    { x: 3600, y: canvas.height - 600, width: brickWidth * 4, height: brickHeight * 2 },  // Horizontal part of L
    { x: 4200, y: canvas.height - 400, width: brickWidth * 2, height: brickHeight * 6 },  // Vertical part of inverted L
    { x: 4200, y: canvas.height - 800, width: brickWidth * 4, height: brickHeight * 2 },  // Horizontal part of inverted L
    
    // Third section - Mixed structures (Medium-Hard)
    { x: 4800, y: canvas.height - 450, width: brickWidth * 3, height: brickHeight * 4 },  // Medium wall
    { x: 5100, y: canvas.height - 350, width: brickWidth * 5, height: brickHeight * 2 },  // Wide platform
    { x: 5600, y: canvas.height - 550, width: brickWidth * 2, height: brickHeight * 7 },  // Tall wall
    { x: 5800, y: canvas.height - 200, width: brickWidth * 4, height: brickHeight * 2 },  // Low platform
    
    // Fourth section - Complex L-shaped structures (Hard)
    { x: 6200, y: canvas.height - 400, width: brickWidth * 2, height: brickHeight * 5 },  // Vertical part of L
    { x: 6200, y: canvas.height - 400, width: brickWidth * 6, height: brickHeight * 2 },  // Horizontal part of L
    { x: 6800, y: canvas.height - 500, width: brickWidth * 2, height: brickHeight * 6 },  // Vertical part of inverted L
    { x: 6800, y: canvas.height - 600, width: brickWidth * 6, height: brickHeight * 2 },  // Horizontal part of inverted L
    
    // Fifth section - Challenge structures (Very Hard)
    { x: 7400, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Tallest wall
    { x: 7600, y: canvas.height - 400, width: brickWidth * 3, height: brickHeight * 2 },  // Platform
    { x: 8000, y: canvas.height - 500, width: brickWidth * 2, height: brickHeight * 7 },  // Tall wall
    { x: 8200, y: canvas.height - 300, width: brickWidth * 5, height: brickHeight * 2 },  // Final platform

    // Sixth section - Advanced L-shaped structures (Expert)
    { x: 8600, y: canvas.height - 700, width: brickWidth * 2, height: brickHeight * 9 },  // Vertical part of L
    { x: 8600, y: canvas.height - 200, width: brickWidth * 8, height: brickHeight * 2 },  // Horizontal part of L
    { x: 9200, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Vertical part of inverted L
    { x: 9200, y: canvas.height - 400, width: brickWidth * 8, height: brickHeight * 2 }, // Horizontal part of inverted L

    // Seventh section - Master structures (Master)
    { x: 9800, y: canvas.height - 500, width: brickWidth * 2, height: brickHeight * 7 },  // Wall
    { x: 10000, y: canvas.height - 300, width: brickWidth * 5, height: brickHeight * 2 }, // Wide platform
    { x: 10400, y: canvas.height - 650, width: brickWidth * 2, height: brickHeight * 9 }, // Super tall wall
    { x: 10600, y: canvas.height - 400, width: brickWidth * 4, height: brickHeight * 2 }, // Platform

    // Eighth section - Ultimate L-shaped structures (Ultimate)
    { x: 11000, y: canvas.height - 450, width: brickWidth * 2, height: brickHeight * 10 }, // Vertical part of L
    { x: 11000, y: canvas.height - 550, width: brickWidth * 10, height: brickHeight * 2 }, // Horizontal part of L
    { x: 11600, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Vertical part of inverted L
    { x: 11600, y: canvas.height - 500, width: brickWidth * 10, height: brickHeight * 2 }, // Horizontal part of inverted L

    // Ninth section - Final challenge (Final)
    { x: 12200, y: canvas.height - 700, width: brickWidth * 2, height: brickHeight * 9 },  // Wall
    { x: 12400, y: canvas.height - 450, width: brickWidth * 4, height: brickHeight * 2 },  // Platform
    { x: 12800, y: canvas.height - 550, width: brickWidth * 2, height: brickHeight * 7 },  // Wall
    { x: 13000, y: canvas.height - 300, width: brickWidth * 6, height: brickHeight * 2 },  // Final platform

    // New sections - Additional 15 frames
    // Tenth section - Zigzag platforms (Advanced)
    { x: 13500, y: canvas.height - 400, width: brickWidth * 3, height: brickHeight * 2 },  // Low platform
    { x: 13900, y: canvas.height - 600, width: brickWidth * 3, height: brickHeight * 2 },  // High platform
    { x: 14300, y: canvas.height - 400, width: brickWidth * 3, height: brickHeight * 2 },  // Low platform
    { x: 14700, y: canvas.height - 600, width: brickWidth * 3, height: brickHeight * 2 },  // High platform

    // Eleventh section - Staircase (Advanced)
    { x: 15100, y: canvas.height - 300, width: brickWidth * 4, height: brickHeight * 2 },  // First step
    { x: 15500, y: canvas.height - 400, width: brickWidth * 4, height: brickHeight * 2 },  // Second step
    { x: 15900, y: canvas.height - 500, width: brickWidth * 4, height: brickHeight * 2 },  // Third step
    { x: 16300, y: canvas.height - 600, width: brickWidth * 4, height: brickHeight * 2 },  // Fourth step

    // Twelfth section - Floating islands (Expert)
    { x: 16700, y: canvas.height - 450, width: brickWidth * 5, height: brickHeight * 2 },  // First island
    { x: 17300, y: canvas.height - 550, width: brickWidth * 5, height: brickHeight * 2 },  // Second island
    { x: 17900, y: canvas.height - 250, width: brickWidth * 5, height: brickHeight * 2 },  // Third island
    { x: 18500, y: canvas.height - 350, width: brickWidth * 5, height: brickHeight * 2 },  // Fourth island

    // Thirteenth section - Complex L-shapes (Master)
    { x: 18900, y: canvas.height - 500, width: brickWidth * 2, height: brickHeight * 8 },  // Vertical part of L
    { x: 18900, y: canvas.height - 500, width: brickWidth * 6, height: brickHeight * 2 },  // Horizontal part of L
    { x: 19500, y: canvas.height - 350, width: brickWidth * 2, height: brickHeight * 9 },  // Vertical part of inverted L
    { x: 19500, y: canvas.height - 400, width: brickWidth * 6, height: brickHeight * 2 }, // Horizontal part of inverted L

    // Fourteenth section - Mixed challenges (Ultimate)
    { x: 20100, y: canvas.height - 300, width: brickWidth * 2, height: brickHeight * 10 }, // Tall wall
    { x: 20300, y: canvas.height - 400, width: brickWidth * 4, height: brickHeight * 2 },  // Platform
    { x: 20700, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Wall
    { x: 20900, y: canvas.height - 300, width: brickWidth * 6, height: brickHeight * 2 },  // Wide platform

    // Fifteenth section - Final challenge (Legendary)
    { x: 21300, y: canvas.height - 350, width: brickWidth * 2, height: brickHeight * 11 }, // Super tall wall
    { x: 21500, y: canvas.height - 500, width: brickWidth * 5, height: brickHeight * 2 },  // Platform
    { x: 21900, y: canvas.height - 300, width: brickWidth * 2, height: brickHeight * 9 },  // Tall wall
    { x: 22100, y: canvas.height - 400, width: brickWidth * 7, height: brickHeight * 2 },
    { x: 22100, y: canvas.height - 50, width: brickWidth * 7, height: brickHeight * 2 },  // Final platform
];

// Coin properties
const coins = [];
const coinSize = 40;  // Reduced from 60 to 40
const coinColor = '#FFD700';  // Gold color
let coinFlip = 0;  // Track flip angle

// Create coins
function createCoins() {
    // First section coins (Easy)
    coins.push({ x: 400, y: canvas.height - 150 - coinSize, width: coinSize, height: coinSize, collected: false });  // Above low platform
    coins.push({ x: 800, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });  // Above mid-high platform
    coins.push({ x: 1200, y: canvas.height - 200 - coinSize, width: coinSize, height: coinSize, collected: false }); // Above mid platform
    coins.push({ x: 1600, y: canvas.height - 450 - coinSize, width: coinSize, height: coinSize, collected: false }); // Above high platform
    
    // Second section coins (Medium)
    coins.push({ x: 2000, y: canvas.height - 250 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 2200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 2400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Third section coins (Hard)
    coins.push({ x: 3000, y: canvas.height - 250 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 3200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 3400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Fourth section coins (Expert)
    coins.push({ x: 4000, y: canvas.height - 250 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 4200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 4400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Fifth section coins (Master)
    coins.push({ x: 5000, y: canvas.height - 250 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 5200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 5400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Sixth section coins (Ultimate)
    coins.push({ x: 6000, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 6200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 6200, y: canvas.height - 750 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Seventh section coins (Legendary)
    coins.push({ x: 7000, y: canvas.height - 250 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 7200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 7400, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Eighth section coins (Mythic)
    coins.push({ x: 8000, y: canvas.height - 250 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 8200, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 8400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Ninth section coins (Divine)
    coins.push({ x: 9000, y: canvas.height - 250 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 9200, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 9400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Tenth section coins (Celestial)
    coins.push({ x: 10000, y: canvas.height - 350 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 10200, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 10400, y: canvas.height - 750 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Eleventh section coins (Cosmic)
    coins.push({ x: 11000, y: canvas.height - 100 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 11200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 11400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Twelfth section coins (Infinite)
    coins.push({ x: 12000, y: canvas.height - 150 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 12200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 12400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Thirteenth section coins (Eternal)
    coins.push({ x: 13000, y: canvas.height - 350 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 13200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 13400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Fourteenth section coins (Immortal)
    coins.push({ x: 14000, y: canvas.height - 350 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 14200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 14400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Fifteenth section coins (Final)
    coins.push({ x: 15000, y: canvas.height - 300 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 15200, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 15400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Additional coins for more coverage
    // Ground level coins
    coins.push({ x: 100, y: canvas.height - 100 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 300, y: canvas.height - 100 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 500, y: canvas.height - 100 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Platform coins
    coins.push({ x: 1800, y: canvas.height - 300 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 2600, y: canvas.height - 450 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 3800, y: canvas.height - 350 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // High platform coins
    coins.push({ x: 4600, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 5800, y: canvas.height - 500 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 6600, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Final section coins
    coins.push({ x: 15800, y: canvas.height - 300 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 16000, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 16200, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    
    // Additional coins for the end game - placed higher above platforms
    coins.push({ x: 16600, y: canvas.height - 450 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 16800, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 17000, y: canvas.height - 750 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 17200, y: canvas.height - 500 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 17400, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 17600, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 17800, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 18000, y: canvas.height - 700 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 18200, y: canvas.height - 450 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 18400, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 18600, y: canvas.height - 750 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 18800, y: canvas.height - 500 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 19000, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 19200, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 19400, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 19600, y: canvas.height - 700 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 19800, y: canvas.height - 450 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 20000, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 20200, y: canvas.height - 750 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 20400, y: canvas.height - 500 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 20600, y: canvas.height - 650 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 20800, y: canvas.height - 400 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 21000, y: canvas.height - 550 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 21200, y: canvas.height - 700 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 21400, y: canvas.height - 450 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 21600, y: canvas.height - 600 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 21800, y: canvas.height - 750 - coinSize, width: coinSize, height: coinSize, collected: false });
    coins.push({ x: 22000, y: canvas.height - 500 - coinSize, width: coinSize, height: coinSize, collected: false });
}

// Player properties
const player = {
    x: 100,
    y: canvas.height - groundHeight - 50,
    width: 100,
    height: 100,
    velocityX: 0,
    velocityY: 0,
    speed: 8,
    jumpForce: -25,
    gravity: 0.8,
    isJumping: false,
    isMovingLeft: false,
    isMovingRight: false,
    facingRight: true,
    jumpCount: 0,
    lastSpacePress: 0,
    isDead: false,
    score: 0,
    lives: 3,  // Number of lives
    deaths: 0  // Track number of deaths
};

// Input handling
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    Space: false
};

// Double jump timing
const DOUBLE_JUMP_WINDOW = 300; // Time window for double jump in milliseconds

// Event listeners for keyboard
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        const currentTime = Date.now();
        if (currentTime - player.lastSpacePress < DOUBLE_JUMP_WINDOW && player.jumpCount < 2) {
            // Double jump
            player.velocityY = player.jumpForce;
            player.jumpCount = 2;
        } else if (player.jumpCount === 0) {
            // First jump
            player.velocityY = player.jumpForce;
            player.isJumping = true;
            player.jumpCount = 1;
        }
        player.lastSpacePress = currentTime;
    }
    
    if (e.code in keys) {
        keys[e.code] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code in keys) {
        keys[e.code] = false;
    }
});

// Check collision with platforms
function checkPlatformCollision() {
    let onPlatform = false;
    
    for (const platform of platforms) {
        // Check if player is colliding with platform
        if (player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height) {
            
            // Calculate overlap on each side
            const overlapLeft = (player.x + player.width) - platform.x;
            const overlapRight = (platform.x + platform.width) - player.x;
            const overlapTop = (player.y + player.height) - platform.y;
            const overlapBottom = (platform.y + platform.height) - player.y;
            
            // Find the smallest overlap
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            
            // Resolve collision based on the smallest overlap
            if (minOverlap === overlapTop && player.velocityY > 0) {
                // Landing on top of platform
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isJumping = false;
                player.jumpCount = 0;
                onPlatform = true;
            } else if (minOverlap === overlapBottom && player.velocityY < 0) {
                // Hitting bottom of platform
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            } else if (minOverlap === overlapLeft && player.velocityX > 0) {
                // Hitting right side of platform
                player.x = platform.x - player.width;
                player.velocityX = 0;
            } else if (minOverlap === overlapRight && player.velocityX < 0) {
                // Hitting left side of platform
                player.x = platform.x + platform.width;
                player.velocityX = 0;
            }
        }
    }
    
    // If not on any platform, player is falling
    if (!onPlatform && player.velocityY > 0) {
        player.isJumping = true;
    }
}

// Camera properties
const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

// Update camera position
function updateCamera() {
    // Center camera on player with some offset
    const targetX = player.x - canvas.width * 0.3;
    camera.x = Math.max(0, targetX);
}

// Check if player is dead
function checkPlayerDeath() {
    if (player.y > canvas.height + 100) {  // Player has fallen off the screen
        player.deaths++;  // Increment death count
        if (player.deaths >= 3) {
            // Game over - reset everything
            resetGame();
        } else {
            // Reset player position
            resetPlayer();
        }
    }
}

// Reset player position
function resetPlayer() {
    player.x = 100;
    player.y = canvas.height - groundHeight - 50;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isDead = false;
}

// Reset game
function resetGame() {
    resetPlayer();
    player.deaths = 0;
    player.score = 0;
    // Reset all coins
    for (const coin of coins) {
        coin.collected = false;
    }
}

// Check coin collection
function checkCoinCollection() {
    for (const coin of coins) {
        if (!coin.collected && 
            player.x + player.width > coin.x &&
            player.x < coin.x + coin.width &&
            player.y + player.height > coin.y &&
            player.y < coin.y + coin.height) {
            coin.collected = true;
            player.score += 2;  // Changed from 50 to 2 points per coin
        }
    }
}

// Draw coins
function drawCoins() {
    for (const coin of coins) {
        if (!coin.collected) {
            // Save the current context state
            ctx.save();
            
            // Move to coin's center
            ctx.translate(coin.x + coin.width/2, coin.y + coin.height/2);
            
            // Flip the coin (rotate around X axis)
            ctx.rotate(coinFlip);
            
            // Scale to create flip effect
            const scale = Math.abs(Math.cos(coinFlip));
            ctx.scale(1, scale);
            
            // Draw the coin image centered
            ctx.drawImage(coinImage, -coin.width/2, -coin.height/2, coin.width, coin.height);
            
            // Restore the context state
            ctx.restore();
        }
    }
    
    // Update flip angle
    coinFlip += 0.1;  // Adjust speed of flip
    if (coinFlip >= Math.PI * 2) {
        coinFlip = 0;  // Reset flip when it completes a full cycle
    }
}

// Draw score
function drawScore() {
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${player.score}`, 20, 40);
    ctx.restore();
}

// Update player
function updatePlayer() {
    if (player.isDead) return;

    // Handle horizontal movement
    if (keys.ArrowLeft) {
        player.velocityX = -player.speed;
        player.facingRight = false;
    } else if (keys.ArrowRight) {
        player.velocityX = player.speed;
        player.facingRight = true;
    } else {
        player.velocityX = 0;
    }

    // Apply gravity
    player.velocityY += player.gravity;

    // Update position
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Check for collisions
    checkPlatformCollision();
    
    // Check for coin collection
    checkCoinCollection();
    
    // Check for death
    checkPlayerDeath();
    
    // Update camera
    updateCamera();

    // Screen boundaries (only for vertical movement)
    if (player.y < 0) {
        player.y = 0;
        player.velocityY = 0;
    }
}

// Draw a single fine brick with gradient, outline, and mortar
function drawFineBrick(x, y, width, height) {
    // Brick gradient
    const brickGradient = ctx.createLinearGradient(x, y, x, y + height);
    brickGradient.addColorStop(0, '#b22222');  // Classic brick red top
    brickGradient.addColorStop(0.5, '#8B0000'); // Darker red middle
    brickGradient.addColorStop(1, '#800000');   // Deep red bottom
    ctx.fillStyle = brickGradient;
    ctx.fillRect(x, y, width, height);

    // Add highlight (subtle)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(x, y, width, height/3);

    // Mortar lines (top and left)
    ctx.strokeStyle = '#f5f5f5'; // Light gray for mortar
    ctx.lineWidth = 1; // Thinner mortar lines
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x + width, y); // Top
    ctx.moveTo(x, y); ctx.lineTo(x, y + height); // Left
    ctx.stroke();

    // Brick outline (right and bottom)
    ctx.strokeStyle = '#8B0000'; // Dark red for outline
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + width, y); ctx.lineTo(x + width, y + height); // Right
    ctx.moveTo(x, y + height); ctx.lineTo(x + width, y + height); // Bottom
    ctx.stroke();
}

// Draw platforms
function drawPlatforms() {
    for (const platform of platforms) {
        const bricksPerRow = Math.ceil(platform.width / brickWidth);
        const rows = Math.ceil(platform.height / brickHeight);
        
        for (let row = 0; row < rows; row++) {
            // Stagger every other row
            const offset = (row % 2) * (brickWidth / 2);
            for (let col = 0; col < bricksPerRow; col++) {
                const x = platform.x + (col * brickWidth) - offset;
                const y = platform.y + (row * brickHeight);
                drawFineBrick(x, y, brickWidth, brickHeight);
            }
        }
    }
}

// Draw dashboard
function drawDashboard() {
    ctx.save();
    
    // Draw dashboard background with transparency
    ctx.fillStyle = 'rgba(44, 62, 80, 0.2)';
    ctx.fillRect(20, 20, 360, 70);  // Reverted back to original size
    
    // Draw RABIO with fun font
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px "Comic Sans MS"';
    ctx.textAlign = 'center';
    ctx.fillText('RABIO', 200, 40);  // Reverted x position
    
    // Draw coin and score
    ctx.beginPath();
    ctx.arc(200, 75, 15, 0, Math.PI * 2);  // Reverted x position
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    
    // Draw shine
    ctx.beginPath();
    ctx.arc(195, 70, 5, 0, Math.PI * 2);  // Reverted x position
    ctx.fillStyle = '#FFF8DC';
    ctx.fill();
    
    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px "Comic Sans MS"';
    ctx.fillText(`${player.score}`, 230, 80);  // Reverted x position
    
    ctx.restore();
}

// Draw stars at top of game
function drawStars() {
    ctx.save();
    
    function drawStar(x, y, size, color) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(x + size * Math.cos((18 + i * 72) * Math.PI / 180),
                      y + size * Math.sin((18 + i * 72) * Math.PI / 180));
            ctx.lineTo(x + size/2 * Math.cos((54 + i * 72) * Math.PI / 180),
                      y + size/2 * Math.sin((54 + i * 72) * Math.PI / 180));
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // Draw three stars at top of game with reduced size
    // First star - red if no deaths, gray if 1+ deaths
    drawStar(canvas.width/2 - 40, 25, 15, player.deaths >= 1 ? '#808080' : '#ff0000');
    // Second star - red if 0-1 deaths, gray if 2+ deaths
    drawStar(canvas.width/2, 25, 15, player.deaths >= 2 ? '#808080' : '#ff0000');
    // Third star - red if 0-2 deaths, gray if 3 deaths
    drawStar(canvas.width/2 + 40, 25, 15, player.deaths >= 3 ? '#808080' : '#ff0000');
    
    ctx.restore();
}

// Add restart key handler
window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR' && player.isDead) {
        resetGame();
    }
});

// Bullet properties
const bullets = [];
const bulletSpeed = 3;  // Reduced speed
const bulletRadius = 5;
const bulletColor = '#000000';  // Changed to black
const bulletMaxDistance = 400;  // Doubled maximum distance bullets can travel

// Enemy properties
const enemies = [
    // First section enemies (Easy)
    { x: 800, y: canvas.height - 600 - 100, width: 100, height: 100, speed: 2, direction: 1, startX: 800, endX: 1000, platformY: canvas.height - 600 - 100, lastShot: 0, shootDelay: 2000, type: 'inco' },  // On mid-high platform
    { x: 7200, y: canvas.height - 200 - 100, width: 100, height: 100, speed: 2, direction: 1, startX: 1200, endX: 1400, platformY: canvas.height - 200 - 100, lastShot: 0, shootDelay: 2000, type: 'gun' }, // On mid platform
    { x: 8600, y: canvas.height - 450 - 100, width: 100, height: 100, speed: 2, direction: 1, startX: 1600, endX: 1800, platformY: canvas.height - 450 - 100, lastShot: 0, shootDelay: 2000, type: 'inco' }, // On high platform
    
    // L-shaped section enemies (Medium) // On horizontal part of L
    { x: 3700, y: canvas.height - 600 - 100, width: 100, height: 100, speed: 3, direction: 1, startX: 3700, endX: 3900, platformY: canvas.height - 600 - 100, lastShot: 0, shootDelay: 2000, type: 'inco' },  // On horizontal part of L

    // Mixed structures enemies (Hard)
    { x: 5600, y: canvas.height - 450 - 200, width: 100, height: 100, speed: 3, direction: 1, startX: 5600, endX: 5800, platformY: canvas.height - 450 - 200, lastShot: 0, shootDelay: 2000, type: 'inco' },  // On wide platform

    // Complex L-shaped enemies (Expert)
    { x: 6200, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: 1, startX: 6200, endX: 6800, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'gun' },  // On horizontal part of L
    { x: 6400, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: -1, startX: 6400, endX: 6200, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'inco' },  // On horizontal part of L
    { x: 6600, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: 1, startX: 6600, endX: 7000, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'gun' },  // On horizontal part of L
    { x: 7000, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: 1, startX: 7000, endX: 7400, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'gun' },  // On horizontal part of L

    // Challenge structures enemies (Master)
    { x: 7600, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: -1, startX: 7600, endX: 7900, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'gun' },  // On platform
    { x: 7800, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: 1, startX: 7800, endX: 8200, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'inco' },  // On platform
    { x: 8000, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: -1, startX: 8000, endX: 7800, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'gun' },  // On platform
    { x: 8200, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: 1, startX: 8200, endX: 8600, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'inco' },  // On platform
    { x: 8400, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: -1, startX: 8400, endX: 8200, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'gun' },  // On platform
    { x: 8600, y: canvas.height - 400 - 100, width: 100, height: 100, speed: 4, direction: 1, startX: 8600, endX: 9000, platformY: canvas.height - 400 - 100, lastShot: 0, shootDelay: 2000, type: 'inco' },  // On platform
];

// Draw bullets
function drawBullets() {
    ctx.save();
    ctx.fillStyle = bulletColor;
    for (const bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

// Update enemies
function updateEnemies() {
    const currentTime = Date.now();
    
    for (const enemy of enemies) {
        // Move enemy horizontally
        enemy.x += enemy.speed * enemy.direction;
        
        // Apply gravity to enemies
        enemy.y += 0.8; // Same gravity as player
        
        // Check collision with platforms
        let onPlatform = false;
        for (const platform of platforms) {
            // Check if enemy is colliding with platform
            if (enemy.x + enemy.width > platform.x &&
                enemy.x < platform.x + platform.width &&
                enemy.y + enemy.height > platform.y &&
                enemy.y < platform.y + platform.height) {
                
                // Calculate overlap on each side
                const overlapLeft = (enemy.x + enemy.width) - platform.x;
                const overlapRight = (platform.x + platform.width) - enemy.x;
                const overlapTop = (enemy.y + enemy.height) - platform.y;
                const overlapBottom = (platform.y + platform.height) - enemy.y;
                
                // Find the smallest overlap
                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
                
                // Resolve collision based on the smallest overlap
                if (minOverlap === overlapTop && enemy.y < platform.y) {
                    // Landing on top of platform
                    enemy.y = platform.y - enemy.height;
                    onPlatform = true;
                } else if (minOverlap === overlapBottom && enemy.y > platform.y) {
                    // Hitting bottom of platform
                    enemy.y = platform.y + platform.height;
                } else if (minOverlap === overlapLeft && enemy.x < platform.x) {
                    // Hitting right side of platform
                    enemy.x = platform.x - enemy.width;
                    enemy.direction *= -1; // Change direction when hitting wall
                } else if (minOverlap === overlapRight && enemy.x > platform.x) {
                    // Hitting left side of platform
                    enemy.x = platform.x + platform.width;
                    enemy.direction *= -1; // Change direction when hitting wall
                }
            }
        }
        
        // Change direction at patrol boundaries
        if (enemy.x <= enemy.startX || enemy.x >= enemy.endX) {
            enemy.direction *= -1;
        }
        
        // Shooting logic
        if (currentTime - enemy.lastShot > enemy.shootDelay) {
            // Create new bullet
            bullets.push({
                x: enemy.x + (enemy.direction > 0 ? enemy.width : 0),
                y: enemy.y + enemy.height / 2,
                direction: enemy.direction,
                radius: bulletRadius,
                startX: enemy.x + (enemy.direction > 0 ? enemy.width : 0)  // Store starting position
            });
            enemy.lastShot = currentTime;
        }
        
        // Check collision with player
        if (player.x + player.width > enemy.x &&
            player.x < enemy.x + enemy.width &&
            player.y + player.height > enemy.y &&
            player.y < enemy.y + enemy.height) {
            // Player dies when touching enemy
            player.deaths++;
            if (player.deaths >= 3) {
                resetGame();
            } else {
                resetPlayer();
            }
        }
    }
    
    // Update bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.x += bulletSpeed * bullet.direction;
        
        // Remove bullets that have traveled too far
        const distanceTraveled = Math.abs(bullet.x - bullet.startX);
        if (distanceTraveled > bulletMaxDistance) {
            bullets.splice(i, 1);
            continue;
        }
        
        // Check bullet collision with player
        if (player.x + player.width > bullet.x - bullet.radius &&
            player.x < bullet.x + bullet.radius &&
            player.y + player.height > bullet.y - bullet.radius &&
            player.y < bullet.y + bullet.radius) {
            // Player dies when hit by bullet
            player.deaths++;
            if (player.deaths >= 3) {
                resetGame();
            } else {
                resetPlayer();
            }
            bullets.splice(i, 1);
        }
    }
}

// Draw enemies and bullets
function drawEnemies() {
    // Draw bullets
    drawBullets();
    
    // Draw enemies
    for (const enemy of enemies) {
        if (enemy.type === 'gun') {
            // Draw gun enemy with flipping
            ctx.save();
            if (enemy.direction < 0) {
                ctx.translate(enemy.x + enemy.width, enemy.y);
                ctx.scale(-1, 1);
                ctx.drawImage(gunEnemyImage, 0, 0, enemy.width, enemy.height);
            } else {
                ctx.drawImage(gunEnemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
            }
            ctx.restore();
        } else {
            // Draw inco enemy
            ctx.drawImage(incoEnemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
        }
    }
}

// Update function
function update() {
    // Update player
    updatePlayer();
    
    // Update camera
    updateCamera();
    
    // Update enemies
    updateEnemies();
    
    // Check coin collection
    checkCoinCollection();
    
    // Check if player is dead
    checkPlayerDeath();
}

// Draw function
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save the current context state
    ctx.save();
    
    // Apply camera offset
    ctx.translate(-camera.x, 0);
    
    // Draw background
    ctx.fillStyle = '#E0F7FF';
    ctx.fillRect(camera.x, 0, canvas.width, canvas.height);
    
    // Draw platforms
    drawPlatforms();
    
    // Draw coins
    drawCoins();
    
    // Draw enemies
    drawEnemies();
    
    // Draw player if image is loaded
    if (rabio.complete) {
        ctx.save();
        
        if (!player.facingRight) {
            // Flip horizontally when facing left
            ctx.translate(player.x + player.width, player.y);
            ctx.scale(-1, 1);
            ctx.drawImage(rabio, 0, 0, player.width, player.height);
        } else {
            // Draw normally when facing right
            ctx.drawImage(rabio, player.x, player.y, player.width, player.height);
        }
        
        ctx.restore();
    }
    
    // Restore the context state
    ctx.restore();
    
    // Draw dashboard (not affected by camera)
    drawDashboard();
    
    // Draw stars at top (not affected by camera)
    drawStars();
}

// Initialize game
function initGame() {
    createCoins();  // Create coins
    resetPlayer();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
initGame();  // Initialize game first
gameLoop();  // Then start the game loop
