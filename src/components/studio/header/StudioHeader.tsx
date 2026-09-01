import React from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  Layers,
  Sparkles,
  Maximize2,
  RotateCcw,
} from 'lucide-react'
import styles from './StudioHeader.module.css'

export type ViewMode = 'feed' | 'studio'
export type BannerId = 'leaderboard' | 'watch-ads' | 'contact-us' | 'follow-earn' | 'daily-bonus'

interface StudioHeaderProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  activeBanner: BannerId
  onBannerSelect: (id: BannerId) => void
  onPresetChange?: (preset: 'desktop' | 'tablet' | 'mobile' | 'fluid') => void
  activePreset?: 'desktop' | 'tablet' | 'mobile' | 'fluid'
  onResetView?: () => void
}

const BANNERS: { id: BannerId; label: string; number: string; icon: string }[] = [
  { id: 'leaderboard', label: 'Leaderboard', number: '01', icon: '🏆' },
  { id: 'watch-ads', label: 'Watch Ads', number: '02', icon: '📺' },
  { id: 'contact-us', label: 'Contact Us', number: '03', icon: '🎧' },
  { id: 'follow-earn', label: 'Follow & Earn', number: '04', icon: '📱' },
  { id: 'daily-bonus', label: 'Daily Bonus', number: '05', icon: '🎁' },
]

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  viewMode,
  onViewModeChange,
  activeBanner,
  onBannerSelect,
  onPresetChange,
  activePreset = 'desktop',
  onResetView,
}) => {
  return (
    <header className={styles.header}>
      <div className="container-fluid px-3 px-md-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 py-2">
          {/* Left: View Mode Switcher */}
          <div className={styles.modeToggleGroup}>
            <button
              type="button"
              className={`${styles.modeBtn} ${viewMode === 'feed' ? styles.modeBtnActive : ''}`}
              onClick={() => onViewModeChange('feed')}
            >
              <Layers size={14} />
              <span>All Banners</span>
            </button>
            <button
              type="button"
              className={`${styles.modeBtn} ${viewMode === 'studio' ? styles.modeBtnActive : ''}`}
              onClick={() => onViewModeChange('studio')}
            >
              <Sparkles size={14} />
              <span>Studio</span>
            </button>
          </div>

          {/* Center (in Studio mode): Banner Selector Tabs */}
          {viewMode === 'studio' && (
            <div className={`${styles.tabGroup} d-flex align-items-center gap-1 overflow-x-auto`}>
              {BANNERS.map((banner) => {
                const isActive = activeBanner === banner.id
                return (
                  <button
                    key={banner.id}
                    type="button"
                    className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                    onClick={() => onBannerSelect(banner.id)}
                  >
                    <span className={styles.tabNum}>{banner.number}</span>
                    <span className={styles.tabIcon}>{banner.icon}</span>
                    <span className={styles.tabLabel}>{banner.label}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Right (in Studio mode): Viewport Controls */}
          {viewMode === 'studio' && (
            <div className="d-flex align-items-center gap-2">
              <div className={styles.viewportControls}>
                <button
                  type="button"
                  title="Fluid Width (100%)"
                  className={`${styles.viewportBtn} ${activePreset === 'fluid' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('fluid')}
                >
                  <Maximize2 size={13} />
                  <span className="d-none d-lg-inline">100% Fluid</span>
                </button>
                <button
                  type="button"
                  title="Desktop View (1280px)"
                  className={`${styles.viewportBtn} ${activePreset === 'desktop' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('desktop')}
                >
                  <Monitor size={13} />
                  <span className="d-none d-lg-inline">Desktop</span>
                </button>
                <button
                  type="button"
                  title="Tablet View (768px)"
                  className={`${styles.viewportBtn} ${activePreset === 'tablet' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('tablet')}
                >
                  <Tablet size={13} />
                  <span className="d-none d-lg-inline">Tablet</span>
                </button>
                <button
                  type="button"
                  title="Mobile View (375px)"
                  className={`${styles.viewportBtn} ${activePreset === 'mobile' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('mobile')}
                >
                  <Smartphone size={13} />
                  <span className="d-none d-lg-inline">Mobile</span>
                </button>

                <div className={styles.divider} />

                <button
                  type="button"
                  title="Reset Preview"
                  className={styles.iconBtn}
                  onClick={onResetView}
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
