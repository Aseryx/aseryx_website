import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../common/Card.jsx';
import { formatDate } from '../../utils/formatDate.js';

/** Blog teaser: one stretched link per card, like the dataset cards. */
const BlogCard = ({ post }) => (
  <Card as="article" className="group relative flex flex-col p-6 transition-colors duration-150 hover:border-border-hover">
    <p className="flex flex-wrap items-center gap-x-2 text-meta text-ink-muted">
      <span>{post.category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readTime}</span>
    </p>
    <h3 className="mt-4 text-heading-lg text-ink">
      <Link
        to={`/blog/${post.slug}`}
        className="focus:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-brand"
      >
        {post.title}
      </Link>
    </h3>
    <p className="mt-3 text-body text-ink-secondary line-clamp-3">{post.excerpt}</p>
    <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-button-md text-ink" aria-hidden="true">
      Read
      <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
    </p>
  </Card>
);

export default BlogCard;
