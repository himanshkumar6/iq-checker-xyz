export const GA_MEASUREMENT_ID = "G-L2R59CQBF0";

export const loadGA = () => {
  if (typeof window === "undefined") return;
  if ((window as any).gtag) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      send_page_view: false
    });
  `;
  document.head.appendChild(script2);
};

export const trackPageView = (path: string) => {
  if (!(window as any).gtag) return;
  (window as any).gtag("event", "page_view", {
    page_path: path,
  });
};
