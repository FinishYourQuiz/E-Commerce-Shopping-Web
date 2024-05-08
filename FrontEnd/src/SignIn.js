import React from 'react';
import { Avatar, Button, CssBaseline, Link, TextField, FormControlLabel, Checkbox, Grid, Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginSuccess: -1,
        }
    }
    
    // Click login
    login = () => {
        fetch('http://127.0.0.1:5000/login', {
            body: JSON.stringify(this.state),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        }).then((res) => {
            if (res.status === 200) {
                this.setState({ loginSuccess: 0 });
                return res.json();
            } else {
                this.setState({ loginSuccess: 1 });
                throw new Error('Invalid account');
            }
        }).then((res) =>{
            console.log(res);
            localStorage.setItem('token', res.token);
            // localStorage.setItem('uID', res.u_id);
            this.props.history.push('/');
        }).catch((err) =>{
            this.setState({ loginSuccess: 1 });
            console.log('Invalid Account!');
        })
    }
    
    render(){
        console.log(this.state.loginSuccess)
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
                    Sign in
                </Typography>
                {
                    this.state.loginSuccess === 1 && 
                    <div class="ui error message">
                        <div class="header">
                            There were some errors with your email/password entered
                        </div>
                        <ul class="list">
                            <li>Please enter <span style={{fontWeight: 'bold'}}>A Valid Account</span></li>
                            <li>New to ForBest? <a href="/SignUp">Sign up here!</a></li>
                        </ul>
                    </div>
                }
                
                <form style={{width: '100%', marginTop: '10px'}} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) =>{ this.setState({email: e.target.value}) } }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) =>{ this.setState({password: e.target.value}) } }
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{backgroundColor:'#edc4b3', margin:'20px 0px'}}
                        // href="/"
                        onClick={this.login}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item xs>
                            <Link href="/SignUp" variant="body2">
                            {"Sign Up Here"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/AdminLogin" variant="body2">
                            Admin Here
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
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

export default SignIn;