import '../../styles/NumberInput.css';
import { NumberInputProps } from './numberInput.interface.ts';

function NumberInput(props: NumberInputProps) {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type="number"
        value={props.value}
        min={props.min}
        max={props.max}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="transparent-caret"
      />
    </div>
  );
}

export default NumberInput;
