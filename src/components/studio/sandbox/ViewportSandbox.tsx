import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Group,
  Panel,
  Separator,
  type PanelImperativeHandle,
} from 'react-resizable-panels'
import { CheckCircle2, AlertCircle, GripVertical } from 'lucide-react'
import { IFrameSandbox } from './IFrameSandbox'
import styles from './ViewportSandbox.module.css'

interface ViewportSandboxProps {
  children: React.ReactNode
  preset?: 'desktop' | 'tablet' | 'mobile' | 'fluid'
  onPresetHandled?: () => void
}

export const ViewportSandbox: React.FC<ViewportSandboxProps> = ({
  children,
  preset = 'desktop',
}) => {
  const panelRef = useRef<PanelImperativeHandle>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  // Handle preset resizing targeting true physical device widths
  const applyPreset = useCallback((targetPreset: 'desktop' | 'tablet' | 'mobile' | 'fluid') => {
    if (!panelRef.current) return

    const containerWidth = groupRef.current?.clientWidth ?? 0

    if (targetPreset === 'fluid') {
      panelRef.current.resize('100%')
    } else if (targetPreset === 'mobile') {
      if (containerWidth > 0) {
        const pct = Math.min(100, Math.max(15, (375 / containerWidth) * 100))
        panelRef.current.resize(`${pct.toFixed(2)}%`)
      } else {
        panelRef.current.resize('35%')
      }
    } else if (targetPreset === 'tablet') {
      if (containerWidth > 0) {
        const pct = Math.min(100, Math.max(25, (820 / containerWidth) * 100))
        panelRef.current.resize(`${pct.toFixed(2)}%`)
      } else {
        panelRef.current.resize('65%')
      }
    } else if (targetPreset === 'desktop') {
      if (containerWidth > 1280) {
        const pct = (1280 / containerWidth) * 100
        panelRef.current.resize(`${pct.toFixed(2)}%`)
      } else {
        panelRef.current.resize('100%')
      }
    }
  }, [])

  useEffect(() => {
    applyPreset(preset)
  }, [preset, applyPreset])

  // Height compliance evaluation based on current width
  const { width, height } = dimensions

  const { deviceCategory, minHeight, maxHeight } = (() => {
    if (width <= 640) {
      return { deviceCategory: 'Mobile' as const, minHeight: 330, maxHeight: 520 }
    }
    if (width <= 1024) {
      return { deviceCategory: 'Tablet' as const, minHeight: 380, maxHeight: 540 }
    }
    return { deviceCategory: 'Desktop' as const, minHeight: 410, maxHeight: 450 }
  })()

  const isHeightCompliant = height >= minHeight && height <= maxHeight

  return (
    <div className={`w-100 flex-grow-1 d-flex flex-column ${styles.sandboxWrapper}`}>
      {/* Real-time Dimensions & Compliance Bar */}
      <div className={`d-flex flex-wrap align-items-center justify-content-between gap-2 px-3 py-2 flex-shrink-0 ${styles.statsBar}`}>
        <div className="d-flex align-items-center gap-2">
          <span className={`text-uppercase fw-bold rounded-1 ${styles.deviceBadge}`}>{deviceCategory}</span>
          <span className={`font-monospace ${styles.dimensionText}`}>
            <strong>{width}px</strong> × <strong>{height}px</strong>
          </span>
          <span className={styles.targetRange}>
            (Target: {minHeight}px – {maxHeight}px)
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          {isHeightCompliant ? (
            <span className={`d-inline-flex align-items-center gap-1 fw-semibold rounded-1 ${styles.statusBadge} ${styles.statusCompliant}`}>
              <CheckCircle2 size={13} />
              <span>Height In-Spec</span>
            </span>
          ) : (
            <span className={`d-inline-flex align-items-center gap-1 fw-semibold rounded-1 ${styles.statusBadge} ${styles.statusWarning}`}>
              <AlertCircle size={13} />
              <span>
                {height < minHeight ? `Below Min (${minHeight}px)` : `Exceeds Max (${maxHeight}px)`}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Resizable Canvas Area with Dot Grid */}
      <div className={`w-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center p-3 p-md-4 ${styles.canvasArea}`}>
        <div ref={groupRef} className="w-100 h-100 d-flex align-items-center">
          <Group orientation="horizontal" className={`w-100 flex-grow-1 d-flex align-items-center ${styles.panelGroup}`}>
            <Panel
              panelRef={panelRef}
              defaultSize="100%"
              minSize="20%"
              className={`d-flex flex-column justify-content-center h-100 ${styles.activePanel}`}
            >
              <div className={`w-100 d-flex flex-column justify-content-center my-auto ${styles.previewContainer}`}>
                <IFrameSandbox onDimensionsChange={setDimensions}>
                  {children}
                </IFrameSandbox>
              </div>
            </Panel>

            <Separator className={`d-flex align-items-center justify-content-center user-select-none ${styles.resizeHandle}`}>
              <div className={`d-flex align-items-center justify-content-center rounded-2 ${styles.handleGrip}`}>
                <GripVertical size={14} />
              </div>
            </Separator>

            <Panel defaultSize="0%" minSize="0%" className={styles.emptyPanel} />
          </Group>
        </div>
      </div>
    </div>
  )
}
