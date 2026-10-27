import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate.js';

/**
 * Posts as an index, not a grid of cards: date on the left, title and
 * excerpt in the reading column, category and length on the right. Each row
 * is one link, stretched from the title. `lead` sets the first post larger,
 * the way a front page leads with one story.
 */
const BlogIndex = ({ posts, lead = false, headingLevel: Heading = 'h3' }) => (
  <ol className="border-t border-border">
    {posts.map((post, i) => {
      const isLead = lead && i === 0;
      return (
        <li
          key={post.slug}
          className={`group relative grid gap-x-8 gap-y-2 border-b border-border sm:grid-cols-[9rem_1fr] lg:grid-cols-[10rem_1fr_10rem] ${
            isLead ? 'py-10 md:py-14' : 'py-6 md:py-8'
          }`}
        >
          <time dateTime={post.date} className="pt-1 text-body-sm tabular-nums text-ink-muted">
            {formatDate(post.date)}
          </time>
          <div className="max-w-[42rem]">
            <Heading className={isLead ? 'text-display-lg text-ink [text-wrap:balance]' : 'text-heading-lg text-ink'}>
              <Link
                to={`/blog/${post.slug}`}
                className="underline-offset-4 decoration-1 group-hover:underline focus:outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-brand"
              >
                {post.title}
              </Link>
            </Heading>
            <p className={`mt-2 text-ink-secondary ${isLead ? 'text-lede md:mt-4' : 'text-body line-clamp-2'}`}>
              {post.excerpt}
            </p>
          </div>
          <p className="flex gap-x-4 pt-1 text-body-sm text-ink-muted sm:col-start-2 lg:col-start-3 lg:flex-col lg:gap-y-1 lg:text-right">
            <span>{post.category}</span>
            <span>{post.readTime}</span>
          </p>
        </li>
      );
    })}
  </ol>
);

export default BlogIndex;
