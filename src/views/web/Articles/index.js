import { Link } from 'react-router-dom';
import ArticleCard from '../../../components/ArticleCard';
import Group from '../../../components/Form/Group';
import Label from '../../../components/Form/Label';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Form/Button';

const Articles = () => {
  return (
    <>
      <div className="flex">
        <div className="w-1/4 px-12 border" id="filter-article">
          <Group>
            <Label>Search</Label>
            <Input className="my-2" placeholder="Search here" />
          </Group>
          <Group>
            <Label>Tags</Label>
            <Group className="!flex-row">
              <Input id="tag-1" className="w-min cursor-pointer" type="checkbox"/>
              <Label className="w-max ml-2 cursor-pointer" htmlFor="tag-1">Tag 1</Label>
            </Group>
            <Group className="!flex-row">
              <Input id="tag-2" className="w-min cursor-pointer" type="checkbox"/>
              <Label className="w-max ml-2 cursor-pointer" htmlFor="tag-2">Tag 2</Label>
            </Group>
            <Group className="!flex-row">
              <Input id="tag-3" className="w-min cursor-pointer" type="checkbox"/>
              <Label className="w-max ml-2 cursor-pointer" htmlFor="tag-3">Tag 3</Label>
            </Group>
            <Group className="!flex-row">
              <Input id="tag-4" className="w-min cursor-pointer" type="checkbox"/>
              <Label className="w-max ml-2 cursor-pointer" htmlFor="tag-4">Tag 4</Label>
            </Group>
          </Group>
          <Group>
            <Button>Filter</Button>
          </Group>        
        </div>
        <div className="w-3/4 m-auto mb-8">
          <p className="text-center mb-4 text-xl">All Articles</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              let el = [];
              for (let index = 0; index < 9; index++) {
                el[index] = <Link to={`/article/${index}`}><ArticleCard key={index} /></Link>;
              }
              return <>{el}</>;
            })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
