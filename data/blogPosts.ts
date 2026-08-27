export interface BlogPostSource {
  name: string;
  publisher: string;
  url: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  reviewer?: {
    name: string;
    role: string;
    badge: string;
  };
  heroImage: string;
  imageCaption?: string;
  featured?: boolean;
  keyTakeaways: string[];
  sources?: BlogPostSource[];
  content: {
    intro: string;
    sections: {
      heading: string;
      subheading?: string;
      body: string[];
      highlightBox?: {
        title: string;
        text: string;
      };
      table?: {
        headers: string[];
        rows: string[][];
        caption?: string;
      };
      quote?: {
        text: string;
        cite: string;
      };
    }[];
    conclusion: string;
  };
}

/**
 * STUB — placeholder.
 *
 * The original AdvantageFirst lender blog dataset (185KB, 3000+ lines of loan/credit
 * articles) was deliberately NOT ported into this repo — it's lender-specific content
 * the B&P Cleaners brand plan replaces outright, not adapts. This stub keeps the same
 * exported types and functions (BlogPost, BLOG_CATEGORIES, BLOG_POSTS, getPostBySlug,
 * getRelatedPosts) so app/blog/*, components/BlogPreview.tsx, and the rest of the site
 * still compile. Replace BLOG_CATEGORIES/BLOG_POSTS with real cleaning-business content,
 * or remove the blog system entirely — see the Open Problems in the project Overview.
 */
export const BLOG_CATEGORIES = [
  { name: 'All', slug: 'all' },
];

export const BLOG_POSTS: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limitOrCategory?: string | number,
  maybeLimit?: number
): BlogPost[] {
  let categorySlug: string | undefined;
  let limit = 3;

  if (typeof limitOrCategory === 'number') {
    limit = limitOrCategory;
  } else if (typeof limitOrCategory === 'string') {
    categorySlug = limitOrCategory;
    if (typeof maybeLimit === 'number') {
      limit = maybeLimit;
    }
  }

  const currentPost = getPostBySlug(currentSlug);
  const cat = categorySlug || currentPost?.categorySlug;

  const sameCategory = cat
    ? BLOG_POSTS.filter((p) => p.slug !== currentSlug && p.categorySlug === cat)
    : [];

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherPosts = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && (!cat || p.categorySlug !== cat)
  );

  return [...sameCategory, ...otherPosts].slice(0, limit);
}
