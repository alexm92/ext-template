import { h, Fragment, render } from 'preact';

import '../assets/css/style.css';


const App = () => {
  return (
    <Fragment>
      <div className="p-10">
        <h3 className="text-black font-bold mb-10">Hello from the options page</h3>
      </div>
    </Fragment>
  );
};

Promise.all([
  /* anything you want to await before rendering e.g. settings */
]).then(() => {
  render(
    <App />,
    document.getElementById('app')
  );
});
