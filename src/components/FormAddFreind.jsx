import { useState } from "react";
import { Button } from "./Button";

// Form for adding a new friend to a list.(Component)
export function FormAddFreind({ onAddFriend }) {
  const [name, setName] = useState(""); //This hook is used to read name value in form.
  const [image, setImage] = useState("https://i.pravatar.cc/48"); //This is used to add random persons image to friend.

  //This function adds a new friend to a existing list.
  function handleSubmitButton(e) {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image: `${image}?={id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName(""); //Make name input field empty.
    setImage("https://i.pravatar.cc/48"); //Used for set default image.
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmitButton}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🏞️Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}
