/**
 * Newsletter Subscriber Type Definition
 * 
 * Shared type for newsletter subscription data.
 * Used across all backend adapters and the subscribe API route.
 */

export interface NewsletterSubscriber {
  email: string;
  source: string;        // 'blog_preview' | 'blog_page' | 'blog_article'
  subscribedAt: string;  // ISO 8601 timestamp
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  results?: Array<{
    backend: string;
    success: boolean;
    message: string;
  }>;
}
