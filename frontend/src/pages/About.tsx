import React from 'react';
import { Mail, Phone, MapPin, Users, Award, Truck, Heart } from 'lucide-react';
import Logo from '../components/UI/Logo';

const About: React.FC = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'David Wilson',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring the best shopping experience.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every product is carefully selected and tested to meet our high standards of quality.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'We partner with reliable logistics providers to ensure your orders reach you quickly.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building a community of satisfied customers who trust our brand.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Logo size="lg" className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading">About ShopCart.com</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              We're passionate about bringing you the best products at unbeatable prices, 
              with exceptional customer service and a seamless shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Story</h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                Founded in 2025, ShopCart.com started with a simple mission: to make online shopping 
                more accessible, enjoyable, and trustworthy for everyone. What began as a small startup 
                has grown into a leading e-commerce platform serving millions of customers worldwide.
              </p>
              <p>
                Our team of passionate individuals works tirelessly to curate the best products from 
                trusted brands and emerging innovators. We believe that everyone deserves access to 
                quality products at fair prices, backed by exceptional customer service.
              </p>
              <p>
                Today, we're proud to offer over 100,000 products across multiple categories, 
                with same-day delivery in major cities and a commitment to sustainability in 
                everything we do.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Our team working"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the experience we create for our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-4 sm:p-6 card hover:scale-105 transform transition-transform duration-200">
                <div className="flex justify-center mb-4">
                  <div className="p-2 sm:p-3 bg-primary-100 rounded-full">
                    <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            The passionate people behind ShopCart.com's success
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-xs sm:text-sm md:text-base text-primary-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="flex justify-center mb-4">
                <div className="p-2 sm:p-3 bg-primary-600 rounded-full">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-sm sm:text-base text-gray-300">support@shopcart.com</p>
              <p className="text-sm sm:text-base text-gray-300">info@shopcart.com</p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="flex justify-center mb-4">
                <div className="p-2 sm:p-3 bg-secondary-600 rounded-full">
                  <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-sm sm:text-base text-gray-300">+1 (555) 123-4567</p>
              <p className="text-sm sm:text-base text-gray-300">Mon-Fri 9AM-6PM EST</p>
            </div>

            <div className="text-center p-4 sm:p-6 sm:col-span-2 md:col-span-1">
              <div className="flex justify-center mb-4">
                <div className="p-2 sm:p-3 bg-accent-600 rounded-full">
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-sm sm:text-base text-gray-300">123 Commerce Street</p>
              <p className="text-sm sm:text-base text-gray-300">New York, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mt-8 sm:mt-12">
            <form className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-field bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input-field bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="input-field bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
              />
              <textarea
                rows={3}
                placeholder="Your Message"
                className="input-field bg-gray-800 border-gray-700 text-white placeholder-gray-400 resize-none text-sm sm:text-base"
              ></textarea>
              <button type="submit" className="w-full btn-primary text-sm sm:text-base py-2 sm:py-3">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;