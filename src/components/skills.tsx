import React from 'react';
import Accordion from '@/components/skills/accordion';
import SkillCategories from '@/data/skill-categories';
import Image from 'next/image';

export default function Skills() {
  return (
    <div className="w-screen flex flex-wrap content-center justify-center bg-gray-200 py-20" id="skills">
      <div className="join join-vertical container flex flex-wrap flex-col content-center justify-center">
        {SkillCategories.map((category) => (
          <Accordion name={category.title} key="category.title">
            {category.subcategories.map((subcategory) => (
              <>
                <div className='text-xl font-bold'>
                  {subcategory.title}:
                </div>
                <ul>
                  {subcategory.technologies.map((technology) => (
                    <>
                      <li className="flex h-[calc(128px)] my-5">
                        {technology.image && (
                          <Image
                            width={128}
                            height={128}
                            src={`skill-images/${technology.image}`}
                            alt={technology.name}
                            className="mx-3"
                          />
                        )}
                        <div>
                          <h3 className="font-bold">{technology.name}</h3>
                          {technology.description && (
                            <p>{technology.description}</p>
                          )}
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </>
            ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
}
