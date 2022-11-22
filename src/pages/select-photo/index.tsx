/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiPencil } from 'react-icons/bi';
import usePatchUploadPhoto from '../../api/uploadPhoto';
import Button from '../../components/Button';
import Header from '../../components/Header';
import SelectProfilePicture from '../../components/SelectProfilePicture';

interface IInputSelectPhoto {
  file: FileList;
}

const SelectPhoto = () => {
  const { handleSubmit, register } = useForm<IInputSelectPhoto>();

  const [imageSelected, setImageSelected] = useState<string | null>(null);

  const handleChangeImageSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target?.files;
    const url = URL.createObjectURL(files![0]);
    setImageSelected(url);
  };

  const mutation = usePatchUploadPhoto();

  const onSubmit: SubmitHandler<IInputSelectPhoto> = data => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    mutation.mutate({ formData });
  };
  return (
    <div>
      <Head>
        <title>Selecionar foto de perfil</title>
      </Head>
      <Header />
      <main className="flex grow justify-center py-8 px-8 text-gray-700 sm:px-0">
        <div className="h-full w-[460px]">
          <h1 className="text-2xl font-semibold text-gray-800">
            Selecionar foto
          </h1>

          <div className="mt-12 flex w-full flex-col items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                {imageSelected ? (
                  <div className="relative">
                    <img
                      className="h-28 w-28 rounded-full object-cover"
                      src={imageSelected}
                      alt="Imagem selecionada"
                    />
                    <div className="absolute bottom-0 left-0 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-gray-900">
                      <BiPencil className="h-5 w-5 text-white" />
                    </div>
                  </div>
                ) : (
                  <SelectProfilePicture />
                )}
                <input
                  type="file"
                  {...register('file')}
                  onChange={handleChangeImageSelected}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <Button
                type="submit"
                isInline
                isDisabled={!imageSelected}
                className="mt-6 !px-8"
              >
                Continuar
              </Button>
            </form>

            <div className="relative mt-8 flex w-full items-center justify-center">
              <span className="absolute h-[1px] w-full bg-gray-200" />
              <span className="relative bg-white px-5 text-[10px] text-gray-600">
                OU
              </span>
              <span />
            </div>

            <Button
              className="mt-8 h-auto py-0 font-normal hover:underline"
              color="Tranparent"
              isInline
            >
              <Link href="/">
                <a>Continuar sem foto</a>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectPhoto;
