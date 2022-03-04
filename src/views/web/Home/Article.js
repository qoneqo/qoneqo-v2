import React from 'react'
import { Link } from 'react-router-dom';
import ArticleCard from '../../../components/ArticleCard';

const Article = () => {
  return (
    <div className="min-h-screen py-8" id="article">
      <p className="text-2xl text-center my-4">New Articles</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-10/12 mx-auto">
      {(() => {
        let el = [];
        for (let index = 0; index < 8; index++) {
          el[index] = <Link key={index} to={`/article/${index}`}><ArticleCard /></Link>;
        }
        return <>{el}</>;
      })()}
      </div>
    </div>
  )
}

export default Article