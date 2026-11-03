/** Webpack `asset/source` (Storybook) and Vite (`?raw`) — file contents as a string. */
declare module "*.css?raw" {
  const content: string;
  export default content;
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}
