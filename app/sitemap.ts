import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blogPosts';

const BASE_URL = 'https://b-p-cleaners.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-use`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/sms-terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/licenses`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
