import Image from 'next/image';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'open-source': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'ar-vr': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'full-stack': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'business': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
      'mobile': 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
      'game': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'in-progress': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'maintenance': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'archived': 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-hard hover:shadow-medium dark:hover:shadow-glow-red transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-900 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-primary dark:bg-gradient-primary-dark text-white px-3 py-1 rounded-full text-sm font-semibold shadow-soft dark:shadow-glow-red">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-red-500 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
              {project.category.replace('-', ' ').toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 mb-4">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-primary-600 dark:bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 dark:hover:bg-red-700 transition-colors duration-300"
            >
              <span className="mr-1">🌐</span>
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors duration-300"
            >
              <span className="mr-1">📁</span>
              GitHub
            </a>
          )}
          {project.links.appStore && (
            <a
              href={project.links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <span className="mr-1">📱</span>
              App Store
            </a>
          )}
        </div>

        {/* Impact */}
        {project.impact && (
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Impact:</span> {project.impact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
