/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FarmProvider } from './state/FarmContext';
import { WebsiteUI } from './components/WebsiteUI';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  const [viewMode, setViewMode] = useState<'web' | 'admin'>('web');

  return (
    <FarmProvider>
      {viewMode === 'web' ? (
        <WebsiteUI onAcederPortal={() => setViewMode('admin')} />
      ) : (
        <AdminPortal onVoltarAoSite={() => setViewMode('web')} />
      )}
    </FarmProvider>
  );
}

