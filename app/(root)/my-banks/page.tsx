import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
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
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

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

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities"
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>

          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => (
                <BankCard
                  key={accounts.id}
                  account={a}
                  userName={loggedIn?.firstName}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
