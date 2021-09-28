import { GetList } from '@utils/fetcher';
import { EducationTable } from 'models/education';
import { PracticeTable } from 'models/practice';
import React from 'react';

export const Home = (): JSX.Element => {
  const educations = GetList('EducationNear');
  const practices = GetList('PracticeNear');

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-start-1 col-end-2"><EducationTable list={educations} /></div>
      <div className="col-start-3 col-end-4"><PracticeTable list={practices} /></div>
    </div>
  );
};

export default Home;
