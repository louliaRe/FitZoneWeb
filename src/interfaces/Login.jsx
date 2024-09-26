import { Paper } from "@mantine/core";
import LoginForm from "../Components/LoginForm";
import classes from '../interfaces/Login.module.css';
import React from "react";
import LogoLogin from "../Components/LogoLogin";

const Login = () => {
    return (
        <div className={classes.loginContainer}>
            <Paper className={classes.form} radius={0} p={30}>
                <div className={classes.space}>
                    <h1 className={classes.heading}>Welcome <br /> to FitZone!</h1>
                    <LogoLogin />
                </div>
                <LoginForm />
            </Paper>
        </div>
    );
};

export default Login;
