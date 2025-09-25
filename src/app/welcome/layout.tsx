import type { ReactNode } from 'react';

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-