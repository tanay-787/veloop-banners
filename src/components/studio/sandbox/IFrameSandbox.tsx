import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface IFrameSandboxProps {
  children: React.ReactNode
  onDimensionsChange?: (dimensions: { width: number; height: number }) => void
}

export const IFrameSandbox: React.FC<IFrameSandboxProps> = ({
  children,
  onDimensionsChange,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)
  const [iframeHeight, setIframeHeight] = useState<number>(450)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const doc = iframe.contentDocument
    if (!doc) return

    // Initialize clean document skeleton
    doc.open()
    doc.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /></head><body><div id="sandbox-mount"></div></body></html>')
    doc.close()

    // Copy head stylesheets, fonts, and inline styles from parent document
    const syncStyles = () => {
      if (!doc.head) return

      // Keep only our injected tags or clear and re-sync
      const existingHeadNodes = Array.from(doc.head.children)
      const parentStyleNodes = Array.from(
        document.head.querySelectorAll('style, link[rel="stylesheet"], link[rel="preconnect"]')
      )

      // Remove obsolete nodes that no longer exist in parent
      existingHeadNodes.forEach((node) => {
        if (node.tagName !== 'META') {
          node.remove()
        }
      })

      // Clone each parent style node into iframe head
      parentStyleNodes.forEach((node) => {
        doc.head.appendChild(node.cloneNode(true))
      })
    }

    syncStyles()

    // Observe changes in parent head (e.g. Vite HMR CSS updates)
    const headObserver = new MutationObserver(() => {
      syncStyles()
    })
    headObserver.observe(document.head, { childList: true, subtree: true })

    // Style iframe HTML and body for seamless transparent preview
    if (doc.documentElement) {
      doc.documentElement.style.height = 'auto'
      doc.documentElement.style.minHeight = '100%'
      doc.documentElement.style.backgroundColor = 'transparent'
    }

    if (doc.body) {
      doc.body.style.margin = '0'
      doc.body.style.padding = '0'
      doc.body.style.backgroundColor = 'transparent'
      doc.body.style.color = '#FEFDFC'
      doc.body.style.fontFamily = "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      doc.body.style.overflow = 'hidden'
      doc.body.style.display = 'flex'
      doc.body.style.flexDirection = 'column'
      doc.body.style.justifyContent = 'center'
      doc.body.style.minHeight = '100%'
    }

    const mount = doc.getElementById('sandbox-mount')
    if (mount) {
      mount.style.width = '100%'
      mount.style.display = 'flex'
      mount.style.flexDirection = 'column'
      mount.style.justifyContent = 'center'
      mount.style.boxSizing = 'border-box'
      setMountNode(mount)
    }

    return () => {
      headObserver.disconnect()
    }
  }, [])

  // Track rendered content dimensions and adjust iframe height
  useEffect(() => {
    if (!mountNode || !iframeRef.current?.contentDocument) return

    const iframeDoc = iframeRef.current.contentDocument

    const updateMeasurements = () => {
      const bannerEl = mountNode.firstElementChild as HTMLElement | null
      const contentWidth = iframeRef.current?.clientWidth ?? (bannerEl ? Math.round(bannerEl.getBoundingClientRect().width) : 0)
      const contentHeight = bannerEl ? Math.round(bannerEl.getBoundingClientRect().height) : mountNode.scrollHeight

      if (contentHeight > 0) {
        setIframeHeight(contentHeight)
      }

      onDimensionsChange?.({
        width: Math.round(contentWidth),
        height: Math.round(contentHeight),
      })
    }

    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements()
    })

    resizeObserver.observe(mountNode)
    if (mountNode.firstElementChild) {
      resizeObserver.observe(mountNode.firstElementChild)
    }

    // Also observe iframe window resize
    const contentWin = iframeDoc.defaultView
    contentWin?.addEventListener('resize', updateMeasurements)

    // Initial measurement
    updateMeasurements()

    return () => {
      resizeObserver.disconnect()
      contentWin?.removeEventListener('resize', updateMeasurements)
    }
  }, [mountNode, onDimensionsChange, children])

  return (
    <iframe
      ref={iframeRef}
      title="Component Studio Viewport"
      style={{
        width: '100%',
        height: `${iframeHeight}px`,
        border: 'none',
        display: 'block',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        transition: 'height 0.15s ease',
      }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
