import React from 'react';
import NoImg from '../../../assets/images/no-img.png';
import StrLimit from '../../../utils/StrLimit';

const Articles = () => {
  return (
    <>
      <p className="text-center mb-4 text-xl">Articles Page</p>
      <div className="w-2/3 m-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {(() => {
            let el = [];
            for (let index = 0; index < 9; index++) {
              el[index] = <Article key={index} />;
            }
            return <>{el}</>;
          })()}
        </div>
      </div>
    </>
  );
};

const Article = () => (
  <article className="flex flex-col justify-center m-4 border rounded-xl">
    <p className="text-center p-4">Lorem Ipsum Dolor</p>
    <img className="border-y" src={NoImg} alt="" />
    <p className="text-justify p-4">
      {StrLimit(`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ad
      unde, excepturi magni, consectetur iusto explicabo a ipsum debitis
      ullam fugiat enim dolore expedita quae quam sunt, nam hic ducimus.`)}
    </p>
  </article>
);

export default Articles;
