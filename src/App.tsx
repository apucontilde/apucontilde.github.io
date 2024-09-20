import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Pages />
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
