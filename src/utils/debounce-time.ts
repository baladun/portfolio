interface Fn {
  (...args: any[]): void;
}

const queue: Fn[] = [];
let prevTimestamp: number | null = null;
let timeoutId: ReturnType<typeof setTimeout>;

export const debounceTime = (fn: Fn, time: number): void => {
  const curTimestamp = performance.now();
  queue.push(fn);
  clearTimeout(timeoutId);

  if (!prevTimestamp || curTimestamp - prevTimestamp < time) {
    timeoutId = executeLast(time);
    prevTimestamp = curTimestamp;
  }
};

const executeLast = (time: number): ReturnType<typeof setTimeout> => {
  return setTimeout(() => {
    const fnToCall = queue[queue.length - 1];
    queue.splice(0, queue.length);
    prevTimestamp = null;
    clearTimeout(timeoutId);
    fnToCall();
  }, time);
};
