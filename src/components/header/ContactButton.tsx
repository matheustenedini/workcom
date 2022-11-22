import React, { useEffect, useState } from 'react';
import ContactPopup, { IContactPopup } from '../ContactPopup';

interface IContactButton {
  type: IContactPopup['type'];
  label: string;
  isEmailRequired?: boolean;
  className?: string;
  onOpenPopup?: () => void;
}

const ContactButton = ({
  type,
  label,
  isEmailRequired,
  className,
  onOpenPopup,
}: IContactButton) => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  useEffect(() => {
    if (onOpenPopup && showContactPopup) onOpenPopup();
  }, [showContactPopup]);
  return (
    <div>
      <button type="button" onClick={() => setShowContactPopup(true)}>
        <span
          className={`cursor-pointer transition-colors hover:text-gray-800 ${className}`}
        >
          {label}
        </span>
      </button>

      {showContactPopup && (
        <ContactPopup
          origin="Header"
          type={type}
          setShowContactPopup={setShowContactPopup}
          popupTitle={label}
          isEmailRequired={isEmailRequired}
        />
      )}
    </div>
  );
};

export default ContactButton;
