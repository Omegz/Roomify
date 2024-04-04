"use client";
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState } from "react";
import { client } from "~/trpc/react";
import { signal, computed, effect } from "@preact/signals-react";

const isLoading = signal(false);
const errorMessage = signal("");

// This component could be more elaborate depending on your needs,
// including handling user input for different types of sessions (e.g., product selection)
const StripeYearlyPaymentInitiation = () => {
  const [url, setUrl] = useState("");

  const initiateStripeSession = async () => {
    isLoading.value = true;
    errorMessage.value = ""; // Reset error message

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const response = await client.stripe.createCheckoutSessionYearly.mutate(
        {},
      );
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
    <div className="flex flex-col items-center justify-center">
      {errorMessageDisplay.value}
      <button
        onClick={initiateStripeSession}
        disabled={isLoading.value}
        className="rounded-md  px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading.value ? "Processing..." : "Subscribe"}
      </button>
    </div>
  );
};

export default StripeYearlyPaymentInitiation;
