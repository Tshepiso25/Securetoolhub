import { useEffect } from "react"

const SITE_NAME = "SecureToolHub"
const SITE_URL = "https://securettoolhub.com"

function Seo({
  title = SITE_NAME,
  description = "Free, secure, and easy-to-use online tools for developers, students, and everyday users.",
  path = "/",
}) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`

    // Ensures paths always begin with one forward slash.
    const normalizedPath = path.startsWith("/") ? path : `/${path}`

    // Prevents the homepage from ending with unnecessary extra slashes.
    const canonicalUrl =
      normalizedPath === "/"
        ? SITE_URL
        : `${SITE_URL}${normalizedPath.replace(/\/+$/, "")}`

    document.title = fullTitle

    const updateMetaTag = ({
      selector,
      attribute,
      attributeValue,
      content,
    }) => {
      let tag = document.head.querySelector(selector)

      if (!tag) {
        tag = document.createElement("meta")
        tag.setAttribute(attribute, attributeValue)
        document.head.appendChild(tag)
      }

      tag.setAttribute("content", content)
    }

    const metaTags = [
      {
        selector: 'meta[name="description"]',
        attribute: "name",
        attributeValue: "description",
        content: description,
      },
      {
        selector: 'meta[property="og:title"]',
        attribute: "property",
        attributeValue: "og:title",
        content: fullTitle,
      },
      {
        selector: 'meta[property="og:description"]',
        attribute: "property",
        attributeValue: "og:description",
        content: description,
      },
      {
        selector: 'meta[property="og:type"]',
        attribute: "property",
        attributeValue: "og:type",
        content: "website",
      },
      {
        selector: 'meta[property="og:url"]',
        attribute: "property",
        attributeValue: "og:url",
        content: canonicalUrl,
      },
      {
        selector: 'meta[property="og:site_name"]',
        attribute: "property",
        attributeValue: "og:site_name",
        content: SITE_NAME,
      },
      {
        selector: 'meta[name="twitter:card"]',
        attribute: "name",
        attributeValue: "twitter:card",
        content: "summary_large_image",
      },
      {
        selector: 'meta[name="twitter:title"]',
        attribute: "name",
        attributeValue: "twitter:title",
        content: fullTitle,
      },
      {
        selector: 'meta[name="twitter:description"]',
        attribute: "name",
        attributeValue: "twitter:description",
        content: description,
      },
    ]

    metaTags.forEach(updateMetaTag)

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