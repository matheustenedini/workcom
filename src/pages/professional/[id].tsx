import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { VscChevronLeft } from 'react-icons/vsc';
import useGetUser from '../../api/getUser';
import Header from '../../components/Header';
import useHistoryStore from '../../store/useHistoryStore';

const ProfessionalProfile = () => {
  const router = useRouter();
  const { id, healthInsurance } = router.query;

  const getUser = useGetUser(id);

  const history = useHistoryStore(state => state.history);

  const [canGoBack, setCanGoBack] = useState<boolean>();
  useEffect(() => {
    setCanGoBack(history[history.length - 2]?.includes('search-result'));
  }, [history]);

  return (
    <div>
      <Head>
        <title>
          {getUser.isSuccess
            ? `${getUser.data?.firstName} ${getUser.data?.lastName}`
            : 'Workcom'}
        </title>
      </Head>
      <div className="flex flex-col items-center">
        <Header />
        {getUser.isSuccess && (
          <main
            className={`flex w-full py-8 sm:justify-center lg:w-[1000px] lg:justify-start ${
              !canGoBack && '!justify-center'
            }`}
          >
            {/* botao voltar */}
            {canGoBack && (
              <div className="hidden w-0 flex-shrink-0 lg:block lg:w-[180px]">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="h-fit"
                >
                  <div
                    className="inline-flex items-center justify-start rounded-full border border-solid border-gray-200 py-2.5 pr-4 pl-4
        shadow-[0_0_10px_#e5e7eb]
        "
                  >
                    <VscChevronLeft className="text-2xl text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">
                      Voltar
                    </span>
                  </div>
                </button>
              </div>
            )}

            <div
              className={`max-w-[600px] overflow-hidden px-8 sm:px-20 lg:w-full lg:px-0 ${
                !canGoBack && 'lg:w-full'
              }`}
            >
              <div className="items-center space-y-2 sm:flex sm:space-x-6 sm:space-y-0">
                {/* imagem  */}
                <div>
                  <span className="relative m-0 inline-block h-[110px] w-[110px] max-w-full overflow-hidden border-0 bg-none p-0 opacity-100 sm:h-[140px] sm:w-[140px]">
                    {getUser.data?.profilePicture ? (
                      <img
                        src={getUser.data?.profilePicture}
                        alt="Imagem do profissional"
                        className="absolute inset-0 m-auto box-border h-0 max-h-full min-h-full w-0 min-w-full max-w-full rounded-full border-0 object-cover p-0"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 m-auto flex h-0 max-h-full min-h-full w-0 min-w-full max-w-full items-center justify-center rounded-full
                             border border-solid border-gray-200 bg-gray-200"
                      >
                        <AiOutlineUser className="h-14 w-14 text-gray-500 sm:h-16 sm:w-16" />
                      </div>
                    )}
                  </span>
                </div>

                <div>
                  {/* nome  */}
                  <div className="text-2xl font-semibold text-gray-800">
                    {`${getUser.data?.firstName} ${getUser.data?.lastName}`}
                  </div>

                  {/* profissoes  */}
                  <div className="text-gray-800">
                    {getUser.data?.occupations.map(o => o.occupation)}
                  </div>
                </div>
              </div>
              {/* ------ */}
              <div className="mt-10 w-full space-y-8 sm:mt-12">
                {/* telefone  */}
                <div className="space-y-2">
                  <div className="text-base font-semibold text-gray-800">
                    Telefone
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhoneAlt className="text-gray-600" />

                    <div className="text-base text-blue-500">
                      {getUser.data?.phoneNumber?.replace('+55 ', '')}
                    </div>
                  </div>
                </div>

                {/* endereços  */}
                <div className="space-y-2">
                  <div className="text-base font-semibold text-gray-800">
                    Endereços
                  </div>
                  {getUser.data?.addresses.map(a => (
                    <div className="flex items-center space-x-2" key={a}>
                      <IoLocationSharp className="flex-shrink-0 text-lg text-gray-600" />
                      <div className="text-base text-gray-700">{a}</div>
                    </div>
                  ))}
                </div>

                {/* convenios  */}
                <div>
                  <div className="text-base font-semibold text-gray-800">
                    Convênios aceitos
                  </div>
                  {getUser.data?.healthInsurance.length ? (
                    <div>
                      {getUser.data?.healthInsurance.find(
                        h => h === healthInsurance
                      ) && (
                        <div className="mt-4 inline-flex justify-center rounded-full bg-sky-400/30 py-1 px-5">
                          <span className="text-xs text-sky-600">
                            <span className="font-medium">
                              Este profissional aceita{' '}
                            </span>
                            <span className="font-semibold">
                              {getUser.data?.healthInsurance.filter(
                                h => h === healthInsurance
                              )}
                            </span>
                          </span>
                        </div>
                      )}

                      <div className="mt-2 space-y-2 text-sm text-gray-800">
                        {getUser.data?.healthInsurance.map(h => (
                          <div className="flex items-center space-x-1.5">
                            <BsCheckCircleFill className="text-blue-500" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // nao aceita convenio
                    <div className="mt-2 flex items-center text-sm text-gray-800">
                      <span className="mr-2 text-base text-gray-600">
                        &#9679;
                      </span>
                      Este profissional não aceita convênios
                    </div>
                  )}
                </div>

                {/* descriçao */}
                <div className="w-full space-y-2 overflow-hidden">
                  <div className="text-base font-semibold text-gray-800">
                    Descrição
                  </div>
                  <div>
                    <div className="w-full max-w-full text-sm text-gray-800 lg:w-[80%]">
                      {getUser.data?.description}
                    </div>
                    {/* <div className="text-base text-blue-500">ver mais</div> */}
                  </div>
                </div>
                {/* formaçao  */}
                {getUser.data?.knowledge && (
                  <div className="space-y-2">
                    <div className="text-base font-semibold text-gray-800">
                      Formação
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-[90%] text-sm text-gray-800 line-clamp-3">
                        {getUser.data?.knowledge}
                      </div>
                    </div>
                  </div>
                )}
                {/* especializaçoes */}
                {getUser.data?.occupations.filter(o => o.specializations.length)
                  ?.length ? (
                  <div className="space-y-2">
                    <div className="text-base font-semibold text-gray-800">
                      Especializações
                    </div>
                    {getUser.data?.occupations.map(o => (
                      <div className="flex space-x-2" key={o.occupation}>
                        <div className="text-sm font-semibold text-gray-700">
                          {o.occupation}:
                        </div>
                        <div className="w-[90%] text-sm text-gray-700 line-clamp-3">
                          {o.specializations?.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </main>
        )}

        {getUser.isError && (
          <div className="text-normal py-24 text-center font-thin text-gray-800 sm:text-lg">
            Não foi possível carregar o perfil do profissional
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalProfile;
