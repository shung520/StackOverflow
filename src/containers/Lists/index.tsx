import { useEffect, useState } from 'react';
import { getQuestions } from 'api/stackOverflow';
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

function Lists() {
  const [data, setData] = useState<QuestionType[]>();

  useEffect(() => {
    getQuestions({ page: 1, pagesize: 10 }).then(res => {
      if (res.data) {
        setData(res.data.items);
      }
    });
  }, []);

  return (
    <div className={styled.listWrapper}>
      {data?.map((item: QuestionType) => (
        <div key={item.question_id}>
          <div className={styled.item}>
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
        </div>
      ))}
    </div>
  );
}

export default Lists;
