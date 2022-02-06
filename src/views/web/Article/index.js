import React from 'react';
import NoImg from '../../../assets/images/no-img.png';

const Article = () => {
  return <>
    <article className="text-justify px-12 m-auto w-3/5 mb-8">
      <p className="text-2xl">Simple Article Title</p>
      <hr className="my-4" />
      <div className="img-container text-center">
        <img className="inline-block" src={NoImg} alt="" />
      </div>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iste optio sint. Amet, exercitationem earum nam quidem quia excepturi odio atque animi aut, asperiores maxime. Delectus quia nihil nemo iste? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iste optio sint. Amet, exercitationem earum nam quidem quia excepturi odio atque animi aut, asperiores maxime. Delectus quia nihil nemo iste?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae iste optio sint. Amet, exercitationem earum nam quidem quia excepturi odio atque animi aut, asperiores maxime. Delectus quia nihil nemo iste?</p>
      <br />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt sed magnam debitis perspiciatis? Consequatur impedit natus sint voluptates maxime laboriosam deserunt accusantium iusto quo reiciendis, exercitationem praesentium ipsam, doloribus eius.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis vel dolores beatae nemo quis autem praesentium exercitationem recusandae atque maiores quod, fugit reprehenderit, quisquam repellat unde ratione necessitatibus mollitia!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, magnam aperiam! Rerum accusamus voluptas sapiente eligendi, dolorum ea. Doloremque corrupti saepe commodi. Dicta repellendus nam reiciendis iste autem ipsam vitae!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ex aliquid dolorum iste distinctio ipsam omnis quasi itaque quaerat doloremque. Incidunt porro autem, modi alias fuga voluptatibus voluptatem minima omnis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptatum, mollitia beatae earum nulla reprehenderit distinctio, totam voluptatem natus dolore nesciunt ex quis tempora molestias temporibus magnam cupiditate necessitatibus! Ad!
      </p>
    </article>
  </>;
};

export default Article;
