import {
  createBrowserRouter, 
  RouterProvider,
} from 'react-router-dom';
import { paths } from './paths';
import QuizConfigScreen from './screens/QuizConfigScreen';
import MainQuizScreen from './screens/MainQuizScreen';
import QuizResultsScreen from './screens/QuizResultsScreen';
import StatisticsScreen from './screens/StatisticsScreen';

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <QuizConfigScreen />,
  },
  {
    path: paths.quiz,
    element: <MainQuizScreen />,
  },
  {
    path: paths.results,
    element: <QuizResultsScreen />,
  },
  {
    path: paths.statistics,
    element: <StatisticsScreen />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;