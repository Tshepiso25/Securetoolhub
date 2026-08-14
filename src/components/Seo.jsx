import { useEffect } from "react"

const SITE_NAME = "SecureToolHub"
const SITE_URL = "https://securettoolhub.com"
const DEFAULT_DESCRIPTION =
  "Free online developer tools for formatting, encoding, hashing, testing and converting data. Fast, browser-based and easy to use."

function Seo({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  structuredData = null,
  image = `${SITE_URL}/og-image.png`,
}) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`

    const normalizedPath = path.startsWith("/") ? path : `/${path}`

    const cleanPath =
      normalizedPath === "/"
        ? "/"
        : normalizedPath.replace(/\/+$/, "")

    const canonicalUrl =
      cleanPath === "/"
        ? SITE_URL
        : `${SITE_URL}${cleanPath}`

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
        selector: 'meta[name="robots"]',
        attribute: "name",
        attributeValue: "robots",
        content: "index, follow",
      },
      {
        selector: 'meta[name="googlebot"]',
        attribute: "name",
        attributeValue: "googlebot",
        content: "index, follow",
      },

      // Open Graph
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
        selector: 'meta[property="og:image"]',
        attribute: "property",
        attributeValue: "og:image",
        content: image,
      },
      {
        selector: 'meta[property="og:image:alt"]',
        attribute: "property",
        attributeValue: "og:image:alt",
        content: `${SITE_NAME} - ${title}`,
      },

      // Twitter
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
      {
        selector: 'meta[name="twitter:image"]',
        attribute: "name",
        attributeValue: "twitter:image",
        content: image,
      },
    ]

    metaTags.forEach(updateMetaTag)

    // Canonical URL
    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    )

    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }

    canonical.setAttribute("href", canonicalUrl)

    // Structured data
    const scriptId = "securetoolhub-structured-data"

    let structuredDataScript = document.head.querySelector(
      `script#${scriptId}`
    )

    if (structuredData) {
      if (!structuredDataScript) {
        structuredDataScript = document.createElement("script")
        structuredDataScript.id = scriptId
        structuredDataScript.type = "application/ld+json"
        document.head.appendChild(structuredDataScript)
      }

      structuredDataScript.textContent =
        JSON.stringify(structuredData)
    } else if (structuredDataScript) {
      structuredDataScript.remove()
    }

    return () => {
      const currentScript = document.head.querySelector(
        `script#${scriptId}`
      )

      if (currentScript) {
        currentScript.remove()
      }
    }
  }, [
    title,
    description,
    path,
    structuredData,
    image,
  ])

  return null
}

export default Seo