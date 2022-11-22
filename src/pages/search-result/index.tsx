import { FaPhoneAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import { AiOutlineUser } from 'react-icons/ai';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../../components/Header';
import usePostFindUsers from '../../api/findUsers';
import SearchDesktop from '../../components/search-worker-desktop/Search';
import SearchMobile from '../../components/search-worker-mobile/SearchButton';

const SearchResult = () => {
  const router = useRouter();
  const {
    occupationId,
    specializationId,
    healthInsuranceId,
    cityId,
    healthInsurance,
    occupation,
    city,
  } = router.query;

  const mutation = usePostFindUsers();

  useEffect(() => {
    const params: {
      specializations?: string[];
      healthInsurance?: string | string[] | undefined;
    } = { specializations: [] };
    if (specializationId) {
      params.specializations = [specializationId] as string[];
    }
    if (healthInsurance) {
      params.healthInsurance = healthInsuranceId;
    }

    if (occupationId && cityId)
      mutation.mutate({
        params,
        occupation: occupationId,
        // @ts-ignore
        city: cityId,
        qtdPerPage: 20,
        page: 1,
      });
  }, [occupationId, specializationId, healthInsuranceId, cityId]);

  const windowWidth = useWindowWidth();
  return (
    <div>
      <Head>
        <title>
          Workcom{occupation && city && `: ${occupation} em ${city}`}
        </title>
      </Head>
      {windowWidth && (
        <div className="h-full w-full">
          <Header />
          <main className="flex w-full justify-center">
            <div className="w-full py-8 px-8 sm:w-[1000px] lg:px-0">
              {/* search  */}
              <div>
                {windowWidth >= 900 ? <SearchDesktop /> : <SearchMobile />}
              </div>
              {mutation.data?.users.length ? (
                <div className="flex w-full justify-center py-8 px-0 lg:px-8 lg:py-12">
                  <div className="flex w-full flex-wrap lg:justify-between lg:gap-y-8">
                    {mutation.data?.users?.map(u => (
                      <Link
                        href={`/professional/${u.id}?healthInsurance=${healthInsurance}`}
                        key={u.id}
                      >
                        <a
                          className="w-full cursor-pointer border-b border-solid border-gray-300 py-6
                    px-0 transition-colors last:border-b-0 sm:p-5
                    lg:basis-[calc(50%-16px)] lg:rounded-lg lg:border lg:border-gray-200 lg:last:border-b lg:hover:bg-gray-50"
                        >
                          <div className="flex space-x-4">
                            {/* imagem  */}
                            <div>
                              <span className="relative m-0 inline-block h-16 w-16 max-w-full overflow-hidden border-0 bg-none p-0 opacity-100 sm:h-[74px] sm:w-[74px]">
                                {u.profilePicture ? (
                                  <img
                                    src={u.profilePicture}
                                    alt="Imagem do profissional"
                                    className="absolute inset-0 m-auto box-border h-0 max-h-full min-h-full w-0 min-w-full max-w-full rounded-full border-0 object-cover p-0"
                                  />
                                ) : (
                                  <div
                                    className="absolute inset-0 m-auto flex h-0 max-h-full min-h-full w-0 min-w-full max-w-full items-center justify-center rounded-full
                             border border-solid border-gray-200 bg-gray-200"
                                  >
                                    <AiOutlineUser className="h-9 w-9 text-gray-500 sm:h-11 sm:w-11" />
                                  </div>
                                )}
                              </span>
                            </div>

                            {/* nome  */}
                            <div className="w-full overflow-hidden">
                              <div className="flex w-full flex-nowrap items-center justify-between text-lg font-medium text-gray-800">
                                <div className="flex-shrink-1 max-w-[180px] truncate pr-6">
                                  {`${u.firstName} ${u.lastName}`}
                                </div>

                                {/* aceita convenio desktop  */}
                                {windowWidth >= 640 && (
                                  <div>
                                    {u.healthInsurance.length ? (
                                      <div className="flex items-center space-x-1 text-sm font-medium">
                                        <BsCheckCircleFill />
                                        <div className="whitespace-nowrap">
                                          Aceita convênio
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                )}
                              </div>

                              {/* profissoes  */}
                              <div className="truncate text-sm text-gray-800">
                                {u.occupations.map(o => o).join(', ')}
                              </div>

                              {/* convenio mobile  */}
                              {windowWidth <= 640 && (
                                <div>
                                  {u.healthInsurance.map(h => (
                                    <div>
                                      {h === healthInsurance && (
                                        <div className="mt-4 inline-flex justify-center rounded-full bg-sky-400/30 py-1 px-3">
                                          <span className="text-xs text-sky-600">
                                            <span className="font-medium">
                                              Este profissional aceita{' '}
                                            </span>
                                            <span className="font-semibold">
                                              {h}
                                            </span>
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* telefone  */}
                              <div className="mt-4 space-y-4">
                                <div className="flex items-center space-x-2 text-sm">
                                  <FaPhoneAlt className="text-gray-600" />
                                  <div className="text-blue-500">
                                    {u.phoneNumber.replace('+55 ', '')}
                                  </div>
                                </div>

                                {/* endereços  */}
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2 text-sm">
                                    <IoLocationSharp className="flex-shrink-0 text-base text-gray-600" />
                                    <div className="max-w-[calc(100%)] overflow-hidden text-gray-800 line-clamp-2">
                                      {u.addresses && u?.addresses[0]}
                                    </div>
                                  </div>

                                  {/* mais endereços mobile  */}
                                  {windowWidth <= 640 ? (
                                    <div>
                                      {u.addresses.length > 1 && (
                                        <div className="flex items-center space-x-2 text-sm font-medium text-gray-800">
                                          mais {u.addresses.length - 1}{' '}
                                          endereços...
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      {/* segundo endereço desktop  */}
                                      {u.addresses.length > 1 && (
                                        <div className="flex items-center space-x-2 text-sm">
                                          <IoLocationSharp className="flex-shrink-0 text-base text-gray-600" />
                                          <div className="text-gray-800">
                                            {u.addresses && u?.addresses[1]}
                                          </div>
                                        </div>
                                      )}

                                      {/* mais endereços desktop  */}
                                      {u.addresses.length > 2 && (
                                        <div className="flex items-center space-x-2 text-sm font-medium text-gray-800">
                                          mais {u.addresses.length - 2}{' '}
                                          endereços...
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
              {!mutation.data?.users.length && !mutation.isLoading && (
                <div className="text-normal py-24 text-center font-thin text-gray-800 sm:text-lg">
                  Nenhum profissional encontrado nessa região
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
