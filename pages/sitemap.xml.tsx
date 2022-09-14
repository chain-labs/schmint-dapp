const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
     <url>
        <loc>http://schmint.simplrhq.com/</loc>
        <lastmod>2022-09-14</lastmod>
     </url>
     <url>
        <loc>http://schmint.simplrhq.com/learn-more</loc>
        <lastmod>2022-09-14</lastmod>
     </url>
  </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
