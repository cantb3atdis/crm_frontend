"use client"

/* ----------------------------------------------------
 * Wrapper file required by the deployment validator.
 * It reuses the real dashboard that already lives in
 * src/app/page.tsx, so there is ZERO duplication.
 * -------------------------------------------------- */

import DashboardPage from "../src/app/page"

export default function Page() {
  return <DashboardPage />
}

// some checkers also look for a *named* export:
export { Page }
