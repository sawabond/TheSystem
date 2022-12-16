import React, { useContext } from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Header from '../../components/Header';
import axios from 'axios';
import { AuthContext } from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

//Data
const initialValues = {
  name: '',
  description: '',
};

export default function CreateAchievementSystem() {
  const { user } = useContext(AuthContext);
  const notifySuccesCreating = () =>
    toast.success('Achievement system has been created !');
  const notifyWrongCreating = () =>
    toast.warning('Achievement system has not been created !');
  const classes = useStyle();
  const onSubmit = (values, { resetForm }) => {
    axios
      .post(
        'https://localhost:7184/api/AchievementSystem',
        {
          name: values.name,
          description: values.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + StorageUser.token,
          },
        }
      )
      .then((response) => {
        if (response) {
          notifySuccesCreating();
        }
        if (response.data.error) {
          notifyWrongCreating();
        }
        resetForm();
      });
  };
  const StorageUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(StorageUser);
  return (
    <>
      <Header />
      <Grid
        container
        justifyContent="center"
        style={{ alignItems: 'center', height: '100%' }}
      >
        <Grid item md={6} style={{ margin: '2%' }}>
          <Card className={classes.padding}>
            <CardHeader title="ADD NEW ACHIEVEMENT SYSTEM"></CardHeader>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values }) => {
                return (
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={values.name}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Description"
                            variant="outlined"
                            fullWidth
                            name="description"
                            value={values.description}
                            component={TextField}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        type="Submit"
                        className={classes.button}
                      >
                        ADD NEW ACHIEVEMENTS
                      </Button>
                    </CardActions>
                  </Form>
                );
              }}
            </Formik>
          </Card>
          <ToastContainer />
        </Grid>
      </Grid>
    </>
  );
}