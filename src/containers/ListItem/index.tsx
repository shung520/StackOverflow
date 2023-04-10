import useElementOnScreen from 'hooks/useElementOnScreen';
import cx from 'classnames';
import styled from './ListItem.module.scss';
import { useEffect } from 'react';

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

interface ListItemProps {
  last: boolean;
  item: QuestionType;
  fetchMore: () => void;
}

function ListItem(props: ListItemProps) {
  const { containerRef, isVisible } = useElementOnScreen({});

  useEffect(() => {
    if (isVisible && props.last) {
      props.fetchMore();
    }
  }, [isVisible, props.last, props.fetchMore]);

  return (
    <div
      className={styled.item}
      key={props.item.question_id}
      ref={props.last ? containerRef : null}
      data-key={props.item.title}>
      <div className={styled.question}>
        {/* <div dangerouslySetInnerHTML={{ __html: myHTML }} /> */}
        <div
          dangerouslySetInnerHTML={{ __html: props.item.title }}
          className={styled.title}
          onClick={() => {
            const windowReference = window.open();
            if (windowReference) windowReference.location = props.item.link;
          }}>
          {/* {props.item.title} */}
        </div>
        <div className={styled.info}>
          <div className={styled.cell}>
            <div className={cx(styled.label)}>Score</div>
            <div className={cx(styled.value, { [styled.bad]: props.item.score < 0 })}>
              {props.item.score}
            </div>
          </div>
          <div className={styled.cell}>
            <div className={styled.label}>Answers</div>
            <div
              className={cx(styled.value, {
                [styled.border]: !props.item.is_answered && props.item.answer_count > 0,
                [styled.fill]: props.item.is_answered && props.item.answer_count > 0,
              })}>
              {props.item.answer_count}
            </div>
          </div>
          <div className={styled.cell}>
            <div className={styled.label}>Viewed</div>
            <div className={styled.value}>{props.item.view_count}</div>
          </div>
        </div>
      </div>
      <div className={styled.picturePart}>
        <img src={props.item.owner.profile_image} />
        <span>{props.item.owner.display_name}</span>
      </div>
    </div>
  );
}

export default ListItem;
