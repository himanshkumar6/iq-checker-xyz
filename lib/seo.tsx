import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogTitle,
  ogDescription,
  noindex = false
}) => {
  useEffect(() => {
    // Update document title directly
    document.title = title;

    // Helper to set or update meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Helper to set or update link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }

      element.href = href;
    };

    // Helper to remove meta tag
    const removeMetaTag = (name: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      const element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (element) element.remove();
    };

    // Set description
    setMetaTag('description', description);

    // Handle robots meta
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow');
    } else {
      removeMetaTag('robots');
    }

    // Set canonical
    if (canonical && !noindex) {
      setLinkTag('canonical', canonical);
    }

    // Open Graph tags
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', typeof window !== 'undefined' ? window.location.href : '', true);

    // Twitter tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle || title);
    setMetaTag('twitter:description', ogDescription || description);

  }, [title, description, canonical, ogType, ogTitle, ogDescription, noindex]);

  // This component doesn't render anything to the DOM
  return null;
};
