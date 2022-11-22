/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, MouseEvent, SetStateAction, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  children: React.ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, setShowModal }: IModal) => {
  const refDivChildren = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (!refDivChildren.current?.contains(e.target as Element)) {
      setShowModal(false);
    }
  };

  return (
    <div>
      {typeof window !== 'undefined' && (
        <>
          {createPortal(
            <div
              onClick={e => handleClickOutside(e)}
              className="fixed inset-0 z-[99] flex w-full flex-col items-center justify-center overflow-hidden bg-black/60 transition-all"
            >
              <div className="flex h-full w-full items-end justify-center sm:items-center">
                <div
                  ref={refDivChildren}
                  className="flex h-fit w-full items-center justify-center sm:w-auto"
                >
                  {children}
                </div>
              </div>
            </div>,
            document.getElementById('modal-portal')!
          )}
        </>
      )}
    </div>
  );
};

export default Modal;
