import { SelectInputProps } from "./selectInput.interface";

function SelectInput(props: SelectInputProps) {
  return (
    <div>
      <label>{props.label}</label>
      <select value={props.value} onChange={(e) => props.onChange(e.target.value)}>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;