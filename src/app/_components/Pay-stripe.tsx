"use client";
import React, { useState } from "react";
import { client } from "~/trpc/react";
import { signal, computed, effect } from "@preact/signals-react";

const isLoading = signal(false);
const errorMessage = signal("");

// This component could be more elaborate depending on your needs,
// including handling user input for different types of sessions (e.g., product selection)
const StripePaymentInitiation = () => {
  const [url, setUrl] = useState("");

  const initiateStripeSession = async () => {
    isLoading.value = true;
    errorMessage.value = ""; // Reset error message

    try {
      const response = await client.stripe.createCheckoutSession.mutate({});
      if (response.url) {
        setUrl(response.url); // Save the URL for redirection
        window.location.href = response.url; // Redirect to Stripe's checkout page
      } else {
        errorMessage.value = "Failed to initiate payment.";
      }
    } catch (error) {
      console.error("Error initiating Stripe session:", error);
      errorMessage.value = "Error initiating payment.";
    } finally {
      isLoading.value = false;
    }
  };

  const errorMessageDisplay = computed(() =>
    errorMessage.value ? (
      <div className="text-center text-red-500">{errorMessage.value}</div>
    ) : null,
  );

  // React to changes in the URL state for redirection or other actions
  effect(() => {
    if (url) {
      // Additional logic if needed before redirecting, like analytics
      window.location.href = url;
    }
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {errorMessageDisplay.value}
      <button
        onClick={initiateStripeSession}
        disabled={isLoading.value}
        className="rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading.value ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
};

export default StripePaymentInitiation;
