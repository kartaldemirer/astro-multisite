// generateSchemas.ts
type FAQItem = { question: string; answer: string };
type BreadcrumbItem = { name: string; item: string };
type ItemListElement = { position: number; url: string; name: string; image?: string };
type ReviewItem = { name: string; ratingValue: string; bestRating: string };

interface SchemaOptions {
  schemaType: "Article" | "FAQPage";
  title: string;
  description: string;
  url: string;                // sayfanın kanonik URL'si
  logoUrl: string;
  organizationName: string;
  organizationUrl: string;
  sameAs?: string[];
  datePublished?: string;     // ISO 8601
  dateModified?: string;      // ISO 8601  << YENİ
  inLanguage?: string;
  faq?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  itemList?: ItemListElement[];
  reviews?: ReviewItem[];
}

export function generateSchemas({
  schemaType,
  title,
  description,
  url,
  logoUrl,
  organizationName,
  organizationUrl,
  sameAs = [],
  datePublished = new Date().toISOString(),
  dateModified,                                // << YENİ
  inLanguage = "tr",
  faq,
  breadcrumbs,
  itemList,
  reviews
}: SchemaOptions) {
  const schemas: any[] = [];

  // Article/FAQ ana şema
  const mainSchema: any = {
    "@context": "https://schema.org",
    "@type": schemaType || "Article",
    "headline": title,
    "description": description,
    "mainEntityOfPage": url,                   // Google tavsiyesi
    "inLanguage": inLanguage,
    "author": {
      "@type": "Organization",
      "name": organizationName,
      "url": organizationUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": organizationName,
      "logo": {
        "@type": "ImageObject",
        "url": logoUrl
      }
    },
    "datePublished": datePublished,
    ...(dateModified ? { "dateModified": dateModified } : {}), // << YENİ
  };

  // Article ise FAQ'yı "mainEntity" olarak gömebilirsin (uygulaman doğru)
  if (faq && faq.length > 0 && schemaType === "Article") {
    mainSchema.mainEntity = faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }));
  }

  schemas.push(mainSchema);

  // Organization
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "url": organizationUrl,
    "logo": logoUrl,
    ...(sameAs.length > 0 ? { sameAs } : {})
  });

  // BreadcrumbList
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

  // ItemList
  if (itemList && itemList.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": title, // sabit isim yerine sayfa başlığını kullanmak daha doğal
      "itemListElement": itemList.map(i => ({
        "@type": "ListItem",
        "position": i.position,
        "url": i.url,
        "name": i.name,
        ...(i.image ? { image: i.image } : {})
      }))
    });
  }

  // WebSite
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": organizationName,
    "url": organizationUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${organizationUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  });

  // Review ilişkileri
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
        "author": {
          "@type": "Organization",
          "name": organizationName
        }
      });
    });
  }

  return schemas;
}