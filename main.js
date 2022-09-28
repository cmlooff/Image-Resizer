/** Electron Components
 * Bringing in app -> Manages the entire life-cycle of our application
 * Bringing in BrowserWindow -> Class that creates desktop windows
 */
const { app, BrowserWindow } = require('electron');

// Create a mainWindow variable so we can access it within the global stack
let mainWindow;

/** Environment Query
 * Are we in production, or development environment?
 * Are we in windows, max, or linux?
 *
 * Currently we strictly set this to development for development.
 *
 * @isDev gives us a bool value to check whether process.env.NODE_ENV is in development mode or not
 *
 * @ProcessPlatform process.platform -> Gives us the OS the user is on. I'm on windows therefore win32
 */
process.env.NODE_ENV = 'development';
const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isWin = process.platform === 'win32' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

// Creating a function to create our desktop window
function createMainWindow() {
  /** Instantiating a new browser window
   * Browser window can take in an object of [options]
   * https://www.electronjs.org/docs/latest/api/browser-window
   * ? There are a ton of options/properties for the BrowserWindow -> Imagine CSS and HTML all in one
   *
   * Resizable: If we're in development we want to be able to access our devtools by expanding the window. We don't want production to do that
   */
  mainWindow = new BrowserWindow({
    title: 'ImageOptimizer',
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev
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

//// MacOS
// Quit when all windows are closed
app.on('window-all-closed', () => {
  /** Notes
   * Common for macOS to keep applications and their menus
   * to stay active until the user quits explicitly
   */
  if (!isMac) app.quit();
});

app.on('activate', () => {
  /** Notes
   * Common for macOS to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open
   */
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
