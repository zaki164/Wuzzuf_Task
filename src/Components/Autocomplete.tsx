import { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { setHistoryJobs, setSearchValue } from '../Store/AppStatus';
import { Job } from '../Types';

const Autocomplete = () => {
  const route = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const History = useSelector((state: RootState) => state.AppStatus.HistoryJobs)
  const SearchJobs = useSelector((state: RootState) => state.AppStatus.SearchJobs)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Job[] | undefined>(SearchJobs);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (History) {
      localStorage?.setItem("History_jobs", JSON.stringify(History))
    }
  }, [History])

  useEffect(() => {
    if (SearchJobs) {
      setFilteredSuggestions(SearchJobs)
    }
  }, [SearchJobs])

  const handleSearch = (term: any) => {
    if (term) {
      dispatch(setSearchValue({ SearchValue: term }))
    } else {
      setFilteredSuggestions([]);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value?.length >= 3) {
      if (location.pathname === "/jobs") {
        route('/jobs/search')
      }
      setIsOpen(true);
      debouncedSearch(value);
    }
  };

  const handleItemClick = (suggestion: Job) => {
    setSearchTerm(suggestion?.attributes?.title);
    setFilteredSuggestions([]);
    setIsOpen(false);
    const currentHistory = History ?? [];
    dispatch(setHistoryJobs({ HistoryJobs: [suggestion, ...currentHistory] }))
  };

  const clearInput = () => {
    if (location.pathname !== "/jobs") {
      route('/jobs')
    }
    setSearchTerm('');
    setFilteredSuggestions([]);
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete" ref={containerRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="search keyword"
        className="search-input"
      />
      {searchTerm && (
        <button onClick={clearInput} className="clear-button">
          &times;
        </button>
      )}
      {isOpen && filteredSuggestions && filteredSuggestions?.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions?.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleItemClick(suggestion)}
            >
              {suggestion?.attributes?.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
