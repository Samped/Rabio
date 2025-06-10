// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    { x: 6800, y: canvas.height - 900, width: brickWidth * 6, height: brickHeight * 2 },  // Horizontal part of inverted L
    
    // Fifth section - Challenge structures (Very Hard)
    { x: 7400, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Tallest wall
    { x: 7600, y: canvas.height - 400, width: brickWidth * 3, height: brickHeight * 2 },  // Platform
    { x: 8000, y: canvas.height - 500, width: brickWidth * 2, height: brickHeight * 7 },  // Tall wall
    { x: 8200, y: canvas.height - 300, width: brickWidth * 5, height: brickHeight * 2 },  // Final platform

    // Sixth section - Advanced L-shaped structures (Expert)
    { x: 8600, y: canvas.height - 700, width: brickWidth * 2, height: brickHeight * 9 },  // Vertical part of L
    { x: 8600, y: canvas.height - 700, width: brickWidth * 8, height: brickHeight * 2 },  // Horizontal part of L
    { x: 9200, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Vertical part of inverted L
    { x: 9200, y: canvas.height - 1000, width: brickWidth * 8, height: brickHeight * 2 }, // Horizontal part of inverted L

    // Seventh section - Master structures (Master)
    { x: 9800, y: canvas.height - 500, width: brickWidth * 2, height: brickHeight * 7 },  // Wall
    { x: 10000, y: canvas.height - 300, width: brickWidth * 5, height: brickHeight * 2 }, // Wide platform
    { x: 10400, y: canvas.height - 650, width: brickWidth * 2, height: brickHeight * 9 }, // Super tall wall
    { x: 10600, y: canvas.height - 400, width: brickWidth * 4, height: brickHeight * 2 }, // Platform

    // Eighth section - Ultimate L-shaped structures (Ultimate)
    { x: 11000, y: canvas.height - 750, width: brickWidth * 2, height: brickHeight * 10 }, // Vertical part of L
    { x: 11000, y: canvas.height - 750, width: brickWidth * 10, height: brickHeight * 2 }, // Horizontal part of L
    { x: 11600, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Vertical part of inverted L
    { x: 11600, y: canvas.height - 1100, width: brickWidth * 10, height: brickHeight * 2 }, // Horizontal part of inverted L

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
    { x: 17900, y: canvas.height - 650, width: brickWidth * 5, height: brickHeight * 2 },  // Third island
    { x: 18500, y: canvas.height - 750, width: brickWidth * 5, height: brickHeight * 2 },  // Fourth island

    // Thirteenth section - Complex L-shapes (Master)
    { x: 18900, y: canvas.height - 500, width: brickWidth * 2, height: brickHeight * 8 },  // Vertical part of L
    { x: 18900, y: canvas.height - 500, width: brickWidth * 6, height: brickHeight * 2 },  // Horizontal part of L
    { x: 19500, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 9 },  // Vertical part of inverted L
    { x: 19500, y: canvas.height - 1000, width: brickWidth * 6, height: brickHeight * 2 }, // Horizontal part of inverted L

    // Fourteenth section - Mixed challenges (Ultimate)
    { x: 20100, y: canvas.height - 700, width: brickWidth * 2, height: brickHeight * 10 }, // Tall wall
    { x: 20300, y: canvas.height - 400, width: brickWidth * 4, height: brickHeight * 2 },  // Platform
    { x: 20700, y: canvas.height - 600, width: brickWidth * 2, height: brickHeight * 8 },  // Wall
    { x: 20900, y: canvas.height - 300, width: brickWidth * 6, height: brickHeight * 2 },  // Wide platform

    // Fifteenth section - Final challenge (Legendary)
    { x: 21300, y: canvas.height - 800, width: brickWidth * 2, height: brickHeight * 11 }, // Super tall wall
    { x: 21500, y: canvas.height - 500, width: brickWidth * 5, height: brickHeight * 2 },  // Platform
    { x: 21900, y: canvas.height - 700, width: brickWidth * 2, height: brickHeight * 9 },  // Tall wall
    { x: 22100, y: canvas.height - 400, width: brickWidth * 7, height: brickHeight * 2 },  // Final platform
];

// Player properties
const player = {
    x: 100,
    y: canvas.height - groundHeight - 50, // Position above ground
    width: 100,
    height: 100,
    velocityX: 0,
    velocityY: 0,
    speed: 8,
    jumpForce: -25,  // Increased from -15 to -25 for higher jumps
    gravity: 0.8,
    isJumping: false,
    isMovingLeft: false,
    isMovingRight: false,
    facingRight: true, // Track which direction the player is facing
    jumpCount: 0, // Track number of jumps
    lastSpacePress: 0 // Track last space press time
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

// Update player
function updatePlayer() {
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
}

// Game loop
function gameLoop() {
    updatePlayer();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
