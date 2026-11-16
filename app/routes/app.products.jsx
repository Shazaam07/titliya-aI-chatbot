
import { useLoaderData } from "react-router";
import { useState } from "react";
import { authenticate } from "../shopify.server";

// Fetch products securely from Shopify's Admin API
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    #graphql
    query ProductIntelligence {
      products(first: 20, sortKey: TITLE) {
        nodes {
          id
          title
          handle
          status
          category {
            name
          }
          featuredImage {
            url
            altText
          }
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `);

  const result = await response.json();

  if (result.errors) {
    console.error("Shopify GraphQL errors:", result.errors);

    throw new Response("Unable to fetch Shopify products.", {
      status: 500,
    });
  }

  const products = result.data.products.nodes;

  const categories = [
    ...new Set(
      products
        .map((product) => product.category?.name)
        .filter(Boolean)
    ),
  ].sort();

  return {
    products,
    categories,
  };
};

export default function ProductIntelligence() {
  const { products, categories } = useLoaderData();

  // Search and category filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      product.title.toLowerCase().includes(search) ||
      product.handle.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <s-page heading="Product Intelligence">

      {/* Shopify Product Summary */}
      <s-section heading="Shopify Product Catalog">
        <s-paragraph>
          Products fetched directly from your Shopify development store.
        </s-paragraph>

        <s-text>
          Total products loaded: {products.length}
        </s-text>

        <s-text>
          Products displayed: {filteredProducts.length}
        </s-text>
      </s-section>

      {/* Product Search and Filters */}
      <s-section heading="Products">

        <s-stack direction="block" gap="base">

          <s-text-field
            label="Search products"
            placeholder="Search by product name or handle..."
            value={searchTerm}
            onInput={(event) =>
              setSearchTerm(event.currentTarget.value)
            }
          />

          <s-select
            label="Filter by category"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.currentTarget.value)
            }
          >
            <s-option value="All">All categories</s-option>

            {categories.map((category) => (
              <s-option key={category} value={category}>
                {category}
              </s-option>
            ))}
          </s-select>

        </s-stack>

        {/* Product Results */}
        {filteredProducts.length === 0 ? (
          <s-paragraph>
            No products found. Try another search or category.
          </s-paragraph>
        ) : (
          <s-stack direction="block" gap="base">

            {filteredProducts.map((product) => (
              <s-box
                key={product.id}
                padding="base"
                borderWidth="base"
                borderRadius="base"
              >

                <s-stack direction="inline" gap="base">

                  {product.featuredImage?.url && (
                    <img
                      src={product.featuredImage.url}
                      alt={
                        product.featuredImage.altText ||
                        product.title
                      }
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "contain",
                        flexShrink: 0,
                        borderRadius: "8px",
                      }}
                    />
                  )}

                  <s-stack direction="block" gap="small">

                    <s-heading>
                      {product.title}
                    </s-heading>

                    <s-text>
                      Price:{" "}
                      {product.priceRangeV2.minVariantPrice.currencyCode}{" "}
                      {product.priceRangeV2.minVariantPrice.amount}
                    </s-text>

                    <s-text color="subdued">
                      Category: {product.category?.name || "Uncategorized"}
                    </s-text>

                    <s-text color="subdued">
                      Status: {product.status}
                    </s-text>

                    <s-text color="subdued">
                      Handle: {product.handle}
                    </s-text>

                  </s-stack>
                </s-stack>
              </s-box>
            ))}

          </s-stack>
        )}

      </s-section>
    </s-page>
  );
}
