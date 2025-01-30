// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = [{ slug: "abc" }, { slug: "def" }]

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>slug: {slug}</div>
}
