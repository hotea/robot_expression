import { type Category } from '@mediapipe/tasks-vision';
import { getBlendshapeValue } from './blendshapeUtils';

export interface FaceState {
  eyeL: { open: number; squint: number; wide: number };
  eyeR: { open: number; squint: number; wide: number };
  browL: { up: number; down: number };
  browR: { up: number; down: number };
  mouth: { open: number; smile: number; frown: number; pucker: number; stretch: number };
  head: { rotateX: number; rotateY: number; rotateZ: number };
}

export const mapBlendshapesToState = (blendshapes: Category[]): FaceState => {
  return {
    eyeL: {
      open: 1 - getBlendshapeValue(blendshapes, 'eyeBlinkLeft'),
      squint: getBlendshapeValue(blendshapes, 'eyeSquintLeft'),
      wide: getBlendshapeValue(blendshapes, 'eyeWideLeft'),
    },
    eyeR: {
      open: 1 - getBlendshapeValue(blendshapes, 'eyeBlinkRight'),
      squint: getBlendshapeValue(blendshapes, 'eyeSquintRight'),
      wide: getBlendshapeValue(blendshapes, 'eyeWideRight'),
    },
    browL: {
      up: getBlendshapeValue(blendshapes, 'browOuterUpLeft'),
      down: getBlendshapeValue(blendshapes, 'browDownLeft'),
    },
    browR: {
      up: getBlendshapeValue(blendshapes, 'browOuterUpRight'),
      down: getBlendshapeValue(blendshapes, 'browDownRight'),
    },
    mouth: {
      open: getBlendshapeValue(blendshapes, 'jawOpen'),
      smile: (getBlendshapeValue(blendshapes, 'mouthSmileLeft') + getBlendshapeValue(blendshapes, 'mouthSmileRight')) / 2,
      frown: (getBlendshapeValue(blendshapes, 'mouthFrownLeft') + getBlendshapeValue(blendshapes, 'mouthFrownRight')) / 2,
      pucker: getBlendshapeValue(blendshapes, 'mouthPucker'),
      stretch: (getBlendshapeValue(blendshapes, 'mouthStretchLeft') + getBlendshapeValue(blendshapes, 'mouthStretchRight')) / 2,
    },
    head: {
        // MediaPipe also provides rotation in some tasks, but here we can derive some from asymmetry
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
    }
  };
};
