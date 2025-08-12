// generateSchemas.ts

type FAQItem = { question: string; answer: string };
type BreadcrumbItem = { name: string; item: string };
type ItemListElement = { position: number; url: string; name: string; image?: string };
type ReviewItem = { name: string; ratingValue: string; bestRating: string };

interface SchemaOptions {
  schemaType: "Article" | "FAQPage";
  title: string;
  description: string;
  url: string;                // kanonik URL
  logoUrl: string;
  organizationName: string;
  organizationUrl: string;
  imageUrl?: string;          // sayfa görseli (OG ile aynı)
  imageWidth?: number;
  imageHeight?: number;
  sameAs?: string[];
  datePublished?: string;     // ISO 8601 UTC
  dateModified?: string;      // ISO 8601 UTC
  inLanguage?: string;        // örn. "tr-TR"
  faq?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  itemList?: ItemListElement[];
  reviews?: ReviewItem[];
}

export function generateSchemas(opts: SchemaOptions) {
  const {
    schemaType, title, description, url, logoUrl,
    organizationName, organizationUrl, imageUrl,
    imageWidth, imageHeight,
    sameAs = [], datePublished, dateModified, inLanguage = "tr-TR",
    faq = [], breadcrumbs = [], itemList = [], reviews = []
  } = opts;

  const schemas: any[] = [];

  // Tekdüze @id’ler
  const websiteId   = `${organizationUrl}#website`;
  const orgId       = `${organizationUrl}#org`;
  const webPageId   = `${url}#webpage`;
  const articleId   = `${url}#article`;
  const imageId     = imageUrl ? `${url}#primaryimage` : undefined;
  const crumbsId    = `${url}#breadcrumbs`;
  const itemListId  = `${url}#itemlist`;

  // ---------- İçerik düğümü ----------
  if (schemaType === "Article") {
    // Article
    const article: any = {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": articleId,
      "headline": title,
      "description": description,
      "inLanguage": inLanguage,
      "isPartOf": { "@id": websiteId },
      "mainEntityOfPage": { "@id": webPageId },
      "author": { "@id": orgId },
      "publisher": { "@id": orgId },
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified ? { dateModified } : {}),
      ...(imageId ? { image: { "@id": imageId } } : {})
    };

    if (faq.length > 0) {
      article.mainEntity = faq.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }));
    }

    schemas.push(article);

    // WebPage
    const webPage: any = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": webPageId,
      "url": url,
      "isPartOf": { "@id": websiteId },
      "name": title,
      "inLanguage": inLanguage,
      "mainEntity": { "@id": articleId },
      ...(imageId ? { primaryImageOfPage: { "@id": imageId } } : {})
    };
    schemas.push(webPage);

  } else {
    // FAQPage (Article yok; WebPage’in alt türü)
    const faqPage: any = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": webPageId,
      "url": url,
      "isPartOf": { "@id": websiteId },
      "name": title,
      "inLanguage": inLanguage,
      ...(imageId ? { primaryImageOfPage: { "@id": imageId } } : {}),
      "mainEntity": faq.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    };
    schemas.push(faqPage);
  }

  // ---------- ImageObject ----------
  if (imageUrl) {
    const imageObj: any = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": imageId,
      "url": imageUrl,
      "contentUrl": imageUrl,
    };
    if (imageWidth)  imageObj.width  = imageWidth;
    if (imageHeight) imageObj.height = imageHeight;
    schemas.push(imageObj);
  }

  // ---------- Organization ----------
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    "name": organizationName,
    "url": organizationUrl,
    "logo": { "@type": "ImageObject", "url": logoUrl },
    ...(sameAs.length ? { sameAs } : {})
  });

  // ---------- WebSite ----------
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    "name": organizationName,
    "alternateName": ["Kumar Puan", "kumarpuan"],
    "url": organizationUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${organizationUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  });

  // ---------- BreadcrumbList ----------
  if (breadcrumbs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": crumbsId,
      "itemListElement": breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": b.item
      }))
    });
  }

  // ---------- ItemList ----------
  if (itemList.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": itemListId,
      "name": title,
      "itemListElement": itemList.map(i => ({
        "@type": "ListItem",
        "position": i.position,
        "url": i.url,
        "name": i.name,
        ...(i.image ? { image: i.image } : {})
      }))
    });
  }

  // ---------- Review ----------
  if (reviews.length) {
    reviews.forEach(r => {
      const matched = itemList.find(i => i.name === r.name);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Organization",
          "name": r.name,
          ...(matched?.url ? { "url": matched.url } : {})
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": r.ratingValue,
          "bestRating": r.bestRating
        },
        "author": { "@id": orgId }
      });
    });
  }

  return schemas;
}