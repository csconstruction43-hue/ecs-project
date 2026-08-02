import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo, { faqSchema, breadcrumbSchema, articleSchema } from '../components/Seo'
import { blogPosts, getPostBySlug } from '../data/blogPosts'

function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Seo title="Post not found | ECSPrep Blog" path={`/blog/${slug}`} noindex />
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-green-600">← Back to blog</Link>
      </div>
    )
  }

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    articleSchema({
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      datePublished: post.isoDate || post.date,
      dateModified: post.isoDateModified || post.isoDate || post.date,
      author: post.author,
      path: `/blog/${post.slug}`,
    }),
  ]
  if (post.faqs?.length) {
    jsonLd.push(faqSchema(post.faqs))
  }

  // Related posts: up to 3 other posts, for internal linking (helps both
  // users and crawlers discover more content from each article).
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Seo
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        keywords={post.keywords}
        path={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />
      <Link to="/blog" className="text-green-600 hover:underline mb-4 inline-block">← Back to blog</Link>
      <article className="bg-white rounded-xl shadow-md p-8">
        <div className="text-sm text-gray-500 mb-2">{post.date} · {post.readTime} · By {post.author}</div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="prose max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:bg-gray-50"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">Ready to practice?</h3>
          <p className="mb-3">Take our free ECS mock test to prepare for your exam.</p>
          <Link to="/mock-test" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Start Free Mock Test →</Link>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">More from the blog</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4">
                <p className="font-semibold text-gray-900 text-sm mb-1 hover:text-green-600">{r.title}</p>
                <p className="text-xs text-gray-500">{r.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogPostPage
