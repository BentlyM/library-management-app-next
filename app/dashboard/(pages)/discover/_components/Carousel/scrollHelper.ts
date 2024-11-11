interface ScrollToOptions {
  element: HTMLElement;
  to: number;
  duration: number;
  scrollDirection: 'scrollTop' | 'scrollLeft';
  callback?: () => void;
  context?: unknown;
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

export default scrollTo;
