import { useEffect, useState } from 'react';
import { getTags } from 'api/stackOverflow';
import styled from './Tags.module.scss';
import cx from 'classnames';

function Tags() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getTags().then(res => {
      if (res.data.items.length > 0) {
        setTags(res.data.items.map((el: { name: string }) => el.name));
      }
    });
  }, []);

  return (
    <div>
      <span>Trending</span>
      <div className={styled.tagWrapper}>
        {tags.map(tag => (
          <div className={cx(styled.tag, styled.active)} key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
