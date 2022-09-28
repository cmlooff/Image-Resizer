/** Electron Components
 * Bringing in app -> Manages the entire life-cycle of our application
 * Bringing in BrowserWindow -> Class that creates desktop windows
 */
const { app, BrowserWindow } = require('electron');

// Creating a function to create our desktop window
function createMainWindow() {
  /** Instantiating a new browser window
   * Browser window can take in an object of [options]
   * https://www.electronjs.org/docs/latest/api/browser-window
   * ? There are a ton of options/properties for the BrowserWindow -> Imagine CSS and HTML all in one
   */
  const mainWindow = new BrowserWindow({
    title: 'ImageOptimizer',
    width: 500,
    height: 600
  });
}

/** Calling the main window function
 *? The app object can call events similar to addEventListener
 * In this case when our app is 'ready' we call createMainWindow
 */
app.on('ready', createMainWindow);
