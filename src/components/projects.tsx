'use client';

import React, { useState } from 'react';
import projects from '@/data/projects';
import ProjectCard from '@/components/projects/project-card';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'open-source', label: 'Open Source', count: projects.filter(p => p.category === 'open-source').length },
    { id: 'ar-vr', label: 'AR/VR', count: projects.filter(p => p.category === 'ar-vr').length },
    { id: 'full-stack', label: 'Full Stack', count: projects.filter(p => p.category === 'full-stack').length },
    { id: 'business', label: 'Business', count: projects.filter(p => p.category === 'business').length },
    { id: 'game', label: 'Games', count: projects.filter(p => p.category === 'game').length }
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
    const featuredMatch = !showFeaturedOnly || project.featured;
    return categoryMatch && featuredMatch;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my work spanning full-stack development, AR/VR experiences, and open source contributions
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 dark:bg-red-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-red-500 shadow-soft'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Featured Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                showFeaturedOnly
                  ? 'bg-gradient-primary dark:bg-gradient-primary-dark text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-red-500 shadow-soft'
              }`}
            >
              {showFeaturedOnly ? 'Show All Projects' : 'Show Featured Only'}
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="animate-fade-in-up">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more projects.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-primary dark:bg-gradient-primary-dark rounded-2xl p-8 text-white shadow-soft dark:shadow-glow-red">
            <h3 className="text-2xl font-bold mb-4">Interested in My Work?</h3>
            <p className="text-lg mb-6 opacity-90">
              Check out my GitHub for more projects and contributions, or let&apos;s discuss your next project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/noplisu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white dark:bg-white text-primary-600 dark:text-gray-800 font-semibold rounded-full shadow-soft dark:shadow-hard hover:shadow-glow dark:hover:shadow-glow-red transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mr-2">📁</span>
                View GitHub
              </a>
              <a 
                href="#contact-form"
                className="inline-flex items-center px-8 py-3 border-2 border-white dark:border-white text-white dark:text-white font-semibold rounded-full hover:bg-white dark:hover:bg-white hover:text-primary-600 dark:hover:text-gray-800 transition-all duration-300"
              >
                <span className="mr-2">💬</span>
                Start a Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
