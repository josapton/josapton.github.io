import { useCallback, useEffect, useRef } from 'react'

export default function Particles({
  className = '',
  quantity = 50,
  staticity = 50,
  ease = 50,
}) {
  const canvasRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const context = useRef(null)
  const circles = useRef([])
  const mouse = useRef({ x: 0, y: 0, active: false })
  const canvasSize = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = []
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      initCircles()
    }
  }, [dpr])

  const circleParams = useCallback(() => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const size = Math.floor(Math.random() * 1.5) + 0.5
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.4 + 0.1).toFixed(2))
    const dx = (Math.random() - 0.5) * 0.2
    const dy = (Math.random() - 0.5) * 0.2
    const magnetism = 0.1 + Math.random() * 4
    return { x, y, translateX: 0, translateY: 0, size, alpha, targetAlpha, dx, dy, magnetism }
  }, [])

  const initCircles = useCallback(() => {
    for (let i = 0; i < quantity; i++) {
      circles.current.push(circleParams())
    }
  }, [quantity, circleParams])

  const getColor = useCallback(() => {
    const theme = document.documentElement.getAttribute('data-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = theme === 'dark' || (!theme && prefersDark)
    // Darker green for light mode, vibrant green for dark mode
    return isDark ? '0, 230, 138' : '5, 150, 105'
  }, [])

  const drawCircle = useCallback((circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle
      const rgb = getColor()
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, size, 0, 2 * Math.PI)
      context.current.fillStyle = `rgba(${rgb}, ${alpha})`
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!update) circles.current.push(circle)
    }
  }, [dpr, getColor])

  const drawLines = useCallback(() => {
    if (!context.current) return
    const rgb = getColor()
    const maxDistance = 120 // Maximum distance to draw a connecting line

    for (let i = 0; i < circles.current.length; i++) {
      const p1 = circles.current[i]
      const x1 = p1.x + p1.translateX
      const y1 = p1.y + p1.translateY

      // Connect to other particles
      for (let j = i + 1; j < circles.current.length; j++) {
        const p2 = circles.current[j]
        const x2 = p2.x + p2.translateX
        const y2 = p2.y + p2.translateY

        const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.35 // Increased from 0.2
          context.current.beginPath()
          context.current.moveTo(x1, y1)
          context.current.lineTo(x2, y2)
          context.current.strokeStyle = `rgba(${rgb}, ${opacity * p1.alpha})`
          context.current.lineWidth = 0.5
          context.current.stroke()
        }
      }

      // Connect to mouse if active
      if (mouse.current.active) {
        const mouseDist = Math.sqrt(
          Math.pow(x1 - (mouse.current.x + canvasSize.current.w / 2), 2) + 
          Math.pow(y1 - (mouse.current.y + canvasSize.current.h / 2), 2)
        )

        if (mouseDist < maxDistance * 1.5) {
          const opacity = (1 - mouseDist / (maxDistance * 1.5)) * 0.5 // Increased from 0.3
          context.current.beginPath()
          context.current.moveTo(x1, y1)
          context.current.lineTo(mouse.current.x + canvasSize.current.w / 2, mouse.current.y + canvasSize.current.h / 2)
          context.current.strokeStyle = `rgba(${rgb}, ${opacity * p1.alpha})`
          context.current.lineWidth = 0.5
          context.current.stroke()
        }
      }
    }
  }, [getColor])

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }, [])

  const animate = useCallback(() => {
    clearContext()
    
    // Update and draw circles
    circles.current.forEach((circle, i) => {
      // Fade in logic
      if (circle.alpha < circle.targetAlpha) {
        circle.alpha += 0.02
      }

      circle.x += circle.dx
      circle.y += circle.dy
      
      // Parallax effect with mouse
      if (mouse.current.active) {
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease
      }

      // Wrap around edges
      if (circle.x < -circle.size) circle.x = canvasSize.current.w + circle.size
      if (circle.x > canvasSize.current.w + circle.size) circle.x = -circle.size
      if (circle.y < -circle.size) circle.y = canvasSize.current.h + circle.size
      if (circle.y > canvasSize.current.h + circle.size) circle.y = -circle.size

      drawCircle(circle, true)
    })

    // Draw connecting lines (Network Nodes effect)
    drawLines()

    window.requestAnimationFrame(animate)
  }, [clearContext, drawCircle, drawLines, ease, staticity])

  useEffect(() => {
    if (canvasRef.current) context.current = canvasRef.current.getContext('2d')
    resizeCanvas()
    animate()
    window.addEventListener('resize', resizeCanvas)

    const onMouseMove = (e) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const { w, h } = canvasSize.current
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const inside = x >= 0 && x <= w && y >= 0 && y <= h
        
        if (inside) {
          mouse.current.x = x - w / 2
          mouse.current.y = y - h / 2
          mouse.current.active = true
        } else {
          mouse.current.active = false
        }
      }
    }

    const onMouseLeave = () => {
      mouse.current.active = false
    }

    window.addEventListener('mousemove', onMouseMove)
    if (canvasContainerRef.current) {
      canvasContainerRef.current.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', onMouseMove)
      if (canvasContainerRef.current) {
        canvasContainerRef.current.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [resizeCanvas, animate])

  return (
    <div ref={canvasContainerRef} className={className} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
