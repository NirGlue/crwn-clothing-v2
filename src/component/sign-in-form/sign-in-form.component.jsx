import { useState, useContext } from "react";

import {signInWithGooglePopup,createUserDocumentFromAuth,signInAuthWithEmailAndPassword} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'

import Button from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = ()=>{
    const[formFields,setFormFields] = useState(defaultFormFields);
    const{email, password} = formFields

    const {setCurrentUser} = useContext(UserContext)


    const resetFormFileds = ()=>{
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async ()=>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields,[name]:value});
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();

        try {
            const {user} = await signInAuthWithEmailAndPassword(email,password)
            setCurrentUser(user);
            resetFormFileds();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log(error)
            }
        }
    };

    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'  
                    type="email"
                    required
                    onChange={handleChange}
                    name ='email'
                    value={email} />
                <FormInput
                    label='Password' 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name ='password'
                    value={password} />
                <div className='buttons-container'>
                    <Button type="submit">SIGN IN</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle} >GOOGLE SIGN IN</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;