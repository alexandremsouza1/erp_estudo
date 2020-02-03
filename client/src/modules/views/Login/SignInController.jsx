import React from 'react'
import SignIn from './SignIn'
import axios from 'axios'
import swal from 'sweetalert'
import {DOMAIN} from '../../constants/constants' 

export default class SignInController extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <>
                <SignIn/>
            </>
        )
    }
}