import React, { useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contact } from '../data/contact';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(contact.successMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error(contact.errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-foreground/[0.02]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{contact.heading}</h2>
        </div>

        <div className="flex flex-wrap gap-10">
          <div className="flex-1 min-w-[280px]">
            <ToastContainer />
            <h3 className="text-xl font-semibold">{contact.subheading}</h3>
            <p className="text-muted-foreground mt-2">{contact.intro}</p>

            <div className="mt-6 space-y-4">
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <FaPhone className="text-primary" />
                  <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                    {contact.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaLinkedin className="text-primary" />
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {contact.linkedin.replace('https://', '')}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="text-primary" />
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {contact.github.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[280px]">
            <form className="rounded-md border border-border bg-card p-5 shadow-sm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[120px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows="5"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
