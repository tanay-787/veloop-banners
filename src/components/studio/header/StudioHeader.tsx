import React from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  Layers,
  Sparkles,
  Maximize2,
  RotateCcw,
  Gift,
  type LucideIcon,
  Ad,
  Podium,
  Phone,
  Coins,
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

const BANNERS: { id: BannerId; label: string; number: string; icon: LucideIcon }[] = [
  { id: 'leaderboard', label: 'Leaderboard', number: '01', icon: Podium },
  { id: 'watch-ads', label: 'Watch Ads', number: '02', icon: Ad },
  { id: 'contact-us', label: 'Contact Us', number: '03', icon: Phone },
  { id: 'follow-earn', label: 'Follow & Earn', number: '04', icon: Coins},
  { id: 'daily-bonus', label: 'Daily Bonus', number: '05', icon: Gift },
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
    <header className={`sticky-top w-100 ${styles.header}`}>
      <div className="container-fluid px-3 px-md-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 py-2">
          {/* Left: View Mode Switcher (Bootstrap btn-group) */}
          <div className={`btn-group btn-group-sm p-1 rounded-2 ${styles.modeToggleGroup}`} role="group" aria-label="View Mode">
            <button
              type="button"
              className={`btn d-flex align-items-center gap-1 border-0 fw-semibold rounded-1 ${styles.modeBtn} ${viewMode === 'feed' ? styles.modeBtnActive : ''}`}
              onClick={() => onViewModeChange('feed')}
            >
              <Layers size={14} />
              <span>All Banners</span>
            </button>
            <button
              type="button"
              className={`btn d-flex align-items-center gap-1 border-0 fw-semibold rounded-1 ${styles.modeBtn} ${viewMode === 'studio' ? styles.modeBtnActive : ''}`}
              onClick={() => onViewModeChange('studio')}
            >
              <Sparkles size={14} />
              <span>Studio</span>
            </button>
          </div>

          {/* Center (in Studio mode): Banner Selector Tabs (Bootstrap nav-pills) */}
          {viewMode === 'studio' && (
            <ul className="nav nav-pills flex-nowrap overflow-x-auto gap-3 list-unstyled m-0" role="tablist">
              {BANNERS.map((banner) => {
                const isActive = activeBanner === banner.id
                const IconComponent = banner.icon
                return (
                  <li key={banner.id} className="nav-item" role="presentation">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`nav-link d-flex align-items-center gap-1 border-0 rounded-2 text-nowrap ${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                      onClick={() => onBannerSelect(banner.id)}
                    >
                      {/* <span className={`font-monospace ${styles.tabNum}`}>{banner.number}</span> */}
                      <IconComponent size={14} className={styles.tabIcon} />
                      <span>{banner.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Right (in Studio mode): Viewport Controls (Bootstrap btn-group) */}
          {viewMode === 'studio' && (
            <div className="d-flex align-items-center gap-2">
              <div className={`btn-group btn-group-sm p-1 rounded-2 align-items-center ${styles.viewportControls}`} role="group" aria-label="Viewport Controls">
                <button
                  type="button"
                  title="Fluid Width (100%)"
                  className={`btn d-flex align-items-center gap-1 border-0 rounded-1 ${styles.viewportBtn} ${activePreset === 'fluid' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('fluid')}
                >
                  <Maximize2 size={13} />
                  <span className="d-none d-lg-inline">100% Fluid</span>
                </button>
                <button
                  type="button"
                  title="Desktop View (1280px)"
                  className={`btn d-flex align-items-center gap-1 border-0 rounded-1 ${styles.viewportBtn} ${activePreset === 'desktop' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('desktop')}
                >
                  <Monitor size={13} />
                  <span className="d-none d-lg-inline">Desktop</span>
                </button>
                <button
                  type="button"
                  title="Tablet View (768px)"
                  className={`btn d-flex align-items-center gap-1 border-0 rounded-1 ${styles.viewportBtn} ${activePreset === 'tablet' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('tablet')}
                >
                  <Tablet size={13} />
                  <span className="d-none d-lg-inline">Tablet</span>
                </button>
                <button
                  type="button"
                  title="Mobile View (375px)"
                  className={`btn d-flex align-items-center gap-1 border-0 rounded-1 ${styles.viewportBtn} ${activePreset === 'mobile' ? styles.viewportBtnActive : ''}`}
                  onClick={() => onPresetChange?.('mobile')}
                >
                  <Smartphone size={13} />
                  <span className="d-none d-lg-inline">Mobile</span>
                </button>

                {/* Native Bootstrap Vertical Rule */}
                <div className="vr mx-1 my-1 opacity-25" />

                <button
                  type="button"
                  title="Reset Preview"
                  className={`btn d-flex align-items-center justify-content-center border-0 rounded-1 p-1 ${styles.iconBtn}`}
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
