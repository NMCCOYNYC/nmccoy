type SubscribeOptions = {
  email: string;
  source?: string;
};

export function isKlaviyoConfigured() {
  return Boolean(
    process.env.KLAVIYO_PRIVATE_API_KEY?.trim() &&
      process.env.KLAVIYO_LIST_ID?.trim()
  );
}

export async function subscribeToKlaviyoList({
  email,
  source = "website",
}: SubscribeOptions) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY?.trim();
  const listId = process.env.KLAVIYO_LIST_ID?.trim();

  if (!apiKey || !listId) {
    throw new Error("Newsletter signup is not configured.");
  }

  const response = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        revision: "2024-02-15",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: source,
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED",
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId,
              },
            },
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      detail || `Unable to subscribe (${response.status}).`
    );
  }
}
