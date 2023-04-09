import { useEffect, useState, useRef } from 'react';
import { getQuestions } from 'api/stackOverflow';
import useElementOnScreen from 'hooks/useElementOnScreen';
import styled from './Lists.module.scss';
import cx from 'classnames';

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

const PAGE_SIZE = 10;

function Lists() {
  const { containerRef, isVisible } = useElementOnScreen({});
  const [data, setData] = useState<QuestionType[]>();
  const [hasMore, setHasMore] = useState(false);
  const pageRef = useRef(1);

  useEffect(() => {
    getQuestions({ page: pageRef.current, pagesize: PAGE_SIZE }).then(res => {
      if (res.data) {
        setHasMore(res.data.has_more);
        setData(res.data.items);
      }
    });
  }, []);

  useEffect(() => {
    if (isVisible && hasMore) {
      pageRef.current = pageRef.current + 1;

      getQuestions({ page: pageRef.current, pagesize: PAGE_SIZE }).then(res => {
        if (res.data) {
          setHasMore(res.data.has_more);
          setData(prev => {
            return prev ? [...prev, ...res.data.items] : [...res.data.items];
          });
        }
      });
    }
  }, [isVisible, hasMore]);
  console.log('### data', data);
  return (
    <div className={styled.listWrapper}>
      {data?.map((item: QuestionType, idx: number) => (
        <div
          className={styled.item}
          key={item.question_id}
          ref={data.length === idx + 1 ? containerRef : null}>
          <div className={styled.question}>
            <div className={styled.title}>{item.title}</div>
            <div className={styled.info}>
              <div className={styled.cell}>
                <div className={cx(styled.label)}>Score</div>
                <div className={cx(styled.value, { [styled.bad]: item.score < 0 })}>
                  {item.score}
                </div>
              </div>
              <div className={styled.cell}>
                <div className={styled.label}>Answers</div>
                <div
                  className={cx(styled.value, {
                    [styled.border]: !item.is_answered && item.answer_count > 0,
                    [styled.fill]: item.is_answered && item.answer_count > 0,
                  })}>
                  {item.answer_count}
                </div>
              </div>
              <div className={styled.cell}>
                <div className={styled.label}>Viewed</div>
                <div className={styled.value}>{item.view_count}</div>
              </div>
            </div>
          </div>
          <div className={styled.picturePart}>
            <img src={item.owner.profile_image} />
            <span>{item.owner.display_name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lists;
