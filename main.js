// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load character image
const rabio = new Image();
rabio.src = 'assets/character/rabio.png';

// Brick properties
const brickWidth = 60;    // Width of each brick
const brickHeight = 30;   // Height of each brick
const groundHeight = brickHeight * 2;  // Height of the ground platform (2 rows)

// Player properties
const player = {
    x: 100,
    y: canvas.height - groundHeight - 50, // Position above ground
    width: 50,
    height: 50
};

// Draw a single fine brick with gradient, outline, and mortar
function drawFineBrick(x, y, width, height) {
    // Brick gradient
    const brickGradient = ctx.createLinearGradient(x, y, x, y + height);
    brickGradient.addColorStop(0, '#f0c090');  // Lighter, warmer top
    brickGradient.addColorStop(0.5, '#e2a76f'); // Middle tone
    brickGradient.addColorStop(1, '#c17a3a');   // Darker bottom
    ctx.fillStyle = brickGradient;
    ctx.fillRect(x, y, width, height);

    // Add highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(x, y, width, height/3);

    // Mortar lines (top and left)
    ctx.strokeStyle = '#f5f5f5'; // Light gray for mortar
    ctx.lineWidth = 1; // Thinner mortar lines
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x + width, y); // Top
    ctx.moveTo(x, y); ctx.lineTo(x, y + height); // Left
    ctx.stroke();

    // Brick outline (right and bottom)
    ctx.strokeStyle = '#8B4513'; // Darker brown for outline
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + width, y); ctx.lineTo(x + width, y + height); // Right
    ctx.moveTo(x, y + height); ctx.lineTo(x + width, y + height); // Bottom
    ctx.stroke();
}

// Draw ground platform with staggered rows
function drawGround() {
    const rows = Math.ceil(groundHeight / brickHeight);
    const bricksPerRow = Math.ceil(canvas.width / brickWidth) + 1;
    for (let row = 0; row < rows; row++) {
        // Stagger every other row
        const offset = (row % 2) * (brickWidth / 2);
        for (let col = 0; col < bricksPerRow; col++) {
            const x = col * brickWidth - offset;
            const y = canvas.height - groundHeight + (row * brickHeight);
            drawFineBrick(x, y, brickWidth, brickHeight);
        }
    }
}

// Draw function
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#E0F7FF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    drawGround();
    
    // Draw player if image is loaded
    if (rabio.complete) {
        ctx.drawImage(rabio, player.x, player.y, player.width, player.height);
    }
}

// Game loop
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
