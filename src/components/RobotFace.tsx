import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { type Category } from '@mediapipe/tasks-vision';
import { mapBlendshapesToState } from '../utils/expressionMapper';

interface RobotFaceProps {
  blendshapes: Category[];
  rotation: { x: number; y: number; z: number };
  style: 'eve' | 'geometric';
}

const RobotFace: React.FC<RobotFaceProps> = ({ blendshapes, rotation, style }) => {
  const state = useMemo(() => mapBlendshapesToState(blendshapes), [blendshapes]);

  const springConfig = { type: "spring", stiffness: 300, damping: 30 } as const;

  const isEve = style === 'eve';
  const color = isEve ? '#00e5ff' : '#ffffff';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <motion.div
        style={{ width: 600, height: 600 }}
        animate={{
            rotateX: rotation.x * 0.5,
            rotateY: rotation.y * 0.5,
            rotateZ: rotation.z * 0.2,
        }}
        transition={springConfig}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
            {isEve && (
            <defs>
                <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
                </radialGradient>
            </defs>
            )}

            {/* Brows */}
            <g>
            <motion.path
                d="M 120 130 Q 150 120 180 130"
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                animate={{
                d: `M 120 ${130 - state.browL.up * 15 + state.browL.down * 10} Q 150 ${120 - state.browL.up * 20 + state.browL.down * 5} 180 ${130 - state.browL.up * 10 + state.browL.down * 15}`,
                rotate: state.browL.down * 15 - state.browL.up * 5
                }}
                transition={springConfig}
            />
            <motion.path
                d="M 220 130 Q 250 120 280 130"
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                animate={{
                d: `M 220 ${130 - state.browR.up * 15 + state.browR.down * 10} Q 250 ${120 - state.browR.up * 20 + state.browR.down * 5} 280 ${130 - state.browR.up * 10 + state.browR.down * 15}`,
                rotate: -(state.browR.down * 15 - state.browR.up * 5)
                }}
                transition={springConfig}
            />
            </g>

            {/* Eyes */}
            <g>
            <motion.g animate={{ scaleY: state.eyeL.open, scaleX: 1 + state.eyeL.wide * 0.2 }} transition={springConfig}>
                <motion.ellipse
                    cx="150" cy="200"
                    rx="30" ry="35"
                    fill={color}
                    style={{ filter: isEve ? 'blur(1px)' : 'none' }}
                />
                {isEve && <circle cx="150" cy="200" r="45" fill="url(#eyeGlow)" />}
            </motion.g>

            <motion.g animate={{ scaleY: state.eyeR.open, scaleX: 1 + state.eyeR.wide * 0.2 }} transition={springConfig}>
                <motion.ellipse
                    cx="250" cy="200"
                    rx="30" ry="35"
                    fill={color}
                    style={{ filter: isEve ? 'blur(1px)' : 'none' }}
                />
                {isEve && <circle cx="250" cy="200" r="45" fill="url(#eyeGlow)" />}
            </motion.g>
            </g>

            {!isEve && (
            <motion.path
                d="M 200 230 L 190 260 L 210 260 Z"
                fill="none"
                stroke={color}
                strokeWidth="3"
                animate={{ y: state.mouth.open * 5 }}
                transition={springConfig}
            />
            )}

            {/* Mouth */}
            <g transform="translate(200, 310)">
            <motion.path
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                animate={{
                    d: `M ${-40 - state.mouth.stretch * 10 - state.mouth.pucker * 10} ${-state.mouth.frown * 15} Q 0 ${state.mouth.open * 60 + state.mouth.smile * 30 - state.mouth.frown * 20} ${40 + state.mouth.stretch * 10 + state.mouth.pucker * 10} ${-state.mouth.frown * 15}`,
                }}
                transition={springConfig}
            />
            </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default RobotFace;
