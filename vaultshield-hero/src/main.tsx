import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import VaultShieldHero from './VaultShieldHero';
import './index.css';

const root = document.getElementById('vaultshield-hero-root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <VaultShieldHero />
    </StrictMode>
  );
}
