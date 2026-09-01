import React, { useState } from 'react'
import { StudioHeader, type ViewMode, type BannerId } from '@/components/studio/header/StudioHeader'
import { ViewportSandbox } from '@/components/studio/sandbox/ViewportSandbox'
import styles from './StudioShell.module.css'

interface StudioShellProps {
  // Banner components rendered as children or slots
  renderBanner?: (bannerId: BannerId) => React.ReactNode
  renderAllBanners?: () => React.ReactNode
}

export const StudioShell: React.FC<StudioShellProps> = ({
  renderBanner,
  renderAllBanners,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('feed')
  const [activeBanner, setActiveBanner] = useState<BannerId>('leaderboard')
  const [activePreset, setActivePreset] = useState<'desktop' | 'tablet' | 'mobile' | 'fluid'>('desktop')

  const handleResetView = () => {
    setActivePreset('desktop')
  }

  return (
    <div className={styles.shell}>
      {/* Studio Header Toolbar */}
      <StudioHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeBanner={activeBanner}
        onBannerSelect={setActiveBanner}
        activePreset={activePreset}
        onPresetChange={setActivePreset}
        onResetView={handleResetView}
      />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {viewMode === 'feed' ? (
          /* Feed Mode: Full-width stacked view of all banners */
          <div className="container-fluid px-3 px-md-4 py-4">
            <div className={styles.feedContainer}>
              {renderAllBanners ? (
                renderAllBanners()
              ) : (
                <div className={styles.placeholderCard}>
                  <p>All banners feed will be displayed here.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Studio Mode: Resizable Sandbox Viewport */
          <div className={styles.studioContainer}>
            <ViewportSandbox preset={activePreset}>
              {renderBanner ? (
                renderBanner(activeBanner)
              ) : (
                <div className={styles.placeholderCard}>
                  <p>Active Banner: {activeBanner}</p>
                </div>
              )}
            </ViewportSandbox>
          </div>
        )}
      </main>
    </div>
  )
}
