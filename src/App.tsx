import { useState } from 'react';
import RobotFace from './components/RobotFace';
import CameraView from './components/CameraView';
import Controls from './components/Controls';
import { useFaceLandmarker } from './hooks/useFaceLandmarker';
import './App.css';

function App() {
  const [style, setStyle] = useState<'eve' | 'geometric'>('eve');
  const [showCamera, setShowCamera] = useState(false);
  const { blendshapes, rotation, videoRef } = useFaceLandmarker();

  return (
    <div className="app-container">
      <div className="face-container">
        <RobotFace blendshapes={blendshapes} rotation={rotation} style={style} />
      </div>

      <div className="camera-overlay" style={{ display: showCamera ? 'block' : 'none' }}>
        <CameraView videoRef={videoRef} />
      </div>

      <Controls
        style={style}
        setStyle={setStyle}
        showCamera={showCamera}
        setShowCamera={setShowCamera}
      />
    </div>
  );
}

export default App;
