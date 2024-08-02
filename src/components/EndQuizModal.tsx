import { createPortal } from 'react-dom';
import Button from './Button';
import '../styles/EndQuizModal.css';

type EndQuizModalProps = {
  active: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function EndQuizModal(props: EndQuizModalProps) {
  if (!props.active) {
    return null;
  }
  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to end the quiz?</p>
        <Button label="Cancel" onClick={props.onClose} className="cancel-button" />
        <Button label="Confirm" onClick={props.onConfirm} className="confirm-button" />
      </div>
    </div>, 
    document.getElementById('modal-root')!
  );
}

export default EndQuizModal;