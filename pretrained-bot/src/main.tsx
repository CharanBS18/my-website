import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PretrainedBotOrbital from './PretrainedBotOrbital';
import './index.css';

const root = document.getElementById('pretrained-bot-root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <PretrainedBotOrbital />
    </StrictMode>
  );
}
