'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xqkvozrr");
  
  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        { state.succeeded && (
          <div className="text-center animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Thank You for Reaching Out!
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for taking the time to share your project details with me! 🌟 I'm excited about the opportunity to collaborate with you and turn your ideas into reality. I'm already reviewing the information you provided and I'll get back to you shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/#skills" 
                  className="px-6 py-3 bg-gradient-primary text-white rounded-full font-medium hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300"
                >
                  Explore My Skills
                </a>
                <a 
                  href="https://github.com/noplisu" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-full font-medium hover:bg-primary-600 hover:text-white transition-all duration-300"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        ) }
        
        { !state.succeeded && (
          <div className="animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
                Let's Build Something Amazing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to bring your vision to life? I'm excited to discuss your project and explore how we can create something extraordinary together.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="john.doe@example.com"
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
                  <label htmlFor="project-type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    id="project-type"
                    name="project-type"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select a project type</option>
                    <option value="web-app">Web Application</option>
                    <option value="mobile-app">Mobile Application</option>
                    <option value="ar-vr">AR/VR Experience</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
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
                  <div className="text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <span className="mr-2">⚡</span>
                      Usually respond within 24 hours
                    </span>
                  </div>
                  <button 
                    type="submit" 
                    disabled={state.submitting}
                    className="px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl shadow-soft hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                  >
                    {state.submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🚀</span>
                        Send Message
                      </>
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
