import moment from "moment";

const SEO_PRODUCT_DATA_URL =
  "https://apiparis.parisbeautybd.com/lexin-api/all-products-crawler";

function generateSiteMap(prod) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     
        ${prod
          ?.map(({ slug, google_barcode }) => {
            return `
       <url>
           <loc>${`https://www.laxzin.com/product/${slug}`}</loc>
           <lastmod>${google_barcode}</lastmod>
           <lastmod>${moment(new Date()).format("YYYY-MM-DD")}</lastmod>
           <priority>1.00</priority>
       </url>
     `;
          })
          .join("")}
   </urlset>
 `;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const prod_request = await fetch(SEO_PRODUCT_DATA_URL);

  const product = await prod_request.json();

  const prod = product?.products;

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(prod);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
