import React from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogTitle,
  ogDescription
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://iqcheckerxyz.compresspdfto200kb.online/';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
    </>
  );
};
