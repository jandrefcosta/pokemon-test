import PropTypes from 'prop-types';
import { useEffect } from 'react';
import closeIcon from '../assets/images/close.png';

const Modal = ({ children, close }) => {

    useEffect(() => { }, [])

    return (
        <div className="modal">
            <div className="modal__content">
                <img className="modal__close" src={closeIcon} alt="Fechar" onClick={close} />
                {children}
            </div>
        </div>
    )
}


Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Modal;
