import {
  createBrowserRouter, 
  RouterProvider,
} from 'react-router-dom';
import QuizConfigScreen from './screens/QuizConfigScreen';
import MainQuizScreen from './screens/MainQuizScreen';
import QuizResultsScreen from './screens/QuizResultsScreen';
import StatisticsScreen from './screens/StatisticsScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <QuizConfigScreen />,
  },
  {
    path: '/quiz',
    element: <MainQuizScreen />,
  },
  {
    path: '/results',
    element: <QuizResultsScreen />,
  },
  {
    path: '/statistics',
    element: <StatisticsScreen />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;