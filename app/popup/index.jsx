import { h, Fragment, render } from 'preact';
import api from '../common/api';
import '../assets/css/style.css';


const App = () => {
  const manifest = browser.runtime.getManifest();

  const showOptions = (event) => {
    event.stopPropagation();
    api.tabs.openOptionsPage();
  };


  return (
    <Fragment>
      <div className="flex flex-row">
        <img src="icons/logo-96.png" alt="logo" className="inline-block" style={{ height: 48 }} />
        <div className="inline-block mt-1 ml-3">
          <div className="font-bold text-black">{ manifest.name }</div>
          <small className="text-gray-1">v{ manifest.version }{ process.env.DEV_MODE ? '-dev' : ''}</small>
        </div>
      </div>

      <div className="mt-10">
        Hello World
      </div>

      <button
        type="button"
        className="bg-blue-1 text-white px-5 py-3 rounded-sm block mx-auto mt-10 font-bold hover:opacity-75 focus:outline-none transition-opacity duration-200 ease-in-out"
        onClick={showOptions}
      >
        Show Options
      </button>
    </Fragment>
  );
}

Promise.all([
  /* anything you want to await before rendering e.g. settings */
]).then(() => {
  render(
    <App />,
    document.getElementById('app')
  );
})
