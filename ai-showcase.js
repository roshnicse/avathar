/**
 * AVATHAR AI ACADEMY — ADVANCED AI EFFECTS & VIDEO SHOWCASE ENGINE
 * Includes:
 * 1. AI Vision & Neural Network Stream Video Player (Edge AI Vision, Synapse Matrix, Transformer Flow)
 * 2. Real-Time Computer Vision HUD Telemetry & Detection Overlay
 * 3. 3D Perspective Card Tilt & Holographic Sheen Engine
 * 4. Interactive AI Terminal Simulator (Live Prompt & Code Generation)
 * 5. Cyber Laser Scanline & Synapse Pulses
 */

(function () {
  'use strict';

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. AI VIDEO & NEURAL STREAM HUB
     ========================================================================== */
  const video = document.getElementById('ai-stream-video');
  const hudCanvas = document.getElementById('ai-hud-canvas');
  const neuralCanvas = document.getElementById('ai-neural-canvas');
  const matrixCanvas = document.getElementById('ai-matrix-canvas');

  const playPauseBtn = document.getElementById('stream-play-pause-btn');
  const muteBtn = document.getElementById('stream-mute-btn');
  const fullscreenBtn = document.getElementById('stream-fullscreen-btn');
  const modeBtns = document.querySelectorAll('.stream-mode-btn');
  const telemetryLogs = document.getElementById('telemetry-logs-body');
  const fpsDisplay = document.getElementById('telemetry-fps');
  const latencyDisplay = document.getElementById('telemetry-latency');
  const targetCountDisplay = document.getElementById('telemetry-targets');
  const streamStatusBadge = document.getElementById('stream-status-badge');

  let currentMode = 'vision'; // 'vision', 'neural', 'matrix'
  let isPlaying = true;
  let hudCtx = hudCanvas ? hudCanvas.getContext('2d') : null;
  let neuralCtx = neuralCanvas ? neuralCanvas.getContext('2d') : null;
  let matrixCtx = matrixCanvas ? matrixCanvas.getContext('2d') : null;

  let animFrameId = null;
  let lastTime = performance.now();
  let frameCount = 0;
  let fpsTimer = 0;

  // Synthetic Vision Bounding Boxes for HUD over the video
  const visionTargets = [
    { x: 0.18, y: 0.32, w: 0.16, h: 0.22, label: 'VEHICLE_01', conf: 0.984, vx: 0.0006, vy: 0.0002 },
    { x: 0.42, y: 0.38, w: 0.19, h: 0.26, label: 'VEHICLE_02', conf: 0.991, vx: -0.0004, vy: 0.0001 },
    { x: 0.68, y: 0.28, w: 0.14, h: 0.19, label: 'VEHICLE_03', conf: 0.976, vx: 0.0005, vy: -0.0002 },
    { x: 0.30, y: 0.62, w: 0.22, h: 0.28, label: 'TARGET_LOCKED', conf: 0.988, vx: -0.0003, vy: -0.0003 }
  ];

  /* --------------------------------------------------------------------------
     Neural Synapse Simulation State
     -------------------------------------------------------------------------- */
  const neuralLayers = [4, 6, 8, 6, 3];
  let neuralNodes = [];
  let neuralPulses = [];

  function initNeuralNodes(w, h) {
    neuralNodes = [];
    neuralPulses = [];
    const layerSpacing = w / (neuralLayers.length + 1);

    neuralLayers.forEach((count, layerIdx) => {
      const x = layerSpacing * (layerIdx + 1);
      const nodeSpacing = h / (count + 1);
      const layerNodes = [];

      for (let i = 0; i < count; i++) {
        layerNodes.push({
          x: x,
          y: nodeSpacing * (i + 1),
          layer: layerIdx,
          activation: Math.random() * 0.8 + 0.2,
          radius: 5,
          pulse: 0
        });
      }
      neuralNodes.push(layerNodes);
    });
  }

  function spawnNeuralPulse() {
    if (neuralNodes.length < 2) return;
    const startLayer = 0;
    const fromNode = neuralNodes[startLayer][Math.floor(Math.random() * neuralNodes[startLayer].length)];
    const toNode = neuralNodes[startLayer + 1][Math.floor(Math.random() * neuralNodes[startLayer + 1].length)];

    neuralPulses.push({
      layerIdx: 0,
      from: fromNode,
      to: toNode,
      progress: 0,
      speed: 0.025 + Math.random() * 0.015,
      color: Math.random() > 0.3 ? '#00BFFF' : '#F5C451'
    });
  }

  /* --------------------------------------------------------------------------
     Matrix Cascade Simulation State
     -------------------------------------------------------------------------- */
  const matrixChars = '01アイウエオカキケコサシスセソタチツテト0101XYZΑΒΓΔΩ';
  let matrixColumns = [];

  function initMatrix(w, h) {
    const fontSize = 14;
    const cols = Math.floor(w / fontSize);
    matrixColumns = [];
    for (let i = 0; i < cols; i++) {
      matrixColumns.push({
        x: i * fontSize,
        y: Math.random() * h,
        speed: Math.random() * 3 + 2,
        chars: Array.from({ length: 25 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)])
      });
    }
  }

  /* --------------------------------------------------------------------------
     Canvas Resize Handler
     -------------------------------------------------------------------------- */
  function resizeShowcaseCanvases() {
    const container = document.querySelector('.ai-stream-viewport');
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;

    [hudCanvas, neuralCanvas, matrixCanvas].forEach(c => {
      if (c) {
        c.width = w;
        c.height = h;
      }
    });

    initNeuralNodes(w, h);
    initMatrix(w, h);
  }

  /* --------------------------------------------------------------------------
     HUD Drawing (Bounding Boxes, Crosshairs, Telemetry)
     -------------------------------------------------------------------------- */
  let scanlineY = 0;

  function drawVisionHUD(w, h) {
    if (!hudCtx) return;
    hudCtx.clearRect(0, 0, w, h);

    const now = performance.now();

    // 1. Cyber Scanning Laser Beam
    scanlineY = (scanlineY + 1.8) % h;
    const grad = hudCtx.createLinearGradient(0, scanlineY - 20, 0, scanlineY + 20);
    grad.addColorStop(0, 'rgba(0, 191, 255, 0)');
    grad.addColorStop(0.5, 'rgba(0, 191, 255, 0.45)');
    grad.addColorStop(1, 'rgba(0, 191, 255, 0)');
    hudCtx.fillStyle = grad;
    hudCtx.fillRect(0, scanlineY - 20, w, 40);

    // Scanline central bright pulse line
    hudCtx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
    hudCtx.lineWidth = 1.5;
    hudCtx.beginPath();
    hudCtx.moveTo(0, scanlineY);
    hudCtx.lineTo(w, scanlineY);
    hudCtx.stroke();

    // 2. Corner Bracket Reticles (Camera Viewport Frame)
    const bracketSize = 28;
    const pad = 16;
    hudCtx.strokeStyle = 'rgba(0, 191, 255, 0.7)';
    hudCtx.lineWidth = 2.5;

    // Top-Left
    hudCtx.beginPath();
    hudCtx.moveTo(pad, pad + bracketSize);
    hudCtx.lineTo(pad, pad);
    hudCtx.lineTo(pad + bracketSize, pad);
    hudCtx.stroke();

    // Top-Right
    hudCtx.beginPath();
    hudCtx.moveTo(w - pad - bracketSize, pad);
    hudCtx.lineTo(w - pad, pad);
    hudCtx.lineTo(w - pad, pad + bracketSize);
    hudCtx.stroke();

    // Bottom-Left
    hudCtx.beginPath();
    hudCtx.moveTo(pad, h - pad - bracketSize);
    hudCtx.lineTo(pad, h - pad);
    hudCtx.lineTo(pad + bracketSize, h - pad);
    hudCtx.stroke();

    // Bottom-Right
    hudCtx.beginPath();
    hudCtx.moveTo(w - pad - bracketSize, h - pad);
    hudCtx.lineTo(w - pad, h - pad);
    hudCtx.lineTo(w - pad, h - pad - bracketSize);
    hudCtx.stroke();

    // 3. Central Dynamic Target Crosshair
    const cx = w * 0.5;
    const cy = h * 0.5;
    hudCtx.strokeStyle = 'rgba(245, 196, 81, 0.5)';
    hudCtx.lineWidth = 1;
    hudCtx.beginPath();
    hudCtx.arc(cx, cy, 32, 0, Math.PI * 2);
    hudCtx.stroke();

    // Rotating crosshair tick
    const angle = (now * 0.001) % (Math.PI * 2);
    hudCtx.beginPath();
    hudCtx.moveTo(cx + Math.cos(angle) * 22, cy + Math.sin(angle) * 22);
    hudCtx.lineTo(cx + Math.cos(angle) * 38, cy + Math.sin(angle) * 38);
    hudCtx.stroke();

    // 4. Object Detection Bounding Boxes
    visionTargets.forEach((target, idx) => {
      target.x += target.vx;
      target.y += target.vy;
      if (target.x < 0.05 || target.x > 0.78) target.vx = -target.vx;
      if (target.y < 0.12 || target.y > 0.65) target.vy = -target.vy;

      const bx = target.x * w;
      const by = target.y * h;
      const bw = target.w * w;
      const bh = target.h * h;

      // Box outline
      const isPrimary = idx === 1;
      const boxColor = isPrimary ? '#F5C451' : '#00BFFF';
      hudCtx.strokeStyle = boxColor;
      hudCtx.lineWidth = 1.5;
      hudCtx.strokeRect(bx, by, bw, bh);

      // Corner accents
      const cLen = 10;
      hudCtx.fillStyle = boxColor;
      hudCtx.fillRect(bx, by, cLen, 2);
      hudCtx.fillRect(bx, by, 2, cLen);
      hudCtx.fillRect(bx + bw - cLen, by, cLen, 2);
      hudCtx.fillRect(bx + bw - 2, by, 2, cLen);

      // Label background & text
      hudCtx.fillStyle = 'rgba(7, 21, 47, 0.85)';
      hudCtx.fillRect(bx, by - 22, 130, 20);
      hudCtx.strokeStyle = boxColor;
      hudCtx.strokeRect(bx, by - 22, 130, 20);

      hudCtx.font = 'bold 11px monospace';
      hudCtx.fillStyle = '#FFFFFF';
      hudCtx.fillText(`${target.label} ${(target.conf * 100).toFixed(1)}%`, bx + 6, by - 8);

      // Vector tracking line
      hudCtx.strokeStyle = 'rgba(0, 191, 255, 0.35)';
      hudCtx.setLineDash([3, 3]);
      hudCtx.beginPath();
      hudCtx.moveTo(bx + bw / 2, by + bh / 2);
      hudCtx.lineTo(bx + bw / 2 + target.vx * 3000, by + bh / 2 + target.vy * 3000);
      hudCtx.stroke();
      hudCtx.setLineDash([]);
    });
  }

  /* --------------------------------------------------------------------------
     Neural Synapse Canvas Drawing
     -------------------------------------------------------------------------- */
  function drawNeuralNetwork(w, h) {
    if (!neuralCtx) return;
    neuralCtx.clearRect(0, 0, w, h);

    // Draw dark technological background with gradient
    const bgGrad = neuralCtx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w / 1.4);
    bgGrad.addColorStop(0, 'rgba(7, 33, 77, 0.95)');
    bgGrad.addColorStop(1, 'rgba(3, 7, 18, 0.98)');
    neuralCtx.fillStyle = bgGrad;
    neuralCtx.fillRect(0, 0, w, h);

    // Synaptic connections between adjacent layers
    for (let l = 0; l < neuralNodes.length - 1; l++) {
      const currentLayer = neuralNodes[l];
      const nextLayer = neuralNodes[l + 1];

      currentLayer.forEach(n1 => {
        nextLayer.forEach(n2 => {
          neuralCtx.strokeStyle = 'rgba(0, 191, 255, 0.12)';
          neuralCtx.lineWidth = 1;
          neuralCtx.beginPath();
          neuralCtx.moveTo(n1.x, n1.y);
          neuralCtx.lineTo(n2.x, n2.y);
          neuralCtx.stroke();
        });
      });
    }

    // Spawn pulses occasionally
    if (Math.random() < 0.15) {
      spawnNeuralPulse();
    }

    // Update & draw pulses
    for (let i = neuralPulses.length - 1; i >= 0; i--) {
      const p = neuralPulses[i];
      p.progress += p.speed;

      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;

      neuralCtx.beginPath();
      neuralCtx.arc(px, py, 3.5, 0, Math.PI * 2);
      neuralCtx.fillStyle = p.color;
      neuralCtx.shadowColor = p.color;
      neuralCtx.shadowBlur = 10;
      neuralCtx.fill();
      neuralCtx.shadowBlur = 0;

      if (p.progress >= 1) {
        // Trigger next layer pulse if not last
        const nextLayerIdx = p.layerIdx + 1;
        if (nextLayerIdx < neuralNodes.length - 1) {
          const nextNextNode = neuralNodes[nextLayerIdx + 1][Math.floor(Math.random() * neuralNodes[nextLayerIdx + 1].length)];
          neuralPulses.push({
            layerIdx: nextLayerIdx,
            from: p.to,
            to: nextNextNode,
            progress: 0,
            speed: p.speed,
            color: p.color
          });
        }
        neuralPulses.splice(i, 1);
      }
    }

    // Draw Nodes
    neuralNodes.forEach(layer => {
      layer.forEach(node => {
        neuralCtx.beginPath();
        neuralCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        neuralCtx.fillStyle = '#07152F';
        neuralCtx.fill();

        neuralCtx.strokeStyle = '#00BFFF';
        neuralCtx.lineWidth = 2;
        neuralCtx.stroke();

        // Inner glowing core
        neuralCtx.beginPath();
        neuralCtx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        neuralCtx.fillStyle = '#F5C451';
        neuralCtx.fill();
      });
    });

    // Info overlay
    neuralCtx.font = '12px monospace';
    neuralCtx.fillStyle = '#00BFFF';
    neuralCtx.fillText('LAYER ARCHITECTURE: 4 -> 6 -> 8 -> 6 -> 3', 24, 30);
    neuralCtx.fillStyle = '#B8C7E0';
    neuralCtx.fillText('ACTIVE SYNAPSE PULSES: ' + neuralPulses.length, 24, 48);
  }

  /* --------------------------------------------------------------------------
     Matrix Transformer Cascade Drawing
     -------------------------------------------------------------------------- */
  function drawMatrixStream(w, h) {
    if (!matrixCtx) return;

    // Semi-transparent fade
    matrixCtx.fillStyle = 'rgba(3, 7, 18, 0.18)';
    matrixCtx.fillRect(0, 0, w, h);

    const fontSize = 14;
    matrixCtx.font = `${fontSize}px monospace`;

    matrixColumns.forEach(col => {
      // Pick random character
      const char = col.chars[Math.floor(Math.random() * col.chars.length)];

      // First character is bright white/gold, rest is cyan
      matrixCtx.fillStyle = '#F5C451';
      matrixCtx.fillText(char, col.x, col.y);

      matrixCtx.fillStyle = 'rgba(0, 191, 255, 0.85)';
      matrixCtx.fillText(char, col.x, col.y - fontSize);

      col.y += col.speed;
      if (col.y > h && Math.random() > 0.975) {
        col.y = 0;
      }
    });

    // Transformer HUD metrics
    matrixCtx.fillStyle = 'rgba(7, 21, 47, 0.8)';
    matrixCtx.fillRect(20, h - 50, 280, 36);
    matrixCtx.strokeStyle = 'rgba(0, 191, 255, 0.5)';
    matrixCtx.strokeRect(20, h - 50, 280, 36);

    matrixCtx.font = 'bold 11px monospace';
    matrixCtx.fillStyle = '#00BFFF';
    matrixCtx.fillText('ATTENTION MATRIX: 32 HEADS | TENSOR FLOW', 30, h - 28);
  }

  /* --------------------------------------------------------------------------
     Master Animation Loop
     -------------------------------------------------------------------------- */
  function showcaseLoop(now) {
    const w = hudCanvas ? hudCanvas.width : 640;
    const h = hudCanvas ? hudCanvas.height : 360;

    // Calculate FPS
    frameCount++;
    if (now - fpsTimer >= 500) {
      const currentFps = Math.round((frameCount * 1000) / (now - fpsTimer));
      if (fpsDisplay) fpsDisplay.textContent = `${currentFps} FPS`;
      if (latencyDisplay) {
        const jitter = (11.2 + Math.random() * 2.1).toFixed(1);
        latencyDisplay.textContent = `${jitter} ms`;
      }
      frameCount = 0;
      fpsTimer = now;
    }

    if (currentMode === 'vision') {
      drawVisionHUD(w, h);
    } else if (currentMode === 'neural') {
      drawNeuralNetwork(w, h);
    } else if (currentMode === 'matrix') {
      drawMatrixStream(w, h);
    }

    if (isPlaying) {
      animFrameId = requestAnimationFrame(showcaseLoop);
    }
  }

  /* --------------------------------------------------------------------------
     Telemetry Rolling Log Stream
     -------------------------------------------------------------------------- */
  const telemetryMessages = [
    'TENSOR_INIT: Convolutional Layer 16 OK',
    'TARGET_LOCKED: Vehicle #4092 Conf: 98.4%',
    'ATTENTION_HEADS: 16/16 Converged',
    'INFERENCE_PASS: Latency 11.4ms | Loss 0.012',
    'FEATURE_MAP: Edge Detection Matrix Extracted',
    'AUTONOMOUS_PIPELINE: Frame Vector Synced',
    'NEURAL_ACTIVATION: ReLU Gradient Stable',
    'OBJECT_TRACKER: 4 Targets in Active Bounding',
    'TENSORRT_FP16: Optimization Engine Peak',
    'AVATHAR_AI_VISION: Real-Time Stream Operational'
  ];

  let logIndex = 0;
  function appendTelemetryLog() {
    if (!telemetryLogs) return;
    const timeStr = new Date().toTimeString().split(' ')[0];
    const msg = telemetryMessages[logIndex % telemetryMessages.length];
    logIndex++;

    const logLine = document.createElement('div');
    logLine.className = 'telemetry-log-item';
    logLine.innerHTML = `<span class="log-time">[${timeStr}]</span> <span class="log-msg">${msg}</span>`;

    telemetryLogs.appendChild(logLine);
    while (telemetryLogs.children.length > 8) {
      telemetryLogs.removeChild(telemetryLogs.firstChild);
    }
    telemetryLogs.scrollTop = telemetryLogs.scrollHeight;
  }

  /* --------------------------------------------------------------------------
     Stream Mode Switcher
     -------------------------------------------------------------------------- */
  function setStreamMode(mode) {
    currentMode = mode;

    modeBtns.forEach(btn => {
      if (btn.dataset.mode === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (mode === 'vision') {
      if (video) {
        video.style.display = 'block';
        video.play().catch(() => {});
      }
      if (hudCanvas) hudCanvas.style.display = 'block';
      if (neuralCanvas) neuralCanvas.style.display = 'none';
      if (matrixCanvas) matrixCanvas.style.display = 'none';
      if (streamStatusBadge) streamStatusBadge.textContent = 'LIVE: VISION INFERENCE';
      if (targetCountDisplay) targetCountDisplay.textContent = '4 Targets';
    } else if (mode === 'neural') {
      if (video) video.style.display = 'none';
      if (hudCanvas) hudCanvas.style.display = 'none';
      if (neuralCanvas) neuralCanvas.style.display = 'block';
      if (matrixCanvas) matrixCanvas.style.display = 'none';
      if (streamStatusBadge) streamStatusBadge.textContent = 'LIVE: NEURAL MATRIX';
      if (targetCountDisplay) targetCountDisplay.textContent = '27 Nodes';
    } else if (mode === 'matrix') {
      if (video) video.style.display = 'none';
      if (hudCanvas) hudCanvas.style.display = 'none';
      if (neuralCanvas) neuralCanvas.style.display = 'none';
      if (matrixCanvas) matrixCanvas.style.display = 'block';
      if (streamStatusBadge) streamStatusBadge.textContent = 'LIVE: TRANSFORMER TOKENS';
      if (targetCountDisplay) targetCountDisplay.textContent = '32 Heads';
    }
  }

  /* --------------------------------------------------------------------------
     Controls Setup
     -------------------------------------------------------------------------- */
  function setupControls() {
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          playPauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            <span>Pause Stream</span>`;
          if (video && currentMode === 'vision') video.play().catch(() => {});
          animFrameId = requestAnimationFrame(showcaseLoop);
        } else {
          playPauseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Resume Stream</span>`;
          if (video) video.pause();
          cancelAnimationFrame(animFrameId);
        }
      });
    }

    if (muteBtn && video) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted
          ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const viewport = document.querySelector('.ai-stream-viewport');
        if (!viewport) return;
        if (!document.fullscreenElement) {
          viewport.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setStreamMode(btn.dataset.mode);
      });
    });

    window.addEventListener('resize', resizeShowcaseCanvases);
  }

  /* ==========================================================================
     2. 3D CARD TILT & HOLOGRAPHIC SHEEN EFFECT
     ========================================================================== */
  function init3DCardTilt() {
    if (prefersReducedMotion || window.innerWidth < 960) return;

    const cards = document.querySelectorAll('.course-card, .internship-card, .offering-card, .advantage-card');

    cards.forEach(card => {
      // Create sheen element if not existing
      let sheen = card.querySelector('.card-holographic-sheen');
      if (!sheen) {
        sheen = document.createElement('div');
        sheen.className = 'card-holographic-sheen';
        card.appendChild(sheen);
      }

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;

        // Sheen gradient follows cursor
        sheen.style.opacity = '1';
        sheen.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(0, 191, 255, 0.22), transparent 80%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        sheen.style.opacity = '0';
      });
    });
  }

  /* ==========================================================================
     3. INTERACTIVE AI TERMINAL (PROMPT & INFERENCE SIMULATOR)
     ========================================================================== */
  function initAITerminal() {
    const terminalOutput = document.getElementById('ai-terminal-output');
    const promptButtons = document.querySelectorAll('.terminal-prompt-btn');

    if (!terminalOutput || promptButtons.length === 0) return;

    const scripts = {
      train: [
        '$ python train_vision_model.py --dataset karur_tech_v1 --epochs 5',
        '[INIT] Allocating GPU Tensor Cores... 16GB VRAM OK',
        '[EPOCH 1/5] Loss: 0.842 | Accuracy: 74.2% | Time: 1.2s',
        '[EPOCH 2/5] Loss: 0.421 | Accuracy: 89.5% | Time: 1.1s',
        '[EPOCH 3/5] Loss: 0.187 | Accuracy: 96.1% | Time: 1.1s',
        '[EPOCH 4/5] Loss: 0.065 | Accuracy: 98.4% | Time: 1.2s',
        '[EPOCH 5/5] Loss: 0.014 | Accuracy: 99.2% | Time: 1.1s',
        '==> Model Converged! Exporting weights to avathar_model.onnx... DONE.'
      ],
      detect: [
        '$ python detect_stream.py --weights avathar_model.onnx --source video.mp4',
        '[STREAM] Loading video frames at 60 FPS...',
        'FRAME 0102: Found 3 Cars (Conf: 0.99, 0.98, 0.96)',
        'FRAME 0103: Optical Flow Vectors Synced. Trajectory: Forward-Left',
        'FRAME 0104: Edge inference latency: 11.2ms [Optimal]',
        '==> Real-time inference running without frame drops.'
      ],
      agent: [
        '$ avathar-agent --prompt "Design a modern AI curriculum pipeline"',
        '[LLM AGENT] Tokenizing prompt with BPE vocabulary...',
        '[ATTENTION] 32 Attention heads activated across 48 layers',
        'OUTPUT: "Avathar AI Academy Architecture:',
        '  1. Foundations: Python, Neural Calculus, Linear Algebra',
        '  2. Core Models: Transformers, CNNs, Reinforcement Learning',
        '  3. Deployment: Edge AI, TensorRT, Docker, Cloud APIs',
        '  4. Practical Projects: Real-World Portfolios for Students."',
        '==> Stream complete: 84 tokens generated in 0.42s.'
      ]
    };

    let typingTimer = null;

    function typeScript(lines) {
      if (typingTimer) clearInterval(typingTimer);
      terminalOutput.innerHTML = '';
      let lineIdx = 0;

      typingTimer = setInterval(() => {
        if (lineIdx >= lines.length) {
          clearInterval(typingTimer);
          return;
        }

        const p = document.createElement('div');
        p.className = 'terminal-line';
        if (lines[lineIdx].startsWith('$')) {
          p.className += ' terminal-command';
        } else if (lines[lineIdx].includes('==>')) {
          p.className += ' terminal-success';
        }
        p.textContent = lines[lineIdx];
        terminalOutput.appendChild(p);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        lineIdx++;
      }, 180);
    }

    promptButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        promptButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const action = btn.dataset.action;
        if (scripts[action]) {
          typeScript(scripts[action]);
        }
      });
    });

    // Start with default script
    typeScript(scripts.train);
  }

  /* --------------------------------------------------------------------------
     Initialization
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    resizeShowcaseCanvases();
    setupControls();
    setStreamMode('vision');
    init3DCardTilt();
    initAITerminal();

    if (!prefersReducedMotion) {
      animFrameId = requestAnimationFrame(showcaseLoop);
      setInterval(appendTelemetryLog, 2200);
    }
  });

})();
