import { useEffect } from "react"

function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title.includes("SecureToolHub")
      ? title
      : `${title} | SecureToolHub`

    const canonicalUrl = `https://securetoolhub-67pt.vercel.app${path}`

    document.title = fullTitle

    const updateMetaTag = (selector, attribute, value, content) => {
      let tag = document.head.querySelector(selector)

      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute(attribute, value)
        document.head.appendChild(tag)
      }

      tag.setAttribute("content", content)
    }

    updateMetaTag(
      'meta[name="description"]',
      "name",
      "description",
      description
    )

    updateMetaTag(
      'meta[property="og:title"]',
      "property",
      "og:title",
      fullTitle
    )

    updateMetaTag(
      'meta[property="og:description"]',
      "property",
      "og:description",
      description
    )

    updateMetaTag(
      'meta[property="og:type"]',
      "property",
      "og:type",
      "website"
    )

    updateMetaTag(
      'meta[property="og:url"]',
      "property",
      "og:url",
      canonicalUrl
    )

    updateMetaTag(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image"
    )

    updateMetaTag(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      fullTitle
    )

    updateMetaTag(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      description
    )

    let canonical = document.head.querySelector('link[rel="canonical"]')

    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }

    canonical.setAttribute("href", canonicalUrl)
  }, [title, description, path])

  return null
}

export default Seo