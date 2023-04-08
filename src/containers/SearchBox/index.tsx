import styled from './SearchBox.module.scss';

function SearchBox() {
  return (
    <div className={styled.searchBox}>
      <input onChange={() => console.log('### change')} />
      <div className={styled.searchText} onClick={() => console.log('### click')}>
        Search
      </div>
    </div>
  );
}

export default SearchBox;
