import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const DENSE_PARTICLE_COUNT = 6200
const BEACON_PARTICLE_COUNT = 550
const RIM_PARTICLE_COUNT = 1600
const TOTAL_PARTICLES = DENSE_PARTICLE_COUNT + BEACON_PARTICLE_COUNT + RIM_PARTICLE_COUNT // 8,350 particles

const BALL_RADIUS = 2.85

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    setSupported(hasWebGL())
  }, [])

  useEffect(() => {
    if (!supported) return
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      setSupported(false)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 7.0)

    // Master ball group
    const ballGroup = new THREE.Group()
    scene.add(ballGroup)

    // Deep void core sphere body - occludes back particles so the ball has genuine 3D spherical depth
    const coreGeo = new THREE.SphereGeometry(BALL_RADIUS * 0.985, 48, 48)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x030705 })
    ballGroup.add(new THREE.Mesh(coreGeo, coreMat))

    // ========================================================
    // 1. MULTI-TIER LUMINOUS PARTICLE SHELL (8,350 PARTICLES)
    // ========================================================
    const positions = new Float32Array(TOTAL_PARTICLES * 3)
    const colors = new Float32Array(TOTAL_PARTICLES * 3)
    const sizes = new Float32Array(TOTAL_PARTICLES)
    const phases = new Float32Array(TOTAL_PARTICLES)
    const speeds = new Float32Array(TOTAL_PARTICLES)

    const neonMint = new THREE.Color('#00ff9d')
    const brightMint = new THREE.Color('#34d399')
    const emeraldGlow = new THREE.Color('#10b981')
    const deepEmerald = new THREE.Color('#059669')
    const richTeal = new THREE.Color('#047857')
    const diamondWhite = new THREE.Color('#ffffff')

    let pIdx = 0

    // A. Dense Luminous Shell (6,200 particles)
    for (let i = 0; i < DENSE_PARTICLE_COUNT; i++, pIdx++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = BALL_RADIUS * (0.985 + Math.random() * 0.035)

      positions[pIdx * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[pIdx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[pIdx * 3 + 2] = r * Math.cos(phi)

      const roll = Math.random()
      let c: THREE.Color
      if (roll < 0.16) {
        c = diamondWhite.clone()
      } else if (roll < 0.65) {
        c = neonMint.clone().lerp(brightMint, Math.random() * 0.4)
      } else if (roll < 0.88) {
        c = emeraldGlow.clone().lerp(deepEmerald, Math.random() * 0.3)
      } else {
        c = richTeal.clone()
      }

      colors[pIdx * 3] = c.r
      colors[pIdx * 3 + 1] = c.g
      colors[pIdx * 3 + 2] = c.b

      sizes[pIdx] = roll < 0.16 ? 2.4 : 1.2 + Math.random() * 1.1
      phases[pIdx] = Math.random() * Math.PI * 2
      speeds[pIdx] = 1.5 + Math.random() * 2.5
    }

    // B. Brilliant Pulsar Beacon Nodes (550 particles)
    for (let i = 0; i < BEACON_PARTICLE_COUNT; i++, pIdx++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = BALL_RADIUS * (0.995 + Math.random() * 0.03)

      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )

      positions[pIdx * 3] = pos.x
      positions[pIdx * 3 + 1] = pos.y
      positions[pIdx * 3 + 2] = pos.z

      const roll = Math.random()
      const c = roll < 0.45 ? diamondWhite : roll < 0.85 ? neonMint : brightMint
      colors[pIdx * 3] = c.r
      colors[pIdx * 3 + 1] = c.g
      colors[pIdx * 3 + 2] = c.b

      sizes[pIdx] = 3.2 + Math.random() * 1.8 // Large prominent glowing star nodes
      phases[pIdx] = Math.random() * Math.PI * 2
      speeds[pIdx] = 2.0 + Math.random() * 3.0
    }

    // C. Ethereal Atmospheric Limb / Rim Corona Particles (1,600 particles)
    // Concentrated along the upper horizon silhouette so the dome edge pops dramatically!
    for (let i = 0; i < RIM_PARTICLE_COUNT; i++, pIdx++) {
      const theta = Math.random() * Math.PI * 2
      // Concentrate phi near upper hemisphere horizon (phi around 0.6 to 1.8 rad)
      const phi = 0.5 + Math.random() * 1.4
      const r = BALL_RADIUS * (1.00 + Math.random() * 0.05)

      positions[pIdx * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[pIdx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[pIdx * 3 + 2] = r * Math.cos(phi)

      const roll = Math.random()
      const c = roll < 0.35 ? diamondWhite : roll < 0.85 ? neonMint : emeraldGlow
      colors[pIdx * 3] = c.r
      colors[pIdx * 3 + 1] = c.g
      colors[pIdx * 3 + 2] = c.b

      sizes[pIdx] = 1.6 + Math.random() * 1.6
      phases[pIdx] = Math.random() * Math.PI * 2
      speeds[pIdx] = 1.8 + Math.random() * 2.0
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    particleGeo.setAttribute('phase', new THREE.BufferAttribute(phases, 1))
    particleGeo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1))

    // High-performance custom glowing celestial star shader
    const particleUniforms = {
      uPixelRatio: { value: renderer.getPixelRatio() },
      uTime: { value: 0 },
    }

    const particleMat = new THREE.ShaderMaterial({
      uniforms: particleUniforms,
      vertexShader: `
        attribute float size;
        attribute float phase;
        attribute float speed;
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float uPixelRatio;
        uniform float uTime;

        void main() {
          vColor = color;

          // Gentle harmonic wave pulsation
          float wave = sin(position.x * 2.2 + uTime * 1.3) * cos(position.y * 2.2 + uTime * 1.1) * 0.022;
          vec3 pos = position * (1.0 + wave);

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);

          // Living shimmer twinkle
          vTwinkle = 0.82 + 0.36 * sin(phase + uTime * speed);

          gl_PointSize = size * uPixelRatio * (9.2 / -mv.z) * vTwinkle;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;

        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p);
          if (d > 0.5) discard;

          // Double-layer glowing stellar point:
          // Blazing white-hot core + soft atmospheric halo
          float core = exp(-d * 6.5);
          float halo = smoothstep(0.5, 0.0, d);
          float alpha = (core * 1.45 + halo * 0.50) * vTwinkle;

          // Blend center towards pure brilliant white
          vec3 finalColor = mix(vColor, vec3(1.0), core * 0.70);

          gl_FragColor = vec4(finalColor, alpha);
        }`,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    ballGroup.add(particles)



    // ========================================================
    // 4. RADIANT CELESTIAL HORIZON GLOW (SUNRISE AURA)
    // ========================================================
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = 1024
    glowCanvas.height = 1024
    const gctx = glowCanvas.getContext('2d')!
    const grad = gctx.createRadialGradient(512, 512, 0, 512, 512, 512)
    grad.addColorStop(0.0, 'rgba(0, 255, 157, 0.45)')   // Intense radiant neon mint core
    grad.addColorStop(0.2, 'rgba(52, 211, 153, 0.30)')   // Vibrant mint
    grad.addColorStop(0.42, 'rgba(16, 185, 129, 0.18)') // Emerald aura
    grad.addColorStop(0.68, 'rgba(5, 150, 105, 0.05)')  // Soft outer feather
    grad.addColorStop(0.88, 'rgba(0, 255, 157, 0.008)') // Ethereal mist
    grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)')          // 100% transparent zero alpha!
    gctx.fillStyle = grad
    gctx.fillRect(0, 0, 1024, 1024)

    const glowTex = new THREE.CanvasTexture(glowCanvas)
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const glowSprite = new THREE.Sprite(glowMat)
    glowSprite.scale.set(BALL_RADIUS * 2.45, BALL_RADIUS * 2.45, 1)
    glowSprite.position.set(0, BALL_RADIUS * 0.16, -0.18)
    ballGroup.add(glowSprite)

    // ========================================================
    // 5. RESPONSIVE SIZING & DYNAMIC POSITIONING
    // ========================================================
    function resize() {
      const { clientWidth, clientHeight } = canvas as HTMLCanvasElement
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()

      const vFOV = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * camera.position.z * Math.tan(vFOV / 2)

      const isMobile = clientWidth < 640

      // Desired diameter: responsive, wide celestial dome (~76% of width on desktop)
      const targetDiameterPx = isMobile
        ? Math.min(clientWidth * 0.96, 440)
        : Math.min(1180, Math.max(520, clientWidth * 0.76))

      const radiusWorld = (targetDiameterPx / clientHeight) * (visibleHeight / 2)

      // Apex positioned around 40% from top on desktop (framing the CTA area)
      const apexFraction = isMobile ? 0.44 : 0.40
      const targetApexPixelY = clientHeight * apexFraction
      const targetApexWorldY = (0.5 - targetApexPixelY / clientHeight) * visibleHeight

      // Position the ball group so its top horizon is at targetApexWorldY
      ballGroup.position.y = targetApexWorldY - radiusWorld
      const s = radiusWorld / BALL_RADIUS
      ballGroup.scale.set(s, s, s)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // ========================================================
    // 6. GENTLE INTERACTIVE MOUSE PARALLAX & ROTATION
    // ========================================================
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    function onPointerMove(e: MouseEvent) {
      if (reduced) return
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.28
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.20
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    let raf = 0
    let last = performance.now()

    function animate(now: number) {
      raf = requestAnimationFrame(animate)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      // Update shader time for organic star twinkling and waves
      particleUniforms.uTime.value = now * 0.001

      if (!reduced) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.045
        currentMouseY += (targetMouseY - currentMouseY) * 0.045

        ballGroup.rotation.x = currentMouseY
        ballGroup.rotation.y += dt * 0.12 + (currentMouseX - ballGroup.rotation.y) * 0.03
        particles.rotation.y -= dt * 0.025
      }

      renderer.render(scene, camera)
    }

    raf = requestAnimationFrame(animate)
    if (reduced) renderer.render(scene, camera)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      ro.disconnect()
      particleGeo.dispose()
      particleMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      glowTex.dispose()
      glowMat.dispose()
      renderer.dispose()
    }
  }, [supported])

  if (!supported) {
    return <div className="globe-wrap globe-fallback" aria-hidden="true" />
  }

  return (
    <div className="globe-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="globe-canvas" />
    </div>
  )
}
