import axios from 'api/axios';
import { AxiosPromise } from 'axios';

const KEY = 'U4DMV*8nvpm3EOpvf69Rxw((';

export const getQuestions = ({
  page,
  pagesize,
  tagged,
}: {
  page: number;
  pagesize: number;
  tagged: string;
}): AxiosPromise =>
  axios({
    method: 'GET',
    url: `/questions`,
    params: {
      site: 'stackoverflow',
      order: 'desc',
      sort: 'activity',
      filter: 'default',
      page: `${page}`,
      pagesize: `${pagesize}`,
      key: KEY,
      tagged,
    },
  });

export const getTags = (): AxiosPromise =>
  axios({
    method: 'GET',
    url: `/tags`,
    params: {
      pagesize: '10',
      order: 'desc',
      sort: 'popular',
      site: 'stackoverflow',
      key: KEY,
    },
  });
