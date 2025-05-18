const callbackMap = new Map<string, (code: string) => void>();

export const registerCallback = (id: string, cb: (code: string) => void) => {
  callbackMap.set(id, cb);
};

export const invokeCallback = (id: string, code: string) => {
  const cb = callbackMap.get(id);
  if (cb) cb(code);
  callbackMap.delete(id);
};
