import { parseCookies } from 'nookies';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import usePostContact from '../api/contact';
import useGetUserInfo from '../api/usersInfo';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import Input from './Input';
import Modal from './Modal';
import TextArea from './TextArea';

interface IInputsContactPopup {
  email?: string;
  text: string;
}

export interface IContactPopup {
  setShowContactPopup: Dispatch<SetStateAction<boolean>>;
  isEmailRequired?: boolean;
  popupTitle: string;
  type: 'Question' | 'Suggestion';
  origin?: 'Header' | 'Occupation' | 'Specialization' | 'Health-insurance';
}
const ContactPopup = React.forwardRef<HTMLDivElement, IContactPopup>(
  ({ setShowContactPopup, isEmailRequired, popupTitle, type, origin }, ref) => {
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<IInputsContactPopup>({
      defaultValues: {
        email: '',
        text: '',
      },
    });

    const mutation = usePostContact();

    const [contactOrigin, setContactOrigin] = useState(origin);
    useEffect(() => {
      if (popupTitle.includes('profissão')) {
        setContactOrigin('Occupation');
      } else if (popupTitle.includes('convênios')) {
        setContactOrigin('Health-insurance');
      } else if (popupTitle.includes('especializações')) {
        setContactOrigin('Specialization');
      }
    }, [popupTitle]);

    const onClick: SubmitHandler<IInputsContactPopup> = data =>
      mutation.mutate(
        {
          email: data.email,
          text: data.text,
          origin: contactOrigin,
          type,
        },
        { onSuccess: () => setShowContactPopup(false) }
      );

    const { token } = parseCookies();
    const getUserInfo = useGetUserInfo(Boolean(token));

    useEffect(() => {
      if (getUserInfo.isSuccess) {
        setValue('email', getUserInfo.data?.email);
      }
    }, [getUserInfo]);

    return (
      <Modal setShowModal={setShowContactPopup}>
        <div
          className="mt-auto w-full rounded-t-xl bg-white px-8 py-8 xs:mt-0 xs:w-[500px] xs:rounded-lg xs:px-10"
          ref={ref}
        >
          <div className="flex w-full items-center justify-between">
            <div className="text-2xl font-semibold text-gray-800">
              {popupTitle}
            </div>
            <button
              type="button"
              onClick={() => setShowContactPopup(false)}
              className="rounded-full bg-gray-100 p-1"
            >
              <IoClose className="text-xl text-gray-800" />
            </button>
          </div>

          <form key="ContactForm" className="mt-8 space-y-4">
            <div className="space-y-6">
              <div>
                <Input
                  label="Email"
                  name="email"
                  register={register}
                  isDisabled={Boolean(getUserInfo.data?.email)}
                  rules={{
                    required: isEmailRequired,
                    maxLength: {
                      value: 70,
                      message: 'O seu email não pode ter mais de 70 caracteres',
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                      message: 'Endereço de email inválido',
                    },
                  }}
                  showAsterisk={isEmailRequired}
                  hasError={Boolean(errors.email)}
                />
                <ErrorMessage name="email" errors={errors} />
              </div>
              {/* message textarea  */}
              <div>
                <TextArea
                  minRows={4}
                  label="Mensagem"
                  name="text"
                  placeholder={`${
                    type === 'Question'
                      ? 'Preciso de ajuda com...'
                      : 'Gostaria que...'
                  }`}
                  register={register}
                  rules={{
                    required: true,
                    minLength: {
                      value: 3,
                      message: 'A sua mensagem deve ter mais de 30 caracteres',
                    },
                    maxLength: {
                      value: 2000,
                      message:
                        'A sua mensagem não pode ter mais de 2000 caracteres',
                    },
                  }}
                  showAsterisk
                  hasError={Boolean(errors.text)}
                />
                <ErrorMessage name="description" errors={errors} />
              </div>
            </div>
            <div className="flex w-full flex-row-reverse">
              <Button
                onClick={handleSubmit(onClick)}
                color="Black"
                type="submit"
                isLoading={mutation.isLoading}
                isInline
              >
                Enviar mensagem
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
);

export default ContactPopup;
