type ButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

function Button(props: ButtonProps) {
  return <button className={props.className} onClick={props.onClick}>{props.label}</button>;
}

export default Button;