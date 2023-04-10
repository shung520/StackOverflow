import { useEffect } from 'react';
import { getTags } from 'api/stackOverflow';
import { useAppDispatch, useAppSelector } from 'store';
import { updateTagsList, updateTagSelect } from './slices';
import styled from './Tags.module.scss';
import cx from 'classnames';
import { updateSearchBox } from 'containers/SearchBox/slices';

function Tags() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(state => state.tagsState.tagsList);
  const tagSelected = useAppSelector(state => state.tagsState.tagSelected);
  const searchText = useAppSelector(state => state.searchBoxState.searchText);

  useEffect(() => {
    if (tags.length === 0) {
      getTags().then(res => {
        if (res.data.items.length > 0) {
          const target = res.data.items.map((el: { name: string }) => el.name);
          dispatch(updateTagsList(target));
          dispatch(updateTagSelect(target[0]));
        }
      });
    }
  }, []);

  return (
    <div className={styled.tagWrapper}>
      {tags.map(tag => (
        <div
          className={cx(styled.tag, {
            [styled.active]: searchText ? searchText === tag : tagSelected === tag,
          })}
          key={tag}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            dispatch(updateTagSelect(event.currentTarget.textContent));
            dispatch(updateSearchBox(''));
          }}>
          {tag}
        </div>
      ))}
    </div>
  );
}

export default Tags;
