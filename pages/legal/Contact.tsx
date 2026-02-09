
import React from 'react';
import { Mail, MessageSquare, Globe } from 'lucide-react';
import { SEO } from '../../lib/seo';

const Contact: React.FC = () => (
  <div className="bg-transparent">
    <SEO
      title="Contact Our Team - Support & Feedback | IQ Checker XYZ"
      description="Get in touch with the IQ Checker XYZ team for support, feedback, or inquiries about our cognitive testing methodology."
      canonical="https://iqcheckerxyz.compresspdfto200kb.online/contact"
    />

    <section className="py-16 bg-slate-900/40 light:bg-slate-50/70 backdrop-blur-sm border-b border-slate-900 light:border-slate-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-black mb-6 text-slate-50 light:text-slate-900">Contact Us</h1>
        <p className="text-slate-300 light:text-slate-600 mb-12">Have questions about your results or our methodology? We're here to help.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ContactCard icon={<Mail />} title="Email" detail="technosharmaji44@gmail.com" />
          <ContactCard icon={<MessageSquare />} title="Support" detail="24/7 Ticketing" />
          <ContactCard icon={<Globe />} title="Location" detail="USA / Digital" />
        </div>

        <div className="glass bg-slate-900/40 light:bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-slate-800 light:border-slate-200 shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 light:text-slate-500">Name</label>
                <input type="text" className="p-4 rounded-xl bg-slate-950 light:bg-slate-50 border-2 border-slate-800 light:border-slate-200 text-slate-50 light:text-slate-900 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 light:text-slate-500">Email</label>
                <input type="email" className="p-4 rounded-xl bg-slate-950 light:bg-slate-50 border-2 border-slate-800 light:border-slate-200 text-slate-50 light:text-slate-900 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 light:text-slate-500">Message</label>
              <textarea rows={5} className="p-4 rounded-xl bg-slate-950 light:bg-slate-50 border-2 border-slate-800 light:border-slate-200 text-slate-50 light:text-slate-900 focus:border-blue-500 outline-none transition-all" placeholder="How can we help?"></textarea>
            </div>
            <button className="px-10 py-4 bg-blue-600 text-slate-50 font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

const ContactCard = ({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) => (
  <div className="glass bg-slate-900/40 light:bg-white/60 backdrop-blur-md p-8 rounded-3xl text-center border border-slate-800 light:border-slate-200">
    <div className="w-12 h-12 bg-blue-900/30 light:bg-blue-100 text-blue-400 light:text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
    </div>
    <h4 className="font-bold mb-2 text-slate-50 light:text-slate-900">{title}</h4>
    <p className="text-sm text-slate-300 light:text-slate-600">{detail}</p>
  </div>
);

export default Contact;
