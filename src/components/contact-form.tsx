'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xqkvozrr");
  return (
    <section id="contact-form" className="bg-gray-100 h-[calc(100vh-68px)] min-h-[calc(600px)] py-8">
      <div className="lg:py-16 px-4 mx-auto max-w-screen-md">
        { state.succeeded && (
          <>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
              Thank You for Reaching Out!
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
              {"Thank you for taking the time to share your project details with me! 🌟 I'm excited about the opportunity to collaborate with you and turn your ideas into reality. I'm already reviewing the information you provided and I'll get back to you shortly. In the meantime, feel free to explore more about my work and services on the website."}
            </p>
          </>
        ) }
        { !state.succeeded && (
          <>
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
              Ready to elevate your digital presence?
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
              {"Fill out the form below and let's kickstart your project into high gear. I'm excited to turn your ideas into robust, user-friendly applications. Let's innovate, code, and create success!"}
            </p>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  placeholder="john.doe@example.com"
                />
                <div className="text-red-700 text-xs px-2 py-1 rounded relative" role="alert">
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Leave a message..."
                />
                <div className="text-red-700 text-xs px-2 py-1 rounded relative" role="alert">
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>
              </div>
              <button type="submit" disabled={state.submitting} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-indigo-500 sm:w-fit hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300">
                Submit
              </button>
            </form>
          </>
        ) }
      </div>
    </section>
  );
}
