import React from 'react';
import { Avatar, Button, CssBaseline, Link, TextField, Grid, Box, Typography} from '@material-ui/core';
import Container from '@material-ui/core/Container';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginSuccess: -1,
        }
    }
    // Click login
    admin_login = () => {
        fetch('http://127.0.0.1:5000/admin_login', {
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
            console.log('Hey!')
            this.props.history.push('/AdminPage');
        }).catch((err) =>{
            this.setState({ loginSuccess: 1 });
            console.log('Invalid Account!');
        })
    }
    
    render(){
        return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{
                marginTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Avatar style={{margin: '10px',backgroundColor: 'black'}}></Avatar>
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
                        <li>Please enter <span style={{fontWeight: 'bold'}}>A Valid Admin Account</span></li>
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
                    label="Admin ID"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    color="black"
                    onChange={(e)=> {this.setState({email: e.target.value})}}
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
                    onChange={(e)=> {this.setState({password: e.target.value})}}
                />
                <Button
                    fullWidth
                    variant="contained"
                    style={{backgroundColor:'black', margin:'20px 0px',color:'white'}}
                    onClick={this.admin_login}
                >
                    Log in
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="/SignIn" variant="body2" style={{color: "black"}}>
                        Login as normal user
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/SignUp" variant="body2" style={{color: "black"}}>
                        Regsiter as normal user
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

export default SignIn;