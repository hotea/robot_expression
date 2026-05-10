import { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver, type Category } from '@mediapipe/tasks-vision';

export const useFaceLandmarker = () => {
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
  const [blendshapes, setBlendshapes] = useState<Category[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef<number>(undefined);

  useEffect(() => {
    const initFaceLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true,
        runningMode: "VIDEO",
        numFaces: 1
      });
      setFaceLandmarker(landmarker);
    };

    initFaceLandmarker();
  }, []);

  useEffect(() => {
    const animate = () => {
      if (faceLandmarker && videoRef.current && videoRef.current.readyState >= 2) {
        const startTimeMs = performance.now();
        const results = faceLandmarker.detectForVideo(videoRef.current, startTimeMs);

        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
          setBlendshapes(results.faceBlendshapes[0].categories);
        }

        if (results.facialTransformationMatrixes && results.facialTransformationMatrixes.length > 0) {
            const matrix = results.facialTransformationMatrixes[0].data;
            // Extract Euler angles from rotation matrix
            // Simplified extraction for visualization
            const ry = Math.atan2(matrix[8], matrix[10]);
            const rx = Math.atan2(-matrix[9], Math.sqrt(matrix[8] * matrix[8] + matrix[10] * matrix[10]));
            const rz = Math.atan2(matrix[4], matrix[0]);

            setRotation({
                x: rx * (180 / Math.PI),
                y: ry * (180 / Math.PI),
                z: rz * (180 / Math.PI)
            });
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    const setupCamera = async () => {
      if (!videoRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          animate();
        };
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    if (faceLandmarker) {
        setupCamera();
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [faceLandmarker]);

  return { blendshapes, rotation, videoRef };
};
