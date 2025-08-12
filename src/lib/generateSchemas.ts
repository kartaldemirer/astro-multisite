// generateSchemas.ts
type FAQItem = { question: string; answer: string };
type BreadcrumbItem = { name: string; item: string };
type ItemListElement = { position: number; url: string; name: string; image?: string };
type ReviewItem = { name: string; ratingValue: string; bestRating: string };

type SchemaOptions = {
  schemaType?: string;
  title: string;
  description: string;
  url: string;
  logoUrl: string;
  organizationName: string;
  organizationUrl: string;
  sameAs?: string[];
  datePublished?: string;
  dateModified?: string; // ❗ default kaldırıldı
  inLanguage?: string;
  faq?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  itemList?: ItemListElement[];
  reviews?: ReviewItem[];
};

export function generateSchemas({
  schemaType,
  title,
  description,
  url,
  logoUrl,
  organizationName,
  organizationUrl,
  sameAs = [],
  datePublished,
  dateModified,                 // ❗ default kaldırıldı
  inLanguage = "tr",
  faq,
  breadcrumbs,
  itemList,
  reviews
}: SchemaOptions) {
  const schemas: any[] = [];

  // Kimlikler (entity reuse) — arama motoru tarafında ilişkilendirme netleşir
  const websiteId = `${organizationUrl}#website`;
  const orgId = `${organizationUrl}#org`;
  const webPageId = `${url}#webpage`;

  const mainSchema: any = {
    "@context": "https://schema.org",
    "@type": schemaType || "Article",
    "@id": webPageId,
    "headline": title,
    "description": description,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "isPartOf": { "@id": websiteId },
    "inLanguage": inLanguage,
    "author": { "@id": orgId },
    "publisher": { "@id": orgId },
    ...(datePublished ? { "datePublished": datePublished } : {}),
    ...(dateModified ? { "dateModified": dateModified } : {}),
  };

  if (faq && faq.length > 0 && schemaType === "Article") {
    mainSchema.mainEntity = faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }));
  }

  schemas.push(mainSchema);

  // Organization (tekil @id ile)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    "name": organizationName,
    "url": organizationUrl,
    "logo": {
      "@type": "ImageObject",
      "url": logoUrl
    },
    ...(sameAs.length > 0 ? { sameAs } : {})
  });

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": b.name,
        "item": b.item
      }))
    });
  }

  if (itemList && itemList.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
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

  // WebSite (tekil @id ile)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    "name": organizationName,
    "alternateName": ["Kumar Puan", "kumarpuan"],
    "url": organizationUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${organizationUrl}?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  });

  if (reviews && reviews.length > 0) {
    reviews.forEach(review => {
      const matchedItem = itemList?.find(item => item.name === review.name);
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Organization",
          "name": review.name,
          ...(matchedItem?.url ? { "url": matchedItem.url } : {})
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.ratingValue,
          "bestRating": review.bestRating
        },
        "author": { "@id": orgId }
      });
    });
  }

  return schemas;
}
