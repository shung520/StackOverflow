import styled from './StackOverflow.module.scss';
import SearchBox from 'containers/SearchBox';
import Tags from 'containers/Tags';
import Lists from 'containers/Lists';

function StackOverflow() {
  return (
    <div className={styled.wrapper}>
      <SearchBox />
      <Tags />
      <Lists />
    </div>
  );
}

export default StackOverflow;
