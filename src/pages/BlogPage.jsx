import React from 'react'
import Seo from '../components/Seo'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Seo title="ECS Test Blog | Tips, Guides & Updates for 2026" description="Guides and tips to help you pass your ECS / ECS test first time: study strategies, syllabus updates, and card-type explainers." path="/blog" />
      <h1 className="text-4xl font-bold text-center mb-4">ECS Blog</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Latest news, tips, and guides to help you pass your ECS test
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
            <div className="text-sm text-green-600 mb-2">{post.date} · {post.readTime}</div>
            <h2 className="text-xl font-bold mb-2 hover:text-green-600 transition">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <span className="inline-block mt-3 text-green-600 font-medium">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogPage
