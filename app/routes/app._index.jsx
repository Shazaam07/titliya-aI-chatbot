
import { authenticate } from "../shopify.server";

// Step 1: Verify that the current user has Shopify Admin access.
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

// Step 2: Render the TITLIYA AI dashboard.
export default function Index() {
  return (
    <s-page heading="TITLIYA AI">

      <s-section heading="Shopping Intelligence Platform">
        <s-paragraph>
          Welcome to TITLIYA AI. Manage your AI shopping assistant,
          product intelligence, jewellery knowledge and customer
          conversations from one place.
        </s-paragraph>
      </s-section>

      <s-section heading="Core Modules">
        <s-stack direction="block" gap="base">

          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
          >
            <s-heading>01. AI Assistant</s-heading>
            <s-paragraph>
              Manage the conversational shopping assistant,
              customer questions and AI response settings.
            </s-paragraph>
            <s-text color="subdued">
              Status: Not configured
            </s-text>
          </s-box>

          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
          >
            <s-heading>02. Product Intelligence</s-heading>
            <s-paragraph>
              Connect Shopify products, prices, inventory,
              collections and product recommendations.
            </s-paragraph>
            <s-text color="subdued">
              Status: Not configured
            </s-text>
          </s-box>

          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
          >
            <s-heading>03. Knowledge Engine</s-heading>
            <s-paragraph>
              Manage jewellery FAQs, brand information,
              product care guides and customer policies.
            </s-paragraph>
            <s-text color="subdued">
              Status: Not configured
            </s-text>
          </s-box>

          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
          >
            <s-heading>04. Conversation Management</s-heading>
            <s-paragraph>
              Review chatbot conversations, unanswered
              questions and customer feedback.
            </s-paragraph>
            <s-text color="subdued">
              Status: Not configured
            </s-text>
          </s-box>

          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
          >
            <s-heading>05. Analytics</s-heading>
            <s-paragraph>
              Monitor chatbot engagement, product clicks,
              assisted purchases and unanswered queries.
            </s-paragraph>
            <s-text color="subdued">
              Status: Not configured
            </s-text>
          </s-box>

          <s-box
            padding="base"
            borderWidth="base"
            borderRadius="base"
          >
            <s-heading>06. System Configuration</s-heading>
            <s-paragraph>
              Configure AI instructions, integrations,
              security settings and system preferences.
            </s-paragraph>
            <s-text color="subdued">
              Status: Not configured
            </s-text>
          </s-box>

        </s-stack>
      </s-section>

      <s-section heading="Development Environment">
        <s-paragraph>
          TITLIYA AI is currently running in a Shopify
          development environment.
        </s-paragraph>

        <s-paragraph>
          All features will be developed and tested here
          before production deployment.
        </s-paragraph>
      </s-section>

    </s-page>
  );
}
