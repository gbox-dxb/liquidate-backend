const info = (message, ...args) => {
  console.log(`[INFO] [${new Date().toISOString()}] ${message}`, ...args);
};

const error = (message, ...args) => {
  console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, ...args);
};

const warn = (message, ...args) => {
  console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, ...args);
};

const logger = {
  info,
  error,
  warn
};

export { logger };
