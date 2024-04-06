import React from "react";
import StripePaymentInitiation from "~/app/_components/Pay-stripe";
import StripeYearlyPaymentInitiation from "~/app/_components/StripeYearly";
import styles from "./SubscriptionStyles.module.css"; // Ensure this path is correct

const SubscriptionOptions = () => {
  return (
    // Applying CSS module class along with Tailwind CSS classes
    <section
      className={`${styles.section} overflow-hidden bg-[#131417] sm:h-screen`}
    >
      <div className="ml-8 flex items-center justify-center">
        {/* Monthly Subscription Option */}
        <div className="lg:mr-7">
          <div className={styles.card + " text-center"}>
            {" "}
            {/* Applying CSS module for card */}
            <div className={styles.title}>
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
              <h2>Monthly</h2>
            </div>
            <div className={styles.price}>
              <h4>
                <sup>$</sup>8
              </h4>
            </div>
            <div className={styles.option}>
              <ul>
                <li>
                  <i className="fa fa-check" aria-hidden="true"></i> Unlimited
                  Uses
                </li>
                <li>
                  <i className="fa fa-check" aria-hidden="true"></i> Tailored
                  Prompts
                </li>
                <li>
                  <i className="fa fa-check" aria-hidden="true"></i> Personal
                  Prompt Library
                </li>
                <li>
                  <i className="fa fa-times" aria-hidden="true"></i> Cancel
                  Anytime
                </li>
              </ul>
            </div>
            <StripePaymentInitiation />
          </div>
        </div>

        {/* Yearly Subscription Option */}
        <div>
          <div className={styles.card1 + " text-center"}>
            {" "}
            {/* Applying CSS module for card */}
            <div className={styles.title}>
              <i className="fa fa-plane" aria-hidden="true"></i>
              <h2>Yearly</h2>
            </div>
            <div className={styles.price}>
              <h4>
                <sup>$</sup>78
              </h4>
            </div>
            <div className={styles.option}>
              <ul>
                <li>
                  <i className="fa fa-times" aria-hidden="true"></i> All
                  Features from monthly
                </li>
                <li>
                  <i className="fa fa-check" aria-hidden="true"></i> Multiple
                  Screens
                </li>
                <li>
                  <i className="fa fa-check" aria-hidden="true"></i> Priority
                  Access in Chat
                </li>
                <li>
                  <i className="fa fa-times" aria-hidden="true"></i> Earlybird
                  Access to Features
                </li>
              </ul>
            </div>
            <StripeYearlyPaymentInitiation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionOptions;
