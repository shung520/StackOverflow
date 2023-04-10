import { uniqBy } from 'lodash';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getQuestions } from 'api/stackOverflow';
import styled from './Lists.module.scss';
import ListItem from 'containers/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, useAppDispatch } from 'store';
import { updateResearch } from 'containers/SearchBox/slices';

interface QuestionType {
  question_id: number;
  link: string;
  title: string;
  score: number;
  view_count: number;
  is_answered: boolean;
  answer_count: number;
  owner: {
    display_name: string;
    profile_image: string;
  };
}

const PAGE_SIZE = 20;

function Lists() {
  const dispatch = useAppDispatch();
  const tagSelected = useAppSelector(state => state.tagsState.tagSelected);
  const searchText = useAppSelector(state => state.searchBoxState.searchText);
  const reSearch = useAppSelector(state => state.searchBoxState.reSearch);
  const [data, setData] = useState<QuestionType[]>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const pageRef = useRef(1);
  const searchRef = useRef('');

  const loads = useCallback(() => {
    if (loading) return;
    setLoading(true);

    getQuestions({
      page: pageRef.current,
      pagesize: PAGE_SIZE,
      tagged: searchRef.current || tagSelected,
    })
      .then(res => {
        if (res.data) {
          setHasMore(res.data.has_more);
          setData(prev => {
            return uniqBy([...(prev || []), ...res.data.items], 'question_id');
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, tagSelected]);

  useEffect(() => {
    if (tagSelected && tagSelected !== searchRef.current) {
      searchRef.current = tagSelected;
      setData([]);
      pageRef.current = 1;
      loads();
    }
  }, [tagSelected]);

  useEffect(() => {
    if (searchText !== searchRef.current) {
      searchRef.current = searchText;
      setData([]);
      pageRef.current = 1;
      loads();
    }
  }, [searchText]);

  useEffect(() => {
    if (reSearch) {
      pageRef.current = 1;
      setData([]);
      loads();
      dispatch(updateResearch(false));
    }
  }, [reSearch]);

  const fetchMore = useCallback(() => {
    if (hasMore && !loading) {
      pageRef.current += 1;
      loads();
    }
  }, [hasMore, loading]);

  return (
    <div className={styled.listWrapper}>
      {data?.map((item: QuestionType, idx: number) => (
        <ListItem
          key={item.question_id}
          item={item}
          last={data.length === idx + 1}
          fetchMore={fetchMore}
        />
      ))}
      {loading && (
        <div className={styled.loading}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Lists;
