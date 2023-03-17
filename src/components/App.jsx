import React, { useState, useEffect } from "react";

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Modal } from "./shared/components/Modal/Modal";
import { Loader } from "./Loader/Loader";

import { searchImages } from "./shared/services/images-api";

import styles from "./App.module.css"

export const App = () => {
  const [images, setImages] = useState([]);
  const [request, setRequest] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const setSearchRequest = ({ request }) => {
    setRequest(request);
    setImages([]);
    setPage(1);
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await searchImages(request, page);
        setImages(images=>[...images, ...data.hits]);
      }
      catch (error) {
        alert(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    if (request !== '') {
      fetchImages();
    }
  }, [request, page]);

  const showImage = (largeImageURL, tags) => {
    setShowModal(true);
    setImageDetails({ largeImageURL, tags });
  }

  const hideImage = () => {
    setShowModal(false);
    setImageDetails(null);
  }

  return <div className={styles.App}>
    <Searchbar onSubmit={setSearchRequest} />
    {!loading ? <ImageGallery images={images} showImage={showImage} /> : <Loader />}
    {Boolean(images.length) && <Button onClick={()=>setPage(page+1)} />}
    {showModal && <Modal close={hideImage}>
      <img className={styles.image} src={imageDetails.largeImageURL} alt={imageDetails.tags} />
    </Modal>}
  </div>;
}