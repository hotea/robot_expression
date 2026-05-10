# Robot Face Expression Mirror

A real-time facial expression mirror using MediaPipe and React.

## Features
- Real-time face landmarker tracking (52 blendshapes).
- Minimalist robot face styles: EVE (Wall-E style) and Geometric.
- Smooth animations using Framer Motion.
- Head rotation tracking (Euler angles).
- Deployed on GitHub Pages via GitHub Actions.

## Tech Stack
- **Framework**: React + TypeScript + Vite
- **AI Library**: @mediapipe/tasks-vision
- **Animations**: Framer Motion
- **Icons**: Lucide-React

## How to use
1. Allow camera access.
2. Mirror your facial expressions (blink, smile, frown, raise brows).
3. Toggle styles and camera preview using the bottom control bar.
