import { useState } from "react";
import { Button } from "./Button";

//Form for splitting the bill.(Component)
export function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState(""); //Hook for bill input.
  const [paidByUser, setPaidByUser] = useState(""); //Hook for user bill amount

  //Calculate amount of bill value for friend.
  const paidByFriend = bill ? bill - paidByUser : "";

  const [whoIsPaying, setWhoIsPaying] = useState("user"); //Hook for deciding who will going to pay bill.

  function handleSubmitButton(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmitButton}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💵Bill Value💰</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧑‍🦰Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑Friend's expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
