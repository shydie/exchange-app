import React, { useEffect } from 'react';
import { useStore } from '../store';
import {
  List,
  ListItem
} from '@material-ui/core';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

const TodayRates = observer(() => {
  const store = useStore();

  useEffect(
    () => autorun(() => {
      store.getTodayRates();
    }),
    []
  );
  const items = store.sortedTodayRates && store.sortedTodayRates.map(({name, value}) => <ListItem key={`${name}-todayRate`}>{name}: {value}</ListItem>);

  return (
    <List>
      {items}
    </List>
  );
});

export default TodayRates;
