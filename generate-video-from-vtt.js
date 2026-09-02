#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// 🎬 Unified VTT → Production JSON Generator
// Parses VTT/SRT, splits into scenes, auto-generates overlays,
// transitions, animations, and all creative enhancements.
//
// Usage:
//   node generate-video-from-vtt.js \
//     --vtt=captions.vtt \
//     --genre=drama \
//     --title="The Time Hop Coffee Shop" \
//     --author="Phaedra Patrick" \
//     --audio-duration=1640 \
//     --intro-duration=28 \
//     --scene-count=40 \
//     --output=production-my-book.json
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// ═══════════════════════════════════════════════════════════════
// 🎲 God-Mode Seeding (Deterministic Randomness)
// Makes every video unique based on its title DNA
// ═══════════════════════════════════════════════════════════════

function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b | 0) + d | 0;
      d = d + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

let seededRandom = Math.random;

function seedFromTitle(title) {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        const char = title.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    seededRandom = sfc32(hash, hash + 1, hash + 2, hash + 3);
}

function godRandom() { return seededRandom(); }
function godPick(arr) { return arr[Math.floor(godRandom() * arr.length)]; }
function godRange(min, max) { return min + godRandom() * (max - min); }

// ═══════════════════════════════════════════════════════════════
// CLI Arguments
// ═══════════════════════════════════════════════════════════════

const args = {};
process.argv.slice(2).forEach(arg => {
    const eqIdx = arg.indexOf('=');
    if (eqIdx === -1) {
        args[arg.replace(/^--/, '')] = true;
    } else {
        const key = arg.slice(0, eqIdx).replace(/^--/, '');
        const value = arg.slice(eqIdx + 1);
        args[key] = isNaN(value) ? value : Number(value);
    }
});

const vttPath = args['vtt'];
const genre = args['genre'] || 'drama';
const bookTitle = args['title'] || 'Book Summary';
const bookAuthor = args['author'] || 'Author';
const audioDuration = args['audio-duration'] || 1640;
const introDuration = args['intro-duration'] || 28;
const targetSceneDuration = 15.5;
const autoSceneCount = Math.round(audioDuration / targetSceneDuration);
const sceneCount = args['scene-count'] || Math.max(80, Math.min(180, autoSceneCount));
const outputFile = args['output'] || `production-gbs-${bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
const filmGrain = args['film-grain'] !== 'false';
const vignette = args['vignette'] !== 'false';
const exportVTT = args['export-vtt'] !== 'false';

if (!vttPath) {
    console.log(`
═══════════════════════════════════════════════════════════════
🎬 Unified VTT → Production JSON Generator
═══════════════════════════════════════════════════════════════

Usage:
  node generate-video-from-vtt.js \\
    --vtt=captions.vtt \\
    --genre=drama \\
    --title="Book Title" \\
    --author="Author Name" \\
    --audio-duration=1640 \\
    --scene-count=40 \\
    --output=production-my-book.json

Options:
  --vtt              Path to VTT/SRT file (required)
  --genre            Genre: drama, romance, thriller, fantasy, scifi, selfhelp, horror, history
  --title            Book title
  --author           Author name
  --audio-duration   Audio duration in seconds (main content, intro excluded)
  --intro-duration   Intro video duration in seconds (default: 28)
  --scene-count      Number of scenes (default: auto from audio-duration, ~15.5s each, clamped 80-180)
  --output           Output JSON file (auto-generated from title if not set)
  --film-grain       Enable film grain (default: true)
  --vignette         Enable vignette (default: true)
  --export-vtt       Also export VTT as .ts file (default: true)
