import * as React from 'react';
import { Link, makeStyles, Typography, Box, Container } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2)
    }
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2)
    }
  }
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  const content = {
    brand: { image: 'nereus-assets/img/nereus-light.png', width: 110 },
    copy: '© 2020 Nereus All rights reserved.',
    link1: 'First Link',
    link2: 'Second Link',
    link3: 'Third Link',
    link4: 'Fourth Link',
    ...props.content
  };

  let brand;

  if (content.brand.image) {
    brand = (
      <img src={content.brand.image} alt="" width={content.brand.width} />
    );
  } else {
    brand = content.brand.text || '';
  }

  return (
    <div>
      <footer>
        <Container maxWidth="lg">
          <Box
            py={6}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            className={classes.rootBox}>
            <Link href="#" color="inherit" underline="none">
              {brand}
            </Link>
            <Box component="nav" className={classes.footerNav}>
              <Link
                href="#"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}>
                {content['link1']}
              </Link>
              <Link
                href="#"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}>
                {content['link2']}
              </Link>
              <Link
                href="#"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}>
                {content['link3']}
              </Link>
              <Link
                href="#"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}>
                {content['link4']}
              </Link>
            </Box>
            <Typography
              color="textSecondary"
              component="p"
              variant="caption"
              gutterBottom={false}>
              {content['copy']}
            </Typography>
          </Box>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
