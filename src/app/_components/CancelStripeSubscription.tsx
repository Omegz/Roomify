"use client";
import React from "react";
import { client } from "~/trpc/react";
import { signal, computed } from "@preact/signals-react";

const isLoading = signal(false);
const successMessage = signal("");
const errorMessage = signal("");

const CancelStripeSubscription = () => {
  const cancelSubscription = async () => {
    isLoading.value = true;
    errorMessage.value = ""; // Reset error message
    successMessage.value = ""; // Reset success message

    try {
      // Assuming the mutation is named 'cancelSubscription' and does not require any input
      // Adjust the mutation name and input according to your tRPC router configuration
      const result = await client.stripe.cancelSubscription.mutate({});
      successMessage.value = "Subscription canceled successfully.";
    } catch (error) {
      console.error("Error canceling Stripe subscription:", error);
      errorMessage.value = "Error canceling subscription.";
    } finally {
      isLoading.value = false;
    }
  };

  const errorMessageDisplay = computed(() =>
    errorMessage.value ? (
      <div className="text-center text-red-500">{errorMessage.value}</div>
    ) : null,
  );

  const successMessageDisplay = computed(() =>
    successMessage.value ? (
      <div className="text-center text-green-500">{successMessage.value}</div>
    ) : null,
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {errorMessageDisplay.value}
      {successMessageDisplay.value}
      <button
        onClick={cancelSubscription}
        disabled={isLoading.value}
        className="rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-700 disabled:bg-red-300"
      >
        {isLoading.value ? "Processing..." : "Cancel Subscription"}
      </button>
    </div>
  );
};

export default CancelStripeSubscription;
