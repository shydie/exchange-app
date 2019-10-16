import React, { useEffect } from 'react';
import { useStore } from '../store';
import { Grid, Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import Converter from './Converter';
import TodayRates from './TodayRates';
import { blue, grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
  },
  card: {
    height: '100%'
  },
  cardContent: {
    padding: theme.spacing(2)
  },
  cardHeader: {
    backgroundColor: blue[900],
    color: grey[50]
  }
}));

const ExchangeRate = observer(() => {
  const classes = useStyles();
  const store = useStore();

  useEffect(
    () =>
      autorun(() => {
        store.getCurrencies();
      }),
    []
  );

  return (
    <div className={classes.wrapper}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Card className={classes.card}>
            <CardHeader
              title="Currency Converter"
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <Converter />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardHeader
              title={`Today's rates 1 ${store.exchangeParams.from} =`}
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <TodayRates />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
});

export default ExchangeRate;
