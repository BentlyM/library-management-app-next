interface ScrollToOptions {
  element: HTMLElement;
  to: number;
  duration: number;
  scrollDirection: 'scrollTop' | 'scrollLeft';
  callback?: () => void;
  context?: unknown;
}

interface MouseCoords {
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
}

function scrollTo({
  element,
  to,
  duration,
  scrollDirection,
  callback = () => {},
  context = null,
}: ScrollToOptions): Promise<void> {
  return new Promise((res) => {
    const start = element[scrollDirection] as number;
    const change = to - start;
    const increment = 1000 / 60;

    const animateScroll = (elapsedTime: number): void => {
      elapsedTime += increment;
      const position = easeInOut(elapsedTime, start, change, duration);
      element[scrollDirection] = position;

      if (elapsedTime < duration) {
        window.requestAnimationFrame(() => animateScroll(elapsedTime));
      } else {
        callback.call(context);
        res();
      }
    };

    window.requestAnimationFrame(() => animateScroll(0));
  });
}

function easeInOut(
  currentTime: number,
  start: number,
  change: number,
  duration: number
): number {
  currentTime /= duration / 2;
  if (currentTime < 1) {
    return (change / 2) * currentTime * currentTime + start;
  }
  currentTime -= 1;
  return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
}

export function handleDragStart(
  e: React.MouseEvent<HTMLDivElement>,
  ourRef: React.RefObject<HTMLDivElement>,
  mouseCoords: React.MutableRefObject<MouseCoords>,
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!ourRef.current) return;
  const slider = ourRef.current;
  const startX = e.pageX - slider.offsetLeft;
  const scrollLeft = slider.scrollLeft;
  mouseCoords.current = { startX, startY: 0, scrollLeft, scrollTop: 0 };
  setIsMouseDown(true);
  document.body.style.cursor = 'grabbing';
}

export function handleDragEnd(
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setIsMouseDown(false);
  document.body.style.cursor = 'default';
}

export function handleDrag(
  e: React.MouseEvent<HTMLDivElement>,
  isMouseDown: boolean,
  ourRef: React.RefObject<HTMLDivElement>,
  mouseCoords: React.MutableRefObject<MouseCoords>
) {
  if (!isMouseDown || !ourRef.current) return;
  e.preventDefault();
  const slider = ourRef.current;
  const x = e.pageX - slider.offsetLeft;
  const walkX = (x - mouseCoords.current.startX) * 1.5;
  slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
}

export default scrollTo;
