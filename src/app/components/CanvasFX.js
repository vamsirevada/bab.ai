"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// CanvasFX: lightweight Three.js background with interactive orbs/particles
// Props:
// - variant: 'orbs' | 'stars' (default 'orbs')
// - colors: array of hex strings
// - count: number of points
// - className/style: container styles (canvas fills container)
// - dpr: device pixel ratio cap
export default function CanvasFX({
  variant = 'orbs',
  colors = ['#e5e7eb', '#94a3b8', '#cbd5e1'],
  count = 220,
  className = '',
  style,
  dpr = 1.75,
}) {
  const containerRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dpr))
    renderer.setClearColor(0x000000, 0) // transparent
    container.appendChild(renderer.domElement)

    // Resize handling
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container
      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(1, h)
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    // Create geometry/material
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)
    const colorsArr = new Float32Array(count * 3)
    const palette = colors.map((c) => new THREE.Color(c))

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      positions[i * 3 + 0] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      speeds[i] = 0.001 + Math.random() * 0.003
      sizes[i] = 1 + Math.random() * 2.5
      const col = palette[i % palette.length]
      colorsArr[i * 3 + 0] = col.r
      colorsArr[i * 3 + 1] = col.g
      colorsArr[i * 3 + 2] = col.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('customSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArr, 3))

    const material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Lights for orbs variant (subtle)
    if (variant === 'orbs') {
      const dir = new THREE.DirectionalLight(0xffffff, 0.2)
      dir.position.set(3, 2, 5)
      scene.add(dir)
      const amb = new THREE.AmbientLight(0xffffff, 0.3)
      scene.add(amb)
    }

    // Interaction state
    let t = 0
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouseMove)

    let scrollY = window.scrollY
    const onScroll = () => {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const animate = () => {
      t += 0.016
      const pos = geometry.getAttribute('position')
      for (let i = 0; i < count; i++) {
        let x = pos.getX(i)
        let y = pos.getY(i)
        let z = pos.getZ(i)
        const s = speeds[i]
        // subtle drift with parallax from mouse and scroll
        x += Math.sin(t * (0.6 + s) + i) * 0.002 + mouse.x * 0.003
        y += Math.cos(t * (0.5 + s) + i) * 0.002 + mouse.y * 0.003
        z += Math.sin(t * (0.4 + s) + i) * 0.002 + (scrollY % 1000) * 0.00002
        // wrap to keep points within a sphere-ish boundary
        const r = Math.sqrt(x * x + y * y + z * z)
        if (r > 5) {
          x *= 0.95; y *= 0.95; z *= 0.95
        }
        pos.setXYZ(i, x, y, z)
      }
      pos.needsUpdate = true

      // subtle camera parallax
      camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.05
      camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      renderer.render(scene, camera)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [variant, colors, count, dpr])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}
