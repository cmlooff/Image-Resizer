/** Electron Components
 * Bringing in app -> Manages the entire life-cycle of our application
 * Bringing in BrowserWindow -> Class that creates desktop windows
 */
const { app, BrowserWindow } = require('electron');

// Create a mainWindow variable so we can access it within the global stack
let mainWindow;

// Creating a function to create our desktop window
function createMainWindow() {
  /** Instantiating a new browser window
   * Browser window can take in an object of [options]
   * https://www.electronjs.org/docs/latest/api/browser-window
   * ? There are a ton of options/properties for the BrowserWindow -> Imagine CSS and HTML all in one
   */
  mainWindow = new BrowserWindow({
    title: 'ImageOptimizer',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`
  });

  /** loadUrl / loadFile
   * Can put a url into the window application
   * Result? We can put show Twitter directly in our desktop Application! ('https://twitter.com/home')
   * But we don't want Twitter, we want to direct to a local directory
   * 
   * Example:
    mainWindow.loadURL(
      `file://${__dirname}/app/index.html`
    );
   * 
   * However, using loadUrl means that you will need to address the 'Content-Security-Policy' which is well documented in electron
   * 
   ** The other method to load a file is loadFile()
   * This allows use to reference a relative directory
   */
  mainWindow.loadFile('./app/index.html');
}

/** Calling the main window function
 *? The app object can call events similar to addEventListener
 * In this case when our app is 'ready' we call createMainWindow
 *
 */
app.on('ready', createMainWindow);
