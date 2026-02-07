
import React from 'react';
import { Mail, MessageSquare, Globe } from 'lucide-react';
import { SEO } from '../../lib/seo';

const Contact: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <SEO
      title="Contact Our Team - Support & Feedback | IQ Checker XYZ"
      description="Get in touch with the IQ Checker XYZ team for support, feedback, or inquiries about our cognitive testing methodology."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/contact"
    />
    <h1 className="text-4xl font-black mb-6">Contact Us</h1>
    <p className="text-slate-500 mb-12">Have questions about your results or our methodology? We're here to help.</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <ContactCard icon={<Mail />} title="Email" detail="technosharmaji44@gmail.com" />
      <ContactCard icon={<MessageSquare />} title="Support" detail="24/7 Ticketing" />
      <ContactCard icon={<Globe />} title="Location" detail="USA / Digital" />
    </div>

    <div className="glass p-8 md:p-12 rounded-[2rem]">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest">Name</label>
            <input type="text" className="p-4 rounded-xl bg-slate-900 border border-slate-800" placeholder="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest">Email</label>
            <input type="email" className="p-4 rounded-xl bg-slate-900 border border-slate-800" placeholder="john@example.com" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest">Message</label>
          <textarea rows={5} className="p-4 rounded-xl bg-slate-900 border border-slate-800" placeholder="How can we help?"></textarea>
        </div>
        <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20">Send Message</button>
      </form>
    </div>
  </div>
);

const ContactCard = ({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) => (
  <div className="glass p-8 rounded-3xl text-center">
    <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-6">
      {/* Fix: Added <any> to React.ReactElement to allow className property in cloneElement */}
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
    </div>
    <h4 className="font-bold mb-2">{title}</h4>
    <p className="text-sm text-slate-500">{detail}</p>
  </div>
);

export default Contact;
