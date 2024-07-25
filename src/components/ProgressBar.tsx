type ProgressBarProps = {
  current: number;
  total: number;
}

function ProgressBar(props: ProgressBarProps) {
  const percentage = (props.current / props.total) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__inner" style={{ width: `${percentage}%` }}></div>
      <div className="progress-bar__text">{`Question ${props.current} out of ${props.total}`}</div>
    </div>
  );
}

export default ProgressBar;