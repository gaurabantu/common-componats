// Merge override and default classes
export const mergeClasses = (override?: string, defaultClass?: string) => {
  if (override && defaultClass) return `${defaultClass} ${override}`;
  return override || defaultClass || "";
};
