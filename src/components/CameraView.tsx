import React from 'react';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const CameraView: React.FC<CameraViewProps> = ({ videoRef }) => {
  return (
    <video
      ref={videoRef}
      style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
      playsInline
      muted
    />
  );
};

export default CameraView;
