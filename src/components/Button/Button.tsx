import { ButtonProps } from './button.interface';

function Button(props: ButtonProps) {
  return (
    <button 
      className={props.className} 
      onClick={props.onClick}
      >{props.label}
    </button>
  )
}

export default Button;