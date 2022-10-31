import { ButtonHTMLAttributes } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineAddAPhoto } from 'react-icons/md';

const SelectProfilePicture = ({
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className="relative flex h-28 w-28 items-center justify-center rounded-full
   border border-solid border-gray-200 bg-gray-200"
    onClick={onClick}
  >
    <AiOutlineUser className="h-16 w-16 text-gray-500" />
    <div className="absolute bottom-0 left-0 grid h-9 w-9 place-items-center rounded-full bg-gray-900">
      <MdOutlineAddAPhoto className="h-5 w-5 text-white" />
    </div>
  </button>
);

export default SelectProfilePicture;
