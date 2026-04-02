'use client';

import { LayoutGroup } from 'motion/react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <LayoutGroup>{children}</LayoutGroup>;
}
