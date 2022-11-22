import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { AiOutlineUser } from 'react-icons/ai';
import useGetUserInfo from '../api/usersInfo';
import ContactButton from './header/ContactButton';

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const { token } = parseCookies();
  const getUserInfo = useGetUserInfo(Boolean(token));

  return (
    <div className="flex h-24 w-full justify-center">
      <div className="z-50 w-full px-8 sm:flex sm:flex-row sm:justify-center sm:px-0">
        <header
          className="Wborder-b flex h-full w-full items-center justify-between
        border-solid border-gray-200 sm:px-8 lg:w-[1000px] lg:px-0"
        >
          <Link href="/">
            <a
              className={`font-logo text-xl font-medium uppercase tracking-[0.3rem] ${
                isBurgerOpen ? 'text-gray-200' : 'text-gray-900'
              }`}
            >
              Workcom
            </a>
          </Link>
          {/* nav desktop  */}
          <div className="hidden items-center space-x-6 text-sm text-gray-500 sm:flex">
            <ContactButton type="Question" label="Ajuda" isEmailRequired />
            <ContactButton type="Suggestion" label="Sugestão" />

            {token ? (
              // usuario logado desktop
              <div>
                {!getUserInfo.isLoading && (
                  <div>
                    {getUserInfo.data?.isProfessional ? (
                      <Link href={`/professional/${getUserInfo.data?.id}`}>
                        <a
                          className={`!ml-8 flex cursor-pointer items-center rounded-full bg-gray-200 py-1 pr-4 pl-1
                         transition-colors hover:bg-blue-100 ${
                           !getUserInfo.data?.profilePicture &&
                           'bg-gray-100 hover:!bg-blue-50'
                         }`}
                        >
                          {getUserInfo.data?.profilePicture ? (
                            <img
                              src={getUserInfo.data?.profilePicture}
                              alt="Imagem de perfil"
                              className="mr-2 h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 object-cover">
                              <AiOutlineUser className="h-5 w-5 text-gray-500" />
                            </div>
                          )}

                          <span className="font-medium text-gray-800">
                            {getUserInfo.data?.name}
                          </span>
                        </a>
                      </Link>
                    ) : (
                      <div className="relative !ml-12 flex h-8 items-center rounded-r-full bg-gray-100 pr-4 pl-7">
                        <div className="absolute -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 object-cover">
                          <AiOutlineUser className="h-5 w-5 text-gray-500" />
                        </div>

                        <span className="font-medium text-gray-800">
                          {getUserInfo.data?.name}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // usuario NAO logado desktop
              <div>
                <div className="!ml-12 flex items-center space-x-6">
                  <Link href="/login">
                    <a className="cursor-pointer transition-colors hover:text-gray-800">
                      Entrar
                    </a>
                  </Link>

                  <Link href="/signup">
                    <a className="cursor-pointer !rounded-full bg-blue-500 px-3 py-2 font-normal text-white transition-colors hover:bg-sky-600">
                      Cadastrar-se
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* burger button */}
          <button
            type="button"
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            className={`relative flex h-12 w-7 focus:outline-none sm:hidden ${
              isBurgerOpen ? 'text-gray-200' : 'text-gray-500'
            }`}
          >
            <div className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className={`absolute block h-[2px] w-full transform bg-current transition duration-300 ease-in-out ${
                  isBurgerOpen ? 'rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute block  h-[2px] w-full transform   bg-current transition duration-300 ease-in-out ${
                  isBurgerOpen && 'opacity-0'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute block h-[2px] w-full transform  bg-current transition duration-300 ease-in-out ${
                  isBurgerOpen ? '-rotate-45' : 'translate-y-2'
                }`}
              />
            </div>
          </button>
        </header>

        {/* nav mobile  */}
        <div
          className={`mt-8 space-y-6 text-lg font-medium text-gray-200 transition-opacity duration-300 sm:hidden ${
            isBurgerOpen ? 'w-auto opacity-100' : 'invisible w-0 opacity-0'
          }`}
        >
          {/* ajuda */}
          <ContactButton
            type="Question"
            label="Ajuda"
            onOpenPopup={() => setIsBurgerOpen(false)}
            isEmailRequired
            className="font-medium hover:text-gray-200"
          />

          {/* sugestao */}
          <ContactButton
            type="Suggestion"
            label="Sugestão"
            onOpenPopup={() => setIsBurgerOpen(false)}
            className="font-medium hover:text-gray-200"
          />

          {getUserInfo.isSuccess ? (
            // usuario logado mobile
            <Link href={`/professional/${getUserInfo.data?.id}`}>
              <a className="!mt-12 flex cursor-pointer items-center">
                {getUserInfo.data?.profilePicture ? (
                  <img
                    src={getUserInfo.data?.profilePicture}
                    alt="Imagem de perfil"
                    className="mr-4 h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="rounded-fulll mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <AiOutlineUser className="h-7 w-7 text-gray-500" />
                  </div>
                )}

                <span>{getUserInfo.data?.name}</span>
              </a>
            </Link>
          ) : (
            // usuario nao logado mobile
            <div className="!mt-12 flex flex-col space-y-6">
              <Link href="/login">
                <a className="cursor-pointer transition-colors">Entrar</a>
              </Link>

              <Link href="/signup">
                <a className="w-fit cursor-pointer !rounded-md bg-blue-500 px-5 py-2.5 text-white hover:bg-sky-600">
                  Cadastrar-se
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* modal  */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-200 ${
          isBurgerOpen ? 'opacity-95' : 'hidden opacity-0'
        }`}
      />
    </div>
  );
};

export default Header;
