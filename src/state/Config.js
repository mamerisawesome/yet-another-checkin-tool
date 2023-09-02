import { useCallback, useMemo } from 'react';
import { createContainer } from 'unstated-next';

import { useLocalStorage } from './hooks';

const getStringBool = (booleanString) => booleanString === 'true';

const Config = createContainer(() => {
  const getItem = (key) => {
    const value = localStorage.getItem(key);

    return value === undefined ? true : getStringBool(value);
  };

  const [shouldPlayAlert, setShouldPlayAlert] = useLocalStorage('shouldPlayAlert', getItem('shouldPlayAlert'));
  const [shouldShowGoals, setShouldShowGoals] = useLocalStorage('shouldShowGoals', getItem('shouldShowGoals'));
  const [shouldShowDashboard, setShouldShowDashboard] = useLocalStorage('shouldShowDashboard', getItem('shouldShowDashboard'));

  const shouldShowGoalsAndDashboard = useMemo(() => {
    return shouldShowGoals && shouldShowDashboard;
  }, [shouldShowGoals, shouldShowDashboard]);

  const toggleShouldShowGoalsAndDashboard = useCallback(() => {
    setShouldShowGoals(!shouldShowGoals);
    setShouldShowDashboard(!shouldShowDashboard);
  }, [shouldShowGoals, shouldShowDashboard]);

  return {
    shouldShowGoals,
    shouldShowDashboard,
    shouldShowGoalsAndDashboard,
    shouldPlayAlert,
    toggleShouldShowGoalsAndDashboard,
    toggleShouldPlayAlert: () => setShouldPlayAlert(!shouldPlayAlert),
  };
});

export default Config;
