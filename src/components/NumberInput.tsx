import '../styles/NumberInput.css';

type NumberInputProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

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
