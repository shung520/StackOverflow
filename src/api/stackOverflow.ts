import axios from 'api/axios';
import { AxiosPromise } from 'axios';

export const getQuestions = ({
  page,
  pagesize,
}: {
  page: number;
  pagesize: number;
}): AxiosPromise =>
  axios({
    method: 'GET',
    url: `/questions?site=stackoverflow&order=desc&sort=activity&filter=default&page=${page}&pagesize=${pagesize}`,
  });

export const getTags = (): AxiosPromise =>
  axios({
    method: 'GET',
    url: '/tags?pagesize=10&order=desc&sort=popular&site=stackoverflow',
  });
