export const info = (message, ...args) => {
  console.log(`[INFO] [${new Date().toISOString()}] ${message}`, ...args);
};

export const error = (message, ...args) => {
  console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, ...args);
};

export const warn = (message, ...args) => {
  console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, ...args);
};
