export default {
  async fetchItems() {
    return await fetch("../api/notebooks")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  },

  async getItem(pk) {
    return await fetch(`../api/notebooks/${pk}`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  },

  async editItem(pk, form) {
    return await fetch(`../api/update/${pk}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.log(err));
  },

  async deleteItem(pk) {
    return await fetch(`../api/delete/${pk}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.log(err));
  },

  async addItem(item) {
    console.log(JSON.stringify(item));
    return await fetch(`./api/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  },
};
