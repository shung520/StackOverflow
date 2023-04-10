import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import styled from './StackOverflow.module.scss';
import SearchBox from 'containers/SearchBox';
import Tags from 'containers/Tags';
import Lists from 'containers/Lists';

function StackOverflow() {
  const [searchAreaTop, setSearchAreaTop] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScrollEnd = useCallback(
    debounce(() => {
      setSearchAreaTop(0);
    }, 300),
    [],
  );

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    if (scrollTop >= lastScrollTop) {
      setSearchAreaTop(Math.max(searchAreaTop - (scrollTop - lastScrollTop), -150));
    } else {
      setSearchAreaTop(0);
    }
    setLastScrollTop(scrollTop);
    handleScrollEnd();
  };

  return (
    <div className={styled.wrapper} onScroll={handleScroll}>
      <div className={styled.searchArea} style={{ top: searchAreaTop }}>
        <SearchBox />
        <Tags />
      </div>
      <div className={styled.listArea}>
        <Lists />
      </div>
    </div>
  );
}

export default StackOverflow;
