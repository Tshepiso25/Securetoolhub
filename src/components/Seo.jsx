import { useEffect } from "react"

const SITE_NAME = "SecureToolHub"
const SITE_URL = "https://securettoolhub.com"

function Seo({
  title = SITE_NAME,
  description = "Free, secure and easy-to-use online tools for developers, students and creators.",
  path = "/",
  structuredData = null,
}) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`

    const normalizedPath = path.startsWith("/") ? path : `/${path}`

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

      structuredDataScript.textContent = JSON.stringify(structuredData)
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
  }, [title, description, path, structuredData])

  return null
}

export default Seo