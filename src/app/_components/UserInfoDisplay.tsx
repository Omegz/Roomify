/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import React, { useEffect } from "react";
import { client } from "~/trpc/react"; // Ensure this path is correct for your setup
import { signal } from "@preact/signals-react";

// Adjusting the interface to reflect the expected shape of the user information
interface UserInfo {
  active: boolean;
  cancelsAt: number;
  email: string;
  first_name: string | null;
  id: string;
  image: string | null;
  last_name: string | null;
  paidSubscription: boolean;
  stripeCustomerId: string;
  stripeEmail: string;
  stripeSubscriptionId: string;
  username: string;
}

// Initialize userInfo with null to signify no data initially
const userInfo = signal<{ user: UserInfo } | null>(null);
const isLoading = signal(false);
const errorMessage = signal("");

const UserInfoDisplay = () => {
  useEffect(() => {
    isLoading.value = true;
    errorMessage.value = ""; // Resetting error message

    const fetchUserInfo = async () => {
      try {
        // Assuming client.stripe.getUserInfo.query({}) correctly fetches the data
        const result = await client.stripe.getUserInfo.query({});
        userInfo.value = result; // Assigning the entire result to userInfo
        console.log("email", userInfo.value?.user.email); // Corrected access path
      } catch (error) {
        console.error("Error fetching user information:", error);
        errorMessage.value = "Failed to load user information.";
      } finally {
        isLoading.value = false;
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {errorMessage.value && (
        <div className="text-center text-red-500">{errorMessage.value}</div>
      )}
      {isLoading.value ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>User Information</h1>
          {userInfo.value ? (
            <>
              {/* <p>
                <strong>Username:</strong> {userInfo.value.user.username}
              </p> */}
              <p>
                <strong>Email:</strong> {userInfo.value.user.email}
              </p>
              {userInfo.value.user.cancelsAt && (
                <p>
                  <strong>Subscription Ends:</strong>{" "}
                  {new Date(
                    userInfo.value.user.cancelsAt * 1000,
                  ).toLocaleDateString("en-US")}
                </p>
              )}

              {/* <p>
                <strong>Name:</strong> {userInfo.value.user.first_name ?? "N/A"}{" "}
                {userInfo.value.user.last_name ?? ""}
              </p> */}
              {/* Display additional user fields as necessary */}
            </>
          ) : (
            <p>No user information available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfoDisplay;
