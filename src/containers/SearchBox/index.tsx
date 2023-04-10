import { useCallback, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { debounce } from 'lodash';
import { updateResearch, updateSearchBox } from './slices';
import styled from './SearchBox.module.scss';

function SearchBox() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const searchText = useAppSelector(state => state.searchBoxState.searchText);

  const debouncedDispatch = useCallback(
    debounce(text => {
      dispatch(updateSearchBox(text));
    }, 200),
    [dispatch],
  );

  useEffect(() => {
    if (searchText === '') setValue('');
  }, [searchText]);

  return (
    <div className={styled.searchBox}>
      <input
        value={value}
        onChange={event => {
          const text = event.target.value;
          setValue(text);
          debouncedDispatch(text);
        }}
      />
      <div className={styled.searchText} onClick={() => dispatch(updateResearch(true))}>
        Search
      </div>
    </div>
  );
}

export default SearchBox;
