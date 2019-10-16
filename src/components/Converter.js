import React, { Fragment, useEffect } from 'react';
import { useStore } from '../store';
import {
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
}));

const Converter = observer(() => {
  const classes = useStyles();
  const store = useStore();

  useEffect(
    () =>
      autorun(() => {
        store.getExchangeRate();
      }),
    []
  );

  const formattedLastUpdateDate = moment(
    store.exchangeParams.lastUpdateDate
  ).format('YYYY MMM D');

  const options =
    store.currencies &&
    store.currencies.map(curr => (
      <MenuItem key={`${curr}-option`} value={curr}>
        {curr}
      </MenuItem>
    ));

  const handleSourceChange = event => store.setExchangeFrom(event.target.value);

  const handleTargetChange = event => store.setExchangeTo(event.target.value);

  const handleAmountChange = event =>
    store.setExchangeAmount(event.target.value);

  return (
    <Fragment>
      <Grid
        container
        justify="space-between"
        direction="row"
        alignItems="center"
      >
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            label="From"
            value={store.exchangeParams.amount}
            onChange={handleAmountChange}
            type="number"
            margin="dense"
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl variant="outlined" fullWidth={true}>
            <Select
              className={classes.textField}
              value={store.exchangeParams.from}
              onChange={handleSourceChange}
              margin="dense"
            >
              {options}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        justify="space-between"
        direction="row"
        alignItems="center"
      >
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            label="To"
            value={store.exchangeValue}
            InputProps={{
              readOnly: true
            }}
            type="number"
            margin="dense"
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl variant="outlined" fullWidth={true}>
            <Select
              className={classes.textField}
              value={store.exchangeParams.to}
              onChange={handleTargetChange}
              margin="dense"
            >
              {options}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div>
        <Divider className={classes.divider} />
        Your Rate:
        <h3>
          {store.exchangeParams.from} 1 = {store.exchangeParams.to}{' '}
          {store.exchangeParams.rate}
        </h3>
        Last updated {formattedLastUpdateDate}
      </div>
    </Fragment>
  );
});

export default Converter;
