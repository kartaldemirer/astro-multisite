type FAQItem = { question: string; answer: string };
type BreadcrumbItem = { name: string; item: string };
type ItemListElement = { position: number; url: string; name: string; image?: string };
type ReviewItem = { name: string; ratingValue: string; bestRating: string };

interface SchemaOptions {
  schemaType: "Article" | "FAQPage";
  title: string;
  description: string;
  url: string;
  logoUrl: string;
  organizationName: string;
  organizationUrl: string;
  sameAs?: string[];
  datePublished?: string;
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
  datePublished = new Date().toISOString().split("T")[0],
  inLanguage = "tr",
  faq,
  breadcrumbs,
  itemList,
  reviews
}: SchemaOptions) {
  const schemas: any[] = [];

  // Main Article or FAQ schema
  const mainSchema: any = {
    "@context": "https://schema.org",
    "@type": schemaType || "Article",
    "headline": title,
    "description": description,
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
    "inLanguage": inLanguage
  };

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

  // Organization schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "url": organizationUrl,
    "logo": logoUrl,
    ...(sameAs.length > 0 ? { sameAs } : {})
  });

  // BreadcrumbList schema
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

  // ItemList schema
  if (itemList && itemList.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Freespin Veren Casino Siteleri 2025",
      "itemListElement": itemList.map(i => ({
        "@type": "ListItem",
        "position": i.position,
        "url": i.url,
        "name": i.name,
        ...(i.image ? { image: i.image } : {})
      }))
    });
  }

  // WebSite schema
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

  // Reviews schema with URL relation
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