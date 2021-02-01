import {lazy, Suspense} from 'react';
import {Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppBar from './components/AppBar/AppBar';

const HomePage = lazy(() => import('./views/HomePage/HomePage' /* webpackChunkName: "HomePage"*/));
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView/MovieDetailsView' /* webpackChunkName: "MovieDetailsView"*/));
const Movies = lazy(() => import('./views/Movies/Movies' /* webpackChunkName: "Movies"*/));
const NotFoundView = lazy(() => import('./views/NotFoundView/NotFoundView' /* webpackChunkName: "NotFoundView"*/))


function App() {

  return (
    <>
      <AppBar />

      <Suspense fallback={<h1>...</h1>}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path='/movies'>
          <Movies />
        </Route>

        <Route path='/movies/:movieId'>
          <MovieDetailsView />
        </Route>

        <Route path='/:movieId' >
          <MovieDetailsView />
        </Route>

          {/* /movies/abracadabra || /abracadabra  - как отсеть запрос и вывести NotFoundView?  ментор хелп */}

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
      </Suspense>


      <ToastContainer position="top-right" autoClose={2500}/>
    </>
  );
}

export default App;
