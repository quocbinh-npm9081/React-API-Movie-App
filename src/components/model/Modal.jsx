import React from 'react';
import PropTypes from 'prop-types';
import { useState ,useEffect,useRef} from 'react';
import './modal.scss';
const Modal = (props) => {
    const [Active, setActive] = useState(false);
    useEffect(() => {
        setActive(props.active);
    }, [props.active]);
    return (
        <div id={props.id} className={`modal ${Active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
};


Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
};

export const ModalContent =(props)=> {
    const contentRef = useRef(null);
    const closeModal = () =>{
        console.log('content ref: ', contentRef.current.parentNode);
        contentRef.current.parentNode.classList.remove('active');
        if(props.onClose) props.onClose();
    }
    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>

    )
}
ModalContent.propTypes ={
    onClose: PropTypes.func,
}
export default Modal;
