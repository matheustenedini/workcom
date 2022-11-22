/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import Checkbox from './Checkbox';

import { IInputSelect } from './InputSelect';

interface ISelectMenuOption {
  title: string;
  id: string;
  i: number;
  name: IInputSelect['name'];
  type: IInputSelect['type'];
  register: IInputSelect['register'];
}

const SelectMenuOption = ({
  title,
  id,
  type,
  name,
  register,
  i,
}: ISelectMenuOption) => (
  <div>
    {type === 'Multiple' && (
      <Checkbox
        register={register}
        // verifica se o nome já possui o index ou se precisa ser colocado
        // name={name.includes('.') ? name : `${name}[${i}]`}
        name={`${name}[${i}]`}
        id={id}
        className="px-3 hover:bg-blue-50 focus:bg-blue-50"
      >
        <div className="ml-2 flex w-full py-2 text-sm text-gray-700">
          <span>{title}</span>
        </div>
      </Checkbox>
    )}
    {type === 'Single' && (
      <label className="flex">
        <input
          type="radio"
          className="invisible h-0 w-0 opacity-0"
          // isso é estatico para profissão
          {...register(name)}
          value={id}
        />
        <div
          className={`hover:bg-blue-50' flex w-full cursor-pointer space-x-2 px-3 py-2 text-sm text-gray-700 
            hover:bg-blue-50 focus:outline-none
          `}
        >
          {name.includes('addresses') ? (
            <IoLocationSharp className="h-4 w-4 text-blue-400" />
          ) : (
            <FaBriefcase className="h-4 w-4 text-blue-400" />
          )}
          <span>{title}</span>
        </div>
      </label>
    )}
    {/* {type === 'Tag' && (
        <button
          type="button"
          onMouseOver={() => handleOptionHover(id)}
          onClick={() => handleSelectOption({ id, title })}
          className={`flex items-center space-x-2 rounded-lg bg-gray-200 py-1 px-2 ${
            isSelected && 'bg-blue-100'
          } ${isHovered && 'bg-blue-100'}`}
        >
          {title}
          {isSelected && (
            <IoClose className="ml-1 h-4 w-4 pt-0.5 text-gray-500" />
          )}
        </button>
        )} */}
    {/* <button
          type="button"
          onMouseOver={() => handleOptionHover(label)}
          onClick={() => handleSelectOption(label)}
          className={`options-center flex w-full space-x-2 px-3 py-2 text-sm text-gray-700 last:rounded-b-lg focus:outline-none ${
            isHovered && 'bg-blue-50'
          }`}
        >
          <FaBriefcase className="h-4 w-4 text-blue-400" />
          <span>{label}</span>
        </button> */}
  </div>
);

export default memo(SelectMenuOption);
