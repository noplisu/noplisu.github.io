'use client';

import React, { useState } from 'react';
import SkillCategories from '@/data/skill-categories';
import Image from 'next/image';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A decade of experience building robust applications across the full technology stack
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {SkillCategories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === index
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Content */}
        <div className="animate-fade-in-up">
          {SkillCategories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className={`transition-all duration-500 ${
                activeCategory === categoryIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8 absolute pointer-events-none'
              }`}
            >
              <div className="space-y-8">
                {category.subcategories.map((subcategory, subIndex) => (
                  <div key={subcategory.title} className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-primary-200 pb-2">
                      {subcategory.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {subcategory.technologies.map((technology, techIndex) => {
                        const isExternalImage = technology.image?.startsWith('http');
                        const imageSrc = isExternalImage ? technology.image : `skill-images/${technology.image}`;
                        
                        const content = (
                          <div className="flex flex-col h-full">
                            <div className="flex items-center space-x-4 mb-4">
                              {technology.image && (
                                <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary-50 transition-colors duration-300">
                                  <Image
                                    width={48}
                                    height={48}
                                    src={imageSrc}
                                    alt={technology.name}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                    style={{objectFit: "contain"}}
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                                  {technology.name}
                                </h4>
                                {technology.externalLink && (
                                  <div className="mt-1">
                                    <span className="text-xs text-primary-500 font-medium">View Certificate →</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {technology.description && (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {technology.description}
                              </p>
                            )}
                          </div>
                        );

                        return technology.externalLink ? (
                          <a
                            key={technology.name}
                            href={technology.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl p-6 shadow-soft hover:shadow-medium card-hover transition-all duration-300 block"
                          >
                            {content}
                          </a>
                        ) : (
                          <div 
                            key={technology.name}
                            className="group bg-white rounded-xl p-6 shadow-soft hover:shadow-medium card-hover transition-all duration-300"
                          >
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let&apos;s discuss how my technical expertise can bring your vision to life
            </p>
            <a 
              href="#contact-form"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-full shadow-soft hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="mr-2">🚀</span>
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
