import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { useGetGeoLocation, usePostIpLocation } from '../../api/ip-location';
import Search from './Search';
import SearchEdit from './SearchEdit';

const SearchButton = () => {
  const router = useRouter();
  const { occupation, specialization, healthInsurance, city } = router.query;

  const [showSearch, setShowSearch] = useState(false);
  const [showSearchEdit, setShowSearchEdit] = useState(false);

  const getGeoLocation = useGetGeoLocation();

  const mutation = usePostIpLocation();

  useEffect(() => {
    if (getGeoLocation.isSuccess) {
      mutation.mutate({
        IP: getGeoLocation.data.IPv4,
        city: getGeoLocation.data.city,
        state: getGeoLocation.data.state,
      });
    }
  }, [getGeoLocation.isSuccess]);

  const handleClick = () => {
    if (city) {
      setShowSearchEdit(true);
    } else {
      setShowSearch(true);
    }
  };
  return (
    <div className="flex w-full flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-gray-200 px-6
         shadow-[0_1px_2px_#00000014_,_0_6px_12px_#0000000d] sm:w-[80%]"
      >
        {/* home */}
        {!occupation && !specialization && (
          <div className="flex items-center">
            <FaSearch className="mr-2.5 text-blue-500" />
            <span className="text-sm font-semibold text-gray-900">
              Buscar profissional
            </span>
          </div>
        )}
        <div className="flex justify-center space-x-1 truncate text-sm font-medium text-gray-500">
          {occupation && (
            <div className="flex items-center space-x-1">
              <span className="text-gray-700">{occupation}</span>
              <span className="text-[9px]">&#9679;</span>
            </div>
          )}
          {specialization && (
            <div className="flex items-center space-x-1">
              <span>{specialization}</span>
              <span className="text-[9px]">&#9679;</span>
            </div>
          )}
          {healthInsurance && (
            <div className="flex items-center space-x-1">
              <span>{healthInsurance}</span>
              <span className="text-[9px]">&#9679;</span>
            </div>
          )}
          {city && (
            <div className="truncate">
              <span>{city}</span>
            </div>
          )}
        </div>
      </button>
      {showSearch && (
        <Search setShowSearch={setShowSearch} ipLocation={mutation.data} />
      )}
      {showSearchEdit && (
        <SearchEdit
          setShowSearchEdit={setShowSearchEdit}
          setShowSearch={setShowSearch}
        />
      )}
      <div className="mt-4 flex max-w-[850px] items-center text-left text-gray-600 lg:w-full">
        <FiAlertTriangle className="mr-3 flex-shrink-0" />
        <span className=" text-sm">
          No campo Cidade, selecione &quot;Porto Alegre&quot; para testar a
          busca
        </span>
      </div>
    </div>
  );
};

export default SearchButton;
