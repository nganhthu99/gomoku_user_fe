import React, {useState} from 'react';
import {Container, Form, Button, Card, Row} from "react-bootstrap";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import { useHistory } from "react-router-dom";
import axios from "axios";

export const api = 'http://localhost:5034'

const SignIn = (props) => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleOnChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignInButton = () => {
        axios.post(api + '/users/signin', {
            username,
            password
        })
            .then((response) => {
                if (response.status === 200 && response.data.success) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("username", username)
                    history.push('/')
                } else if (!response.data.success) {
                    alert('Wrong username or password!')
                }
            })
            .catch((error) => {
                alert ('Error signing in. Please try again later')
            })
    }

    const handleSignUpButton = () => {
        history.push('/sign-up')
    }

    const responseGoogle = (response) => {
        const user = response.profileObj
        axios.post(api + '/users/signup', {
            username: user.name,
            password: "default"
        })
            .then((response) => {
                if (response.status === 201 && response.data.success) {
                    axios.post(api + '/users/signin', {
                        username: user.name,
                        password: "default"
                    })
                        .then((response) => {
                            if (response.status === 200 && response.data.success) {
                                localStorage.setItem("token", response.data.token)
                                localStorage.setItem("username", user.name)
                                history.push('/')
                            } else if (!response.data.success) {
                                alert ('Error signing in. Please try again later')
                            }
                        })
                        .catch((error) => {
                            alert ('Error signing in. Please try again later')
                        })
                } else {
                    alert ('Error signing in. Please try again later')
                }
            })
            .catch((error) => {
                alert ('Error signing in. Please try again later')
            })
    }

    const responseFacebook = (user) => {
        axios.post(api + '/users/signup', {
            username: user.name,
            password: "default"
        })
            .then((response) => {
                if (response.status === 201 && response.data.success) {
                    axios.post(api + '/users/signin', {
                        username: user.name,
                        password: "default"
                    })
                        .then((response) => {
                            if (response.status === 200 && response.data.success) {
                                localStorage.setItem("token", response.data.token)
                                localStorage.setItem("username", user.name)
                                history.push('/')
                            } else if (!response.data.success) {
                                alert ('Error signing in. Please try again later')
                            }
                        })
                        .catch((error) => {
                            alert ('Error signing in. Please try again later')
                        })
                } else {
                    alert ('Error signing in. Please try again later')
                }
            })
            .catch((error) => {
                alert ('Error signing in. Please try again later')
            })
    }

    return (
        <Container>
            <Card style={{backgroundColor: '#F27405', padding: 20, margin: 30, height: 320}}>
                <Form style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Form.Group>
                        <Form.Label style={{color: '#F2F2F2'}}>Username</Form.Label>
                        <Form.Control onChange={(e) => handleOnChangeUsername(e)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{color: '#F2F2F2'}}>Password</Form.Label>
                        <Form.Control type="password"
                                      onChange={(e) => handleOnChangePassword(e)}/>
                    </Form.Group>
                    <Row style={{justifyContent: 'flex-end', paddingBottom: 20}}>
                        <Button onClick={handleSignUpButton} variant="link" style={{color: '#F2F2F2', textDecoration: 'underline'}}>
                            Don't have an account? Sign Up
                        </Button>
                    </Row>
                    <Row style={{justifyContent: 'space-evenly'}}>
                        <Button
                            onClick={handleSignInButton}
                            style={{backgroundColor: '#F2F2F2', color: '#F27405', width: 200}}>
                            Sign In
                        </Button>
                    </Row>
                </Form>
                {/*<Row style={{justifyContent: 'space-evenly', paddingTop: 20, alignItems: 'center'}}>*/}
                {/*    <GoogleLogin*/}
                {/*        style={{textAlign:"center",width:"300px"}}*/}
                {/*        clientId="373788081790-9ukqs91r6ofjfvkggh2ea9ul9p3oisji.apps.googleusercontent.com"*/}
                {/*        buttonText='LOGIN WITH GOOGLE'*/}
                {/*        onSuccess={responseGoogle}*/}
                {/*        onFailure={(error) => {alert(error)}}*/}
                {/*    />*/}
                {/*    <FacebookLogin*/}
                {/*        style={{textAlign:"center",width:"300px"}}*/}
                {/*        appId="2439172963055789"*/}
                {/*        icon="fa-facebook"*/}
                {/*        size='small'*/}
                {/*        callback={responseFacebook}*/}
                {/*    />*/}
                {/*</Row>*/}
            </Card>
        </Container>
    )
};

export default SignIn;