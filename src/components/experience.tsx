import experience from '@/data/experience';

export default function Experience() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="experience">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Technical leadership, legacy modernization, AI pipelines, and multi-country e-invoicing—aligned with my CV
          </p>
        </div>

        <div className="relative space-y-10">
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary-300 dark:from-red-700 via-primary-200 dark:via-red-900 to-transparent hidden sm:block" aria-hidden />

          {experience.map((role) => (
            <article
              key={role.id}
              className="relative sm:pl-16 animate-fade-in-up"
            >
              <div className="hidden sm:block absolute left-4 top-6 w-4 h-4 rounded-full bg-primary-600 dark:bg-red-500 ring-4 ring-white dark:ring-gray-900" aria-hidden />

              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 shadow-soft">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {role.role}
                    </h3>
                    <p className="text-lg text-primary-600 dark:text-red-400 font-semibold">
                      {role.link ? (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {role.company}
                        </a>
                      ) : (
                        role.company
                      )}
                    </p>
                  </div>
                  <div className="text-sm sm:text-right text-gray-500 dark:text-gray-400 shrink-0">
                    <p className="font-medium text-gray-700 dark:text-gray-300">{role.period}</p>
                    <p>{role.location}</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                  {role.summary}
                </p>

                <ul className="space-y-2 mb-6">
                  {role.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-500 dark:bg-red-500 shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {role.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
