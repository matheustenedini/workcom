/* eslint-disable no-unused-expressions */
export type TUseGetElementPositionReturn = {
  top: number;
  left: number;
  height: number;
  width: number;
};

const useGetElementPosition = (
  el: HTMLElement | null | undefined,
  offSet?: boolean,
  inset?: [number, number] | undefined
): TUseGetElementPositionReturn => {
  if (el) {
    const bounding = el.getBoundingClientRect();
    let left;
    let { top } = bounding;
    if (offSet) {
      left = el.offsetLeft;
    } else {
      left = bounding.left;
    }
    const { height } = bounding;
    const { width } = bounding;
    if (inset) {
      top += inset[1];
      left += inset[0];
    }
    return { top, left, height, width };
  }
  return { top: 0, left: 0, height: 0, width: 0 };
};
export default useGetElementPosition;
