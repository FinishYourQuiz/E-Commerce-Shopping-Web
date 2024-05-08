import React from 'react';
import { Container, Avatar, Button, CssBaseline, Link, TextField, FormControlLabel, Checkbox, Grid, Box, Typography} from '@material-ui/core';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name_first: '',
            name_last: '',
            registerSuccess: -1,
        }
    }

    register = () => {
        fetch('http://127.0.0.1:5000/register', {
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        }).then((res) => {
            if (res.status === 200) {
                this.setState({ registerSuccess: 0 });
                return res.json();
            } else {
                this.setState({ registerSuccess: 1 });
                throw new Error('Invalid account');
            }
        }).then((res) =>{
            console.log(res);
            localStorage.setItem('token', res.token);
            // localStorage.setItem({'uID': res.u_id});
            this.props.history.push('/');
        }).catch((err) =>{
            console.log('Invalid form');
        })
    }
    
    render() {
        return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{
                marginTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Avatar style={{margin: '10px',backgroundColor: '#edc4b3'}}></Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            {
                this.state.registerSuccess === 1 && 
                <div class="ui error message">
                    <div class="header">
                        There were some errors with your email/password entered
                    </div>
                    <ul class="list">
                        <li>Please fill <span style={{fontWeight: 'bold'}}>All forms</span></li>
                        <li>Please enter <span style={{fontWeight: 'bold'}}>Valid Email Address</span></li>
                        <li>Already had a account? <a href="/SignIn">Sign in here!</a></li>
                    </ul>
                </div>
            }
            <form style={{width: '100%', marginTop: '10px'}} noValidate>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) =>{ this.setState({name_first: e.target.value}) } }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(e) =>{ this.setState({name_last: e.target.value}) } }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) =>{ this.setState({email: e.target.value}) } }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) =>{ this.setState({password: e.target.value}) } }
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{backgroundColor:'#edc4b3', margin:'20px 0px'}}
                    // href="/"
                    onClick={this.register}
                >
                Sign Up
                </Button>
                <Grid container justify="flex-end">
                <Grid item>
                    <Link href="/SignIn" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
            <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                    <Link color="inherit" href="/">
                    ForBest
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Container>
        );
    }
}