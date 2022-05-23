import './button.styles.scss'


const BUTTON_TYPE_CLASSES = {
    google:'google-sign-in',
    inverted:'inverted'
}

const Button = ({children, buttonType, ...otheProps})=>{
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otheProps} >
            {children}
        </button>
    )

}

export default Button;