`);
    process.exit(1);
}

// Seed the random engine with the title
seedFromTitle(bookTitle);

// ═══════════════════════════════════════════════════════════════
// VTT/SRT Parser
// ═══════════════════════════════════════════════════════════════

function parseSRT(content) {
    const entries = [];
    const blocks = content.trim().split(/\n\s*\n/);
    for (const block of blocks) {
        const lines = block.trim().split('\n');
        if (lines.length < 3) continue;
        const timeMatch = lines[1].match(
            /(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/
        );
        if (!timeMatch) continue;
        const startTime = parseInt(timeMatch[1]) * 3600 + parseInt(timeMatch[2]) * 60 + parseInt(timeMatch[3]) + parseInt(timeMatch[4]) / 1000;
        const endTime = parseInt(timeMatch[5]) * 3600 + parseInt(timeMatch[6]) * 60 + parseInt(timeMatch[7]) + parseInt(timeMatch[8]) / 1000;
        const text = lines.slice(2).join(' ').replace(/<[^>]*>/g, '').trim();
        entries.push({ startTime, endTime, text });
    }
    return entries;
}

function parseVTT(content) {
    const entries = [];
    const seenTimes = new Set();
    const blocks = content.split(/\r?\n\r?\n/);

    for (const block of blocks) {
        const lines = block.trim().split(/\r?\n/);
        const timeLine = lines.find(l => l.includes('-->'));
        if (!timeLine) continue;

        const timeMatch = timeLine.match(
            /(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/
        );
        if (!timeMatch) continue;

        const startTime = parseInt(timeMatch[1]) * 3600 + parseInt(timeMatch[2]) * 60 + parseInt(timeMatch[3]) + parseInt(timeMatch[4]) / 1000;
        const endTime = parseInt(timeMatch[5]) * 3600 + parseInt(timeMatch[6]) * 60 + parseInt(timeMatch[7]) + parseInt(timeMatch[8]) / 1000;

        const timeKey = `${startTime.toFixed(2)}-${endTime.toFixed(2)}`;
        if (seenTimes.has(timeKey)) continue;
        seenTimes.add(timeKey);

        const timeLineIdx = lines.indexOf(timeLine);
        const textLines = lines.slice(timeLineIdx + 1);
        const text = textLines
            .join(' ')
            .replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, '')
            .replace(/<[^>]*>/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        if (!text || text === ' ') continue;
        entries.push({ startTime, endTime, text });
    }
    return entries;
}

function parseCaptions(content) {
    return content.trimStart().startsWith('WEBVTT') ? parseVTT(content) : parseSRT(content);
}

// ═══════════════════════════════════════════════════════════════
// Full Effect Libraries
// ═══════════════════════════════════════════════════════════════

const ALL_TRANSITIONS = ['slide', 'fade', 'wipe', 'flip', 'clock', 'none'];

const ALL_ANIMATIONS = [
    'kenburns', 'parallax', 'zoom', 'slide', 'rotate', 'spotlight', 'fade',
    'dolly', 'orbit', 'whipPan', 'rackFocus',
    'zoomBounce', 'zoomPulse', 'zoomElastic', 'zoomPop', 'zoomBreath',
    'panDrift', 'panBounce', 'panSway', 'panFloat', 'panCircle', 'panWave', 'panGlide',
    'rotateSwing', 'rotateSpin', 'rotateWobble', 'tiltShift', 'rotateCarousel',
    'zoomPan', 'spiralZoom', 'tiltZoom', 'bouncePan', 'swayZoom', 'driftRotate',
    'pushInTilt', 'revealSlide', 'breathingFocus', 'heartbeat', 'wobbleZ',
    'flyIn', 'quake', 'floatUp', 'sinkDown', 'cinematicPan',
    'glideIn', 'pullBack', 'gentleRock', 'zoomSnap', 'softBounce',
    'tiltDrift', 'horizonShift', 'verticalReveal', 'slowSpin', 'breatheAndPan',
];

const BACKGROUND_VARIANTS = [
    'stars', 'bokeh', 'dust', 'fireflies', 'floatingOrbs',
    'floatingShapes', 'geometric', 'pulseRings', 'glitter',
    'rain', 'bubbles', 'confetti', 'leaves', 'lightRays',
];

const TEMPERATURES = ['warm', 'cool', 'neutral'];

const KINETIC_STYLES = ['bold', 'outline', 'shadow', 'glow', 'split'];
const KINETIC_POSITIONS = ['center', 'top', 'bottom'];
const QUOTE_VARIANTS = ['glass', 'minimal', 'elegant', 'neon'];
const INTERMISSION_STYLES = ['nextUp', 'keyTakeaway', 'meanwhile', 'reflection'];
const CHAPTER_TYPES = ['quote', 'chapter', 'insight', 'keypoint'];

// ═══════════════════════════════════════════════════════════════
// Balanced Selection (no-repeat within window)
// ═══════════════════════════════════════════════════════════════

function selectBalanced(pool, previous, windowSize = 3) {
    const recent = previous.slice(-windowSize);
    let candidates = pool.filter(item => !recent.includes(item));
    if (candidates.length === 0) {
        candidates = pool.filter(item => item !== previous[previous.length - 1]);
    }
    if (candidates.length === 0) candidates = [...pool];
    return candidates[Math.floor(godRandom() * candidates.length)];
}

function randomRange(min, max) {
    return godRange(min, max);
}

function pick(arr) {
    return godPick(arr);
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ═══════════════════════════════════════════════════════════════
// Keyword & Mood Detection
// ═══════════════════════════════════════════════════════════════

const STOP_WORDS = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall', 'can',
    'need', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through',
    'during', 'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over', 'under',
    'again', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'both',
    'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
    'same', 'so', 'than', 'too', 'very', 'just', 'because', 'but', 'and', 'or', 'if', 'while',
    'about', 'up', 'down', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'me', 'my',
    'we', 'our', 'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their', 'what', 'which',
    'who', 'you', 'your', 'like', 'know', 'think', 'going', 'really', 'actually', 'also', 'get',
    'got', 'even', 'well', 'back', 'still', 'way', 'take', 'come', 'make', 'let', 'thing',
    'things', 'much', 'kind', 'says', 'said', 'told', 'went',
]);

const EMOTIONS = {
    positive: ['love', 'happy', 'joy', 'laugh', 'smile', 'hope', 'dream', 'beautiful', 'wonderful', 'excited', 'warm', 'together', 'kiss', 'celebrate', 'bright', 'light'],
    negative: ['sad', 'cry', 'pain', 'hurt', 'anger', 'fear', 'dark', 'lost', 'alone', 'broken', 'tears', 'death', 'struggle', 'cold', 'suffer', 'grief'],
    tension: ['secret', 'lie', 'betray', 'conflict', 'argue', 'tension', 'surprise', 'shock', 'reveal', 'discover', 'hidden', 'truth', 'confront', 'risk', 'danger', 'threat'],
    reflection: ['remember', 'past', 'journey', 'change', 'grow', 'learn', 'realize', 'understand', 'memory', 'reflect', 'quiet', 'peace', 'calm', 'wisdom', 'meaning'],
};

function extractKeywords(text) {
    const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)
        .filter(w => w.length > 3 && !STOP_WORDS.has(w));
    const freq = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);
}

function detectMood(text) {
    if (!text) return 'reflection';
    const result = sentiment.analyze(text);
    if (result.score > 2) return 'positive';
    if (result.score < -2) return 'negative';
    if (result.comparative > 0.5) return 'tension';
    if (text.toLowerCase().includes('remember') || text.toLowerCase().includes('realize')) return 'reflection';
    return 'reflection';
}

function getSentimentScore(text) {
    if (!text) return 0;
    const result = sentiment.analyze(text);
    return result.comparative; // -5 to 5 normalized
}

function moodToIntensity(mood) {
    const map = { positive: 0.7, negative: 0.3, tension: 0.9, reflection: 0.5 };
    return map[mood] || 0.5;
}

// Shot type detection from scene text — keyword heuristic
function detectShotType(text) {
    if (!text) return 'medium';
    const t = text.toLowerCase();
    if (/\b(close ?up|closeup|face|faces|eyes|expression|whisper|gaze|stare|glance|tears|smile)\b/.test(t)) return 'closeup';
    if (/\b(landscape|wide|vista|horizon|panorama|establishing|skyline|scene|setting|background|environment)\b/.test(t)) return 'wide';
    return 'medium';
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

const vttContent = fs.readFileSync(vttPath, 'utf-8');
const captions = parseCaptions(vttContent);
const totalDuration = audioDuration || captions[captions.length - 1]?.endTime || 600;
const sceneDuration = totalDuration / sceneCount;

console.log('═══════════════════════════════════════════════════');
console.log('🎬 Unified VTT → Production JSON Generator');
console.log('═══════════════════════════════════════════════════');
console.log(`📚 Title: ${bookTitle}`);
console.log(`✍️  Author: ${bookAuthor}`);
console.log(`🎭 Genre: ${genre}`);
console.log(`📝 Parsed ${captions.length} captions`);
console.log(`📊 Audio Duration: ${Math.floor(totalDuration / 60)}:${String(Math.round(totalDuration % 60)).padStart(2, '0')}`);
console.log(`🖼️  Scene Count: ${sceneCount}${args['scene-count'] ? '' : ` (auto from ${(audioDuration/60).toFixed(1)}min → ~${targetSceneDuration}s each)`}`);
console.log(`⏱️  Scene Duration: ${sceneDuration.toFixed(2)}s each`);
console.log('═══════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════════════
// Generate Scenes
// ═══════════════════════════════════════════════════════════════

const previousTransitions = [];
const previousAnimations = [];
const scenes = [];
const chaptersEvery = Math.max(3, Math.floor(sceneCount / 10));

const isChapterScenes = [];
    for (let i = 0; i < sceneCount; i++) {
        const isChapterStart = i > 0 && i % chaptersEvery === 0;
        isChapterScenes.push(isChapterStart);
    const startTime = i * sceneDuration;
    const endTime = (i + 1) * sceneDuration;

    const transition = selectBalanced(ALL_TRANSITIONS, previousTransitions, 5);
    const animation = selectBalanced(ALL_ANIMATIONS, previousAnimations, 4);
    previousTransitions.push(transition);
    previousAnimations.push(animation);

    // Get scene text and detect mood
    const sceneCaptions = captions.filter(c => c.startTime >= startTime && c.startTime < endTime);
    const sceneText = sceneCaptions.map(c => c.text).join(' ');
    const mood = detectMood(sceneText);
    const keywords = extractKeywords(sceneText);

    // Scene title (first meaningful keyword or chapter marker)
    const title = keywords.length > 0
        ? keywords.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' & ')
        : undefined;

    scenes.push({
        id: `scene-${String(i).padStart(2, '0')}`,
        startTime,
        endTime,
        title,
        assets: [{
            type: 'image',
            path: `scenes/scene-${String(i).padStart(2, '0')}.png`,
            position: { x: 50, y: 50 },
            scale: randomRange(1.0, 1.4),
            opacity: 1.0,
            zIndex: 1,
        }],
        animations: [{
            type: animation,
            easing: 'ease-in-out',
            params: {},
        }],
        transition: {
            type: pick(ALL_TRANSITIONS),
            duration: randomRange(1.5, 3.5),
            easing: 'ease-out',
        },
        colorGrade: {
            brightness: randomRange(0.95, 1.3),
            contrast: randomRange(1.0, 1.5),
            saturation: randomRange(0.9, 1.4),
            temperature: TEMPERATURES[i % 3],
        },
        filmGrain: {
            enabled: filmGrain,
            amount: randomRange(0.08, 0.25),
        },
        vignette: {
            enabled: vignette && (i % 2 === 0),
            intensity: randomRange(0.25, 0.6),
        },
        sentiment: getSentimentScore(sceneText),
        mood,
        emotionalIntensity: Math.min(1, Math.abs(getSentimentScore(sceneText) * 0.6) + moodToIntensity(mood) * 0.4),
        audioPeakEffect: 0.5 + Math.min(0.5, Math.abs(getSentimentScore(sceneText) * 0.2) + moodToIntensity(mood) * 0.3),
        particleType: pick(['fireflies', 'dust', 'glitch', 'stars', 'bokeh']),
        particleColor: pick(['#ffffff', '#ff4d4d', '#4d94ff', '#ffcc00', '#00ffcc']),
        isCliffhanger: (i % chaptersEvery === chaptersEvery - 1) && godRandom() > 0.5,
        showThreeD: (i % chaptersEvery === 0) && i > 0,
        showAccent: (i % chaptersEvery === 0) && i > 0,
        shotType: detectShotType(sceneText),
        genreProfile: genre,
        isChapterScene: isChapterScenes[i],
        chapterAccentPath: isChapterScenes[i] ? `scenes/chapter-acc-${String(i).padStart(2, '0')}.png` : undefined,
        aiGenerated: false, // Flag to indicate if this scene was dynamically built by Antigravity Skills
    });

    // Integrated Antigravity Trigger:
    if (args['use-ai'] && (getSentimentScore(sceneText) > 1.2 || (i % chaptersEvery === 0))) {
        console.log(`\n🤖 [Antigravity Skills] Peak detected at Scene ${i}! Triggering dynamic generation for chapter title: ${title}`);
        try {
            const { execSync } = require('child_process');
            execSync(`node scripts/generate-with-antigravity.js "${title || bookTitle}"`, { stdio: 'inherit' });
            scenes[scenes.length - 1].aiGenerated = true; // Mark as AI-generated in JSON
        } catch (e) {
            console.warn(`⚠️ [Antigravity Skills] Failed to run AI generation for Scene ${i}. Using standard God-Mode templates.`);
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// Auto-Generate Overlays
// ═══════════════════════════════════════════════════════════════

console.log('\n📐 Generating overlays from VTT content...\n');

// ── Chapter Cards (every 3-5 scenes) ──────────────────────────
const chapterCards = [];

for (let i = 0; i < sceneCount; i += chaptersEvery) {
    const scene = scenes[i];
    const sceneCaptions = captions.filter(c => c.startTime >= scene.startTime && c.startTime < scene.endTime);
    const sceneText = sceneCaptions.map(c => c.text).join(' ');
    const keywords = extractKeywords(sceneText);

    if (keywords.length >= 2) {
        const cardTime = scene.startTime + 2; // 2 seconds into the scene
        chapterCards.push({
            startTime: cardTime,
            endTime: cardTime + 5,
            text: keywords.slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(', '),
            subtitle: `Part ${Math.floor(i / chaptersEvery) + 1}`,
            type: pick(CHAPTER_TYPES),
        });
    }
}

console.log(`   📖 Chapter Cards: ${chapterCards.length}`);

// ── Intermission Cards (between major sections) ───────────────
const intermissionCards = [];
const intermissionEvery = Math.max(5, Math.floor(sceneCount / 6));

for (let i = intermissionEvery; i < sceneCount; i += intermissionEvery) {
    const scene = scenes[i];
    intermissionCards.push({
        time: scene.startTime,
        duration: 4,
        text: pick([
            `Chapter ${Math.floor(i / intermissionEvery) + 1}`,
            'Key Moment',
            'Turning Point',
            'The Plot Thickens',
            'Meanwhile...',
            'Deep Insight',
            'Critical Scene',
        ]),
        style: pick(INTERMISSION_STYLES),
    });
}

console.log(`   🎬 Intermission Cards: ${intermissionCards.length}`);

// ── Typewriter Quotes (4-6 throughout video) ──────────────────
const typewriterQuotes = [];
const quoteCount = Math.min(6, Math.max(4, Math.floor(sceneCount / 8)));
const quoteStep = Math.floor(sceneCount / quoteCount);

for (let q = 0; q < quoteCount; q++) {
    const sceneIdx = Math.min(q * quoteStep + Math.floor(quoteStep / 2), sceneCount - 1);
    const scene = scenes[sceneIdx];
    const sceneCaptions = captions.filter(c => c.startTime >= scene.startTime && c.startTime < scene.endTime);

    const sortedCaptions = [...sceneCaptions].sort((a, b) => b.text.length - a.text.length);
    const bestCaption = sortedCaptions[0];

    if (bestCaption && bestCaption.text.length > 20) {
        const quoteText = bestCaption.text.length > 100
            ? bestCaption.text.substring(0, 100).replace(/\s\S*$/, '') + '...'
            : bestCaption.text;

        const startT = bestCaption.startTime;
        typewriterQuotes.push({
            startTime: startT,
            endTime: startT + 6,
            text: `"${quoteText}"`,
            attribution: `— ${bookTitle}`,
        });
    }
}

console.log(`   ✍️  Typewriter Quotes: ${typewriterQuotes.length}`);

// ── Emotional Arc (8-12 data points) ──────────────────────────
const arcPoints = Math.min(12, Math.max(8, Math.floor(sceneCount / 4)));
const arcStep = Math.floor(sceneCount / arcPoints);
const emotionalArc = [];
const emotionalArcLabels = [];

for (let a = 0; a < arcPoints; a++) {
    const sceneIdx = Math.min(a * arcStep, sceneCount - 1);
    const scene = scenes[sceneIdx];
    const sceneCaptions = captions.filter(c => c.startTime >= scene.startTime && c.startTime < scene.endTime);
    const sceneText = sceneCaptions.map(c => c.text).join(' ');
    const mood = detectMood(sceneText);
    const intensity = moodToIntensity(mood) + randomRange(-0.1, 0.1);

    emotionalArc.push(Math.max(0.1, Math.min(1.0, intensity)));
    emotionalArcLabels.push(mood.charAt(0).toUpperCase() + mood.slice(1));
}

console.log(`   📈 Emotional Arc: ${emotionalArc.length} points`);

// ── Kinetic Words (8-12 key words) ────────────────────────────
const kineticWords = [];
const kineticCount = Math.min(12, Math.max(8, Math.floor(sceneCount / 4)));
const kineticStep = Math.floor(sceneCount / kineticCount);

for (let k = 0; k < kineticCount; k++) {
    const sceneIdx = Math.min(k * kineticStep + 1, sceneCount - 1);
    const scene = scenes[sceneIdx];
    const sceneCaptions = captions.filter(c => c.startTime >= scene.startTime && c.startTime < scene.endTime);
    const sceneText = sceneCaptions.map(c => c.text).join(' ');
    const keywords = extractKeywords(sceneText);

    if (keywords.length > 0) {
        const word = keywords[0].toUpperCase();
        const midTime = scene.startTime + sceneDuration * 0.4;
        kineticWords.push({
            startTime: midTime,
            endTime: midTime + 3,
            word,
            fontSize: pick([80, 100, 120, 140]),
            position: pick(KINETIC_POSITIONS),
            style: pick(KINETIC_STYLES),
        });
    }
}

console.log(`   💬 Kinetic Words: ${kineticWords.length}`);

// ── Quote Highlights (3-5 glassmorphism cards) ────────────────
const quoteHighlights = [];
const qhCount = Math.min(5, Math.max(3, Math.floor(sceneCount / 10)));
const qhStep = Math.floor(sceneCount / qhCount);

for (let q = 0; q < qhCount; q++) {
    const sceneIdx = Math.min(q * qhStep + Math.floor(qhStep * 0.7), sceneCount - 1);
    const scene = scenes[sceneIdx];
    const sceneCaptions = captions.filter(c => c.startTime >= scene.startTime && c.startTime < scene.endTime);

    const sortedCaptions = [...sceneCaptions].sort((a, b) => b.text.length - a.text.length);
    const bestCaption = sortedCaptions[0];

    if (bestCaption && bestCaption.text.length > 15) {
        const quoteText = bestCaption.text.length > 120
            ? bestCaption.text.substring(0, 120).replace(/\s\S*$/, '') + '...'
            : bestCaption.text;

        quoteHighlights.push({
            startTime: bestCaption.startTime + 1,
            endTime: bestCaption.startTime + 7,
            text: quoteText,
            attribution: `— ${bookAuthor}`,
            variant: pick(QUOTE_VARIANTS),
        });
    }
}

console.log(`   💎 Quote Highlights: ${quoteHighlights.length}`);

// ── Call to Action Overlays (God-Mode Retention) ──────────────
const ctaOverlays = [];
const ctaTimes = [
    scenes[Math.floor(sceneCount * 0.15)].startTime,
    scenes[Math.floor(sceneCount * 0.5)].startTime,
    scenes[Math.floor(sceneCount * 0.9)].startTime,
];

const CTA_MESSAGES = [
    "SUBSCRIBE FOR MORE SUMMARIES",
    "DO YOU AGREE? COMMENT BELOW!",
    "LIKE THIS VIDEO IF YOU ENJOYED",
    "TAP THE BELL 🔔",
    "CHECK THE LINK IN BIO",
];

ctaTimes.forEach((time, idx) => {
    ctaOverlays.push({
        startTime: time + 1,
        endTime: time + 6,
        text: CTA_MESSAGES[idx % CTA_MESSAGES.length],
        variant: pick(['minimal', 'elegant', 'neon']),
    });
});

console.log(`   📢 CTA Overlays: ${ctaOverlays.length}`);

// ── Data Viz Items (2-3 book facts) ───────────────────────────
const dataVizItems = [
    {
        startTime: scenes[Math.floor(sceneCount * 0.2)].startTime + 5,
        endTime: scenes[Math.floor(sceneCount * 0.2)].startTime + 11,
        label: 'Story Progress',
        value: 20,
        unit: '%',
        icon: '📖',
        variant: 'ring',
    },
    {
        startTime: scenes[Math.floor(sceneCount * 0.5)].startTime + 5,
        endTime: scenes[Math.floor(sceneCount * 0.5)].startTime + 11,
        label: 'Halfway Through',
        value: 50,
        unit: '%',
        icon: '⏳',
        variant: 'ring',
    },
    {
        startTime: scenes[Math.floor(sceneCount * 0.85)].startTime + 3,
        endTime: scenes[Math.floor(sceneCount * 0.85)].startTime + 9,
        label: 'Approaching the End',
        value: 85,
        unit: '%',
        icon: '🔥',
        variant: 'bar',
    },
];

console.log(`   📊 Data Viz Items: ${dataVizItems.length}`);

// ── Chapter Titles (for progress indicator) ───────────────────
const totalChapters = chapterCards.length;
const chapterTitles = chapterCards.map(c => c.text);

// ═══════════════════════════════════════════════════════════════
// Assemble Config
// ═══════════════════════════════════════════════════════════════

const config = {
    compositionId: "Evil-Bones-GBS",
    title: bookTitle,
    author: bookAuthor,
    genre,
    audioFile: args['audio'] || `audio/${path.basename(vttPath, '.vtt').replace('.vtt', '')}.m4a`,
    captionContent: vttContent,
    scenes,
    defaultTransition: {
        type: 'crossfade',
        duration: 3.0,
    },
    fps: 24,
    globalFilmGrain: false,
    globalVignette: false,
    cinematicBars: true,
    // ── Overlay data ──
    chapterCards,
    intermissionCards,
    typewriterQuotes,
    emotionalArc,
    emotionalArcLabels,
    totalChapters,
    chapterTitles,
    progressVariant: 'bar',
    showSceneTitles: true,
    // ── New overlays ──
    kineticWords,
    quoteHighlights,
    dataVizItems,
    ctaOverlays,
};

// ═══════════════════════════════════════════════════════════════
// Write Output
// ═══════════════════════════════════════════════════════════════

fs.writeFileSync(outputFile, JSON.stringify(config, null, 2));
console.log(`\n✅ Production JSON saved: ${outputFile}`);

// ═══════════════════════════════════════════════════════════════
// Summary
// ═══════════════════════════════════════════════════════════════

const uniqueTransitions = [...new Set(previousTransitions)];
const uniqueAnimations = [...new Set(previousAnimations)];

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`📊 Generation Summary`);
console.log(`═══════════════════════════════════════════════════`);
console.log(`   Scenes:           ${sceneCount}`);
console.log(`   Unique Transitions: ${uniqueTransitions.length}/${ALL_TRANSITIONS.length}`);
console.log(`   Unique Animations:  ${uniqueAnimations.length}/${ALL_ANIMATIONS.length}`);
console.log(`   Chapter Cards:    ${chapterCards.length}`);
console.log(`   Intermissions:    ${intermissionCards.length}`);
console.log(`   Typewriter Quotes: ${typewriterQuotes.length}`);
console.log(`   Kinetic Words:    ${kineticWords.length}`);
console.log(`   Quote Highlights: ${quoteHighlights.length}`);
console.log(`   Data Viz Items:   ${dataVizItems.length}`);
console.log(`   Emotional Arc:    ${emotionalArc.length} points`);
console.log(`\n📐 Total video: ${introDuration}s intro + ${totalDuration}s audio = ${introDuration + totalDuration}s`);
console.log(`   (${Math.floor((introDuration + totalDuration) / 60)}:${String(Math.round((introDuration + totalDuration) % 60)).padStart(2, '0')})`);

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`📝 Next Steps`);
console.log(`═══════════════════════════════════════════════════`);
console.log(`1. Generate ${sceneCount} scene images (scene-00.png to scene-${String(sceneCount - 1).padStart(2, '0')}.png)`);
console.log(`   Use: node generate-prompts-from-srt.js --srt=${vttPath} --scenes=${sceneCount} --genre=${genre} --title="${bookTitle}"`);
console.log(`2. Place images in public/scenes/`);
console.log(`3. Update Root.tsx to register new composition with '${outputFile}'`);
console.log(`4. Run: npm run dev (preview in Remotion Studio)`);
console.log(`5. Run: npx remotion render COMPOSITION_ID output.mp4 --codec=h264 --hw-accel=auto --concurrency=1`);
