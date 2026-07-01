/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FarmProvider } from './state/FarmContext';
import { WebsiteUI } from './components/WebsiteUI';

export default function App() {
  return (
    <FarmProvider>
      <WebsiteUI />
    </FarmProvider>
  );
}

