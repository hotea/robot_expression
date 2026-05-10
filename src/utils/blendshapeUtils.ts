import { type Category } from '@mediapipe/tasks-vision';

export const getBlendshapeValue = (blendshapes: Category[], name: string): number => {
  const shape = blendshapes.find(b => b.categoryName === name);
  return shape ? shape.score : 0;
};
