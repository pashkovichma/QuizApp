import '../../styles/ProgressBar.css';
import { ProgressBarProps } from './progressBar.interface';

function ProgressBar(props: ProgressBarProps) {
  const percentage = Math.round((props.current / props.total) * 100);

  return (
    <div className="progress-bar">
      <div className="progress-bar__text">{`Question ${props.current} out of ${props.total}`}</div>
      <div className="progress-bar__inner" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

export default ProgressBar;