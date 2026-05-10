import React from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface ControlsProps {
  style: 'eve' | 'geometric';
  setStyle: (style: 'eve' | 'geometric') => void;
  showCamera: boolean;
  setShowCamera: (show: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({ style, setStyle, showCamera, setShowCamera }) => {
  return (
    <div className="controls-panel">
      <button
        className={style === 'eve' ? 'active' : ''}
        onClick={() => setStyle('eve')}
      >
        EVE Style
      </button>
      <button
        className={style === 'geometric' ? 'active' : ''}
        onClick={() => setStyle('geometric')}
      >
        Geometric Style
      </button>
      <div style={{ width: 1, background: 'rgba(255,255,255,0.2)', margin: '0 10px' }} />
      <button onClick={() => setShowCamera(!showCamera)}>
        {showCamera ? <CameraOff size={20} /> : <Camera size={20} />}
      </button>
    </div>
  );
};

export default Controls;
