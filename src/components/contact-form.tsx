'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { CV_PDF_PATH } from '@/data/profile';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xqkvozrr");

  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-primary-50 dark:from-gray-900 via-white dark:via-gray-800 to-secondary-50 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        { state.succeeded && (
          <div className="text-center animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-hard p-8 md:p-12">
              <div className="w-20 h-20 bg-gradient-primary dark:bg-gradient-primary-dark rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl" aria-hidden>✓</span>
              </div>
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Thanks — I&apos;ll reply soon
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                I usually respond within 24 hours. Meanwhile you can browse selected work or download the CV.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CV_PDF_PATH}
                  download
                  className="px-6 py-3 bg-gradient-primary dark:bg-gradient-primary-dark text-white rounded-full font-medium hover:shadow-glow dark:hover:shadow-glow-red transform hover:-translate-y-1 transition-all duration-300"
                >
                  Download CV
                </a>
                <a
                  href="/#projects"
                  className="px-6 py-3 border-2 border-primary-600 dark:border-red-500 text-primary-600 dark:text-red-500 rounded-full font-medium hover:bg-primary-600 dark:hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Selected work
                </a>
              </div>
            </div>
          </div>
        ) }

        { !state.succeeded && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
                Let&apos;s talk about a role
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Recruiters and hiring managers welcome—open to full-time remote opportunities in full-stack and AI engineering.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-hard p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-red-500 focus:border-primary-500 dark:focus:border-red-500 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-red-500 focus:border-primary-500 dark:focus:border-red-500 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                      placeholder="jane@company.com"
                      required
                    />
                    <div className="text-red-600 text-sm mt-1" role="alert">
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiry-type"
                    name="inquiry-type"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-red-500 focus:border-primary-500 dark:focus:border-red-500 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                    defaultValue="job-opportunity"
                  >
                    <option value="job-opportunity">Job opportunity</option>
                    <option value="recruiter">Recruiter inquiry</option>
                    <option value="consulting">Consulting / contract</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-red-500 focus:border-primary-500 dark:focus:border-red-500 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
                    placeholder="Company or agency name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-red-500 focus:border-primary-500 dark:focus:border-red-500 transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 resize-none"
                    placeholder="Role, stack, location/remote, timeline, and anything else useful..."
                    required
                  />
                  <div className="text-red-600 text-sm mt-1" role="alert">
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Usually respond within 24 hours ·{' '}
                    <a href={CV_PDF_PATH} download className="text-primary-600 dark:text-red-400 hover:underline font-medium">
                      Download CV
                    </a>
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="px-8 py-4 bg-gradient-primary dark:bg-gradient-primary-dark text-white font-semibold rounded-xl shadow-soft dark:shadow-glow-red hover:shadow-glow dark:hover:shadow-glow-red-dark transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                  >
                    {state.submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Send message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) }
      </div>
    </section>
  );
}
