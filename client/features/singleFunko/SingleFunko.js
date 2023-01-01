import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../auth/authSlice";
import { deleteFunkoPop } from "../../app/slice/allFunkoSlice";
import { fetchSingleFunkoPop, selectSingleFunkoPop, updateFunkoPop } from "../../app/slice/oneFunkoSlice";
import { addItemToCart, fetchAllCartFunkos, updateOneOrderOneFunko } from "../../app/slice/cartProducts";

const SingleFunko = () => {
  const dispatch = useDispatch();
  const { funkoId, id } = useParams();

  const singleFunko = useSelector(selectSingleFunkoPop);
  const { userType } = useSelector((state) => state.auth.me);
  const { cart, items } = useSelector((state) => state.cart)

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [edition, setEdition] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchSingleFunkoPop(funkoId));
    dispatch(me());
  }, [dispatch, funkoId]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(
      updateFunkoPop({
        funkoId,
        name,
        category,
        price,
        imageUrl,
        size,
        edition,
        description,
      })
    );
  };

  const handleDelete = async () => {
    await dispatch(deleteFunkoPop(funkoId));
  };
  const addToCart = async (funko) => {
    let FunkoPopId = funko.id
    let orderId = cart.id
    let quantity = 1
    let funkoPrice = funko.price

    if (items.filter(e => e.FunkoPopId === funko.id).length > 0) {
      let index = items.findIndex(e =>
        e.FunkoPopId === funko.id
      )
      quantity = items[index].quantity + 1
      await dispatch(updateOneOrderOneFunko({ FunkoPopId, orderId, quantity }))
    } else {
      await dispatch(addItemToCart({ FunkoPopId, orderId, quantity, funkoPrice }))
    }
    await dispatch(fetchAllCartFunkos(orderId))
  }

  return (
    <>
      <div id="single-funko">
        <h1>{singleFunko.name}</h1>
        <img src={singleFunko.imageUrl} />
        <h4>${singleFunko.price}</h4>
        <h4>Category: {singleFunko.category}</h4>
        <h4>
          Edition: {singleFunko.edition} / Size: {singleFunko.size}
        </h4>
        <button onClick={() => addToCart(singleFunko)}>Add to Cart</button>
        <hr></hr>
        <h3>About me: {singleFunko.description}</h3>
        <hr></hr>
        {userType === "admin" ? (
          <div className="admin-buttons">
            <h3>Admin:</h3>
            <button onClick={handleDelete} className="delete">
              Delete Funko
            </button>

            <form id="update-funko-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                name="name"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
              />
              <label htmlFor="category">Category:</label>
              <input
                category="category"
                value={category}
                onChange={(evt) => setCategory(evt.target.value)}
              />
              <label htmlFor="price">Price:</label>
              <input
                price="price"
                value={price}
                onChange={(evt) => setPrice(evt.target.value)}
              />
              <label htmlFor="imageUrl">Image Url:</label>
              <input
                imageUrl="imageUrl"
                value={imageUrl}
                onChange={(evt) => setImageUrl(evt.target.value)}
              />
              <label htmlFor="edition">Edition:</label>
              <input
                edition="edition"
                value={edition}
                onChange={(evt) => setEdition(evt.target.value)}
              />
              <label htmlFor="size">Size:</label>
              <input
                size="size"
                value={size}
                onChange={(evt) => setSize(evt.target.value)}
              />
              <label htmlFor="description">Description:</label>
              <input
                description="description"
                value={description}
                onChange={(evt) => setDescription(evt.target.value)}
              />

              <button type="submit">Update Funko</button>
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setImageUrl("");
                  setPrice("");
                  setCategory("");
                  setEdition("");
                  setSize("");
                  setDescription("");
                }}
              >
                Clear Form
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SingleFunko;
