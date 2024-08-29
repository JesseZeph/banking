import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Transfer = async () => {
  try {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
      console.error("No user is logged in.");
      return (
        <section className="payment-transfer">
          <HeaderBox
            title="Payment Transfer"
            subtext="Please log in to access your accounts."
          />
        </section>
      );
    }

    // Get accounts for the logged-in user
    const accounts = await getAccounts({
      userId: loggedIn.$id,
    });

    // Handle the case where no accounts are found
    if (!accounts) {
      console.error("No accounts found.");
      return (
        <section className="payment-transfer">
          <HeaderBox
            title="Payment Transfer"
            subtext="No accounts available. Please add a bank account."
          />
        </section>
      );
    }

    // Extract account data from the response
    const accountData = accounts?.data;

    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="Please provide any specific details related to the transfer"
        />
        <section className="size-full pt-5">
          <PaymentTransferForm accounts={accountData} />
        </section>
      </section>
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return (
      <section className="payment-transfer">
        <HeaderBox
          title="Payment Transfer"
          subtext="An error occurred while processing your request. Please try again later."
        />
      </section>
    );
  }
};

export default Transfer;
