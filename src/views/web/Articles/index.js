import React from 'react';
import NoImg from '../../../assets/images/no-img.png';
import StrLimit from '../../../utils/StrLimit';

const Articles = () => {
  return (
    <>
      <p className="text-center mb-4 text-xl">Articles Page</p>
      <div className="w-2/3 m-auto mb-12">
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
  <article className="flex flex-col justify-center relative m-4 rounded-xl text-black group cursor-pointer">
    <img className="m-auto w-full group-hover:brightness-50" src={NoImg} alt="" />
    <div className="text-center h-full z-10 absolute w-full flex flex-col justify-end">
      <p className="font-bold group-hover:text-white">Lorem Ipsum Dolor</p>
      <p className="hidden group-hover:block text-justify p-4 text-sm group-hover:text-white">
        {StrLimit(`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem ad
        unde, excepturi magni, consectetur iusto explicabo a ipsum debitis
        ullam fugiat enim dolore expedita quae quam sunt, nam hic ducimus.`)}
      </p>
    </div>
  </article>
);

export default Articles;
