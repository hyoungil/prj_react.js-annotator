import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useHistory, withRouter } from "react-router-dom";

// import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  imageBox: {
    width: '100%',
    height: '100%'
  }
}));

export const LabelCardComponent = ({ className, lebel, onSeleteImage, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      onClick={() => onSeleteImage(lebel.imgIdx)}
    >
      <CardContent>
        <Box
          className={classes.imageBox}
          display="flex"
          justifyContent="center"
          mb={3}
        >

          {/* <img str={lebel.url}/> */}
          <Avatar
            className={classes.imageBox}
            // className={classes.large}
            alt="lebelUrl"
            src={lebel.url}
            variant="square"
          />
        </Box>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {lebel.imgId}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};


LabelCardComponent.propTypes = {
  className: PropTypes.string,
  lebel: PropTypes.object.isRequired
};

export default LabelCardComponent